using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using university_APIs.Data;
using university_APIs.DTOs.AdminControlerDtos;
using university_APIs.DTOs.AdminControlersDtos;
using university_APIs.Entity;
using university_APIs.Extensions;
using university_APIs.Helpers;
using university_APIs.Helpers.AdminHelpers;

namespace university_APIs.Controllers.AdminControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly DataContext _dataContext;
       
        private readonly IMapper _mapper;

        public CoursesController(DataContext dataContext,IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("addCourse")]
        public async Task<ActionResult> AddCourse([FromBody]AddCourseDto addCourseDto)
        {
            bool courseExist = await _dataContext.Courses.AnyAsync(c => c.CourseName == addCourseDto.CourseName);
            if (courseExist)
                return BadRequest("course name already exist!");

            var course = _mapper.Map<Course>(addCourseDto);
            await _dataContext.Courses.AddAsync(course);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("MajorCourses/{majorId}")]
        public async Task<ActionResult> MajorCourses( [FromRoute]int majorId)
        {
            var courses = _dataContext.Courses.Where(c => c.MajorId == majorId)
                .Select(c => new { courseName = c.CourseName, courseId = c.Id });

            return Ok(courses);
        }

        [HttpGet("getCoursesList")]
        public async Task<ActionResult> GetCoursesList([FromQuery] CoursesParams coursesParams)
        {
            var query = _dataContext.Courses.AsQueryable();

            if (coursesParams.MajorId != null)
                query = query.Where(c => c.MajorId == coursesParams.MajorId);

            var courses = query
                .ProjectTo<CourseListDto>(_mapper.ConfigurationProvider)
                .AsNoTracking();

            var coursesPaged = await PagedList<CourseListDto>.CreateAsync(courses, coursesParams.PageNumber, coursesParams.PageSize);
            Response.AddPaginationHeader(coursesPaged.CurrentPage, coursesPaged.PageSize, coursesPaged.TotalCount, coursesPaged.TotalPages);


            return Ok(coursesPaged);
        }
    }
}
