using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using university_APIs.Data;
using university_APIs.DTOs;

namespace university_APIs.Controllers.StudentControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {

        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public ReportsController(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        [Authorize(Policy = "RequireStudentRole")]
        [HttpGet("schedule")]
        public ActionResult courseSchedule()
        {
            int studentId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var query = _dataContext.StudentsSections
                .Where(s => s.StudentId == studentId&& s.Grade==null)
                .Select(s => s.Section);

            var sections = query.ProjectTo<SectionDto>(_mapper.ConfigurationProvider)
                 .AsNoTracking();

        
            return Ok(sections);
        }

        [Authorize(Policy = "RequireStudentRole")]
        [HttpGet("planCourses")]
        public async Task<ActionResult> planCourses()
        {
            int studentId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
           
            var remainingCourses = this.remainingCourses();

            var FinishedCourses = await _dataContext.StudentsSections
              .Where(s => s.StudentId == studentId && s.Grade != null)
              .Select(s => new { courseName = s.Section.Course.CourseName,
                                 courseHours = s.Section.Course.NumberOfHours, 
                                 courseStatus = "finished : "+s.Grade+"%" })
                                      .ToListAsync();

            List<object> allCourse=new List<object>();
            allCourse.AddRange(FinishedCourses);
            allCourse.AddRange(remainingCourses);

            return Ok(allCourse);
        }


        [Authorize(Policy = "RequireStudentRole")]
        [HttpGet("academicResults")]
        public async Task<ActionResult> academicResults()
        {
            int studentId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var FinishedCourses = await _dataContext.StudentsSections
             .Where(s => s.StudentId == studentId && s.Grade != null)
             .Select(s => new {
                 courseName = s.Section.Course.CourseName,
                 courseHours = s.Section.Course.NumberOfHours,
                 courseGrade = s.Grade ,
                 courseYear=s.Section.Year+"/"+s.Section.Semester
             })
                                     .ToListAsync();

            return Ok(FinishedCourses);
        }



        [Authorize(Policy = "RequireStudentRole")]
        [HttpGet("remainingCourses")]
        public IEnumerable<object> remainingCourses()
        {
            int studentId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            int majorId = _dataContext.Students.Where(s => s.Id == studentId)
                .Select(s => s.MajorId).Single();

            List<int> studentFinishedCourses =  _dataContext.StudentsSections
             .Where(s => s.StudentId == studentId && s.Grade != null)
             .Select(s => s.Section.CourseId)
             .ToList();

      
            var NotFineshedcourses =  _dataContext.Courses
                .Where(s => s.MajorId == majorId && !studentFinishedCourses.Contains(s.Id))
                .Select(c => new { courseName = c.CourseName, courseHours = c.NumberOfHours, courseStatus = "" })
                .ToList();


            return NotFineshedcourses;
        }

    }
}
