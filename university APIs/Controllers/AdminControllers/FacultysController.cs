using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using university_APIs.Data;
using university_APIs.DTOs.AdminControlerDtos;
using university_APIs.Entity;

namespace university_APIs.Controllers.AdminControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacultyController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public FacultyController(DataContext dataContext,IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        [HttpPost("addFaculty")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<ActionResult> AddFaculty([FromBody] AddFacultyDto addFacultyDto) 
        {

            bool facultyIdExist = await _dataContext.Faculties.AnyAsync(f => f.FacultyName==addFacultyDto.FacultyName);
            if (facultyIdExist == true)
                return BadRequest("The faculty already exists!");

            Faculty faculty = _mapper.Map<Faculty>(addFacultyDto);
            await _dataContext.Faculties.AddAsync(faculty);
            await _dataContext.SaveChangesAsync();


            return Ok();
        }


        [HttpGet("getFaculties")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<ActionResult> GetFaculties()
        {
            var faculties = await _dataContext.Faculties
                .Select(x => new { facultyName = x.FacultyName, facultyId = x.Id }).ToListAsync();

            return Ok(faculties);
        }

        [HttpGet("getFacultiesList")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<ActionResult> GetFacultiesList()
        {
            var faculties = await _dataContext.Faculties
                .Include(x=>x.Majors)
                .Include(x=>x.Students)
                .Include(x=>x.Teachers)
                .Select(x => new { facultyName = x.FacultyName,majorsCount=x.Majors.Count
                 ,studentsCount=x.Students.Count,teachersCount=x.Teachers.Count }).ToListAsync();

            return Ok(faculties);
        }

        [HttpGet("getFacultyTeachers/{facultyId}")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<ActionResult> GetFaculties([FromRoute] int facultyId)
        {
            var teachers = await _dataContext.Teachers
                .Select(x => new { teacherName = x.FullName, teacherId = x.Id }).ToListAsync();

            return Ok(teachers);
        }
    }
}
