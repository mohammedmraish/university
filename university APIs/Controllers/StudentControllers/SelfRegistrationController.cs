#pragma warning disable CS8602 // Dereference of a possibly null reference.
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using university_APIs.Data;
using university_APIs.DTOs;
using university_APIs.Entity;

namespace university_APIs.Controllers.StudentControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SelfRegistrationController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public SelfRegistrationController(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        [Authorize(Policy = "RequireStudentRole")]
        [HttpGet("studentCourses")]
        public async Task<ActionResult> getStudentCourses()
        {
            int studentId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            int majorId = _dataContext.Students.FirstOrDefault(s => s.Id == studentId).MajorId;


              List<int> studentFinishedCourses = await _dataContext.StudentsSections
              .Where(s => s.StudentId == studentId && s.Grade != null)
              .Select(s => s.Section.CourseId )
              .ToListAsync();

            var studentNotFinishedSections = await _dataContext.Sections
                   .Where(s => s.Course.MajorId == majorId && !studentFinishedCourses.Contains(s.CourseId))
                   .Select(s=>new {courseName = s.Course.CourseName, courseHours=s.Course.NumberOfHours})
                   .Distinct()
                   .ToListAsync();

          
            return Ok(studentNotFinishedSections);
        }

        [Authorize(Policy = "RequireStudentRole")]
        [HttpGet("courseSections/{courseName}")]
        public ActionResult getCourseSections(string courseName)
        {
            var query = _dataContext.Sections.Where(s=>s.Course.CourseName==courseName);

            var sections =query.ProjectTo<SectionDto>(_mapper.ConfigurationProvider)
                 .AsNoTracking();

            return Ok(sections);
        }


        [Authorize(Policy = "RequireStudentRole")]
        [HttpGet("schedule")]
        public ActionResult courseSchedule()
        {
            int studentId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var query = _dataContext.StudentsSections
                .Where(s => s.StudentId == studentId && s.Grade == null)
                .Select(s => s.Section);

            var sections = query.ProjectTo<SectionDto>(_mapper.ConfigurationProvider)
                 .AsNoTracking();

            return Ok(sections);
        }

        [Authorize(Policy = "RequireStudentRole")]
        [HttpPost("addCourse/{sectionId}")]
        public async Task<ActionResult> AddSection(int sectionId)
        {

            int studentId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var studentSectionsQuery = _dataContext.StudentsSections.Where(s => s.StudentId == studentId);
            var section = await _dataContext.Sections.FirstOrDefaultAsync(s=>s.Id==sectionId);


            //check if section Exists------------------------------------------------------------------------------
            bool courseExists = await studentSectionsQuery
                                  .AnyAsync(x => x.Section.CourseId == section.CourseId);

            if (courseExists==true)
                return BadRequest("this course already registered !");


            //check if section conflict------------------------------------------------------------------------------
            var sectionConflict = await studentSectionsQuery
                                  .Where(x => x.Section.TimeSlotId == section.TimeSlotId)
                                  .Include(x => x.Section).ThenInclude(x => x.Course)
                                  .FirstOrDefaultAsync();

            if (sectionConflict != null)
                return BadRequest("this section conflicts with an "+sectionConflict.Section.Course.CourseName +" section");


            var StudentSection = new StudentsSections();
            StudentSection.SectionId = sectionId;
            StudentSection.StudentId = studentId;
            await _dataContext.StudentsSections.AddAsync(StudentSection);
            await _dataContext.SaveChangesAsync();
            return Ok();

        }

        [Authorize(Policy = "RequireStudentRole")]
        [HttpDelete("deleteCourse/{sectionId}")]
        public async Task<ActionResult> deleteCourse(int sectionId)
        {

            int studentId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var studentSection =await _dataContext.StudentsSections
                .SingleOrDefaultAsync(s => s.StudentId == studentId&&s.SectionId==sectionId);

            _dataContext.StudentsSections.Remove(studentSection);
            await _dataContext.SaveChangesAsync();
            return Ok();

        }
    }
}
