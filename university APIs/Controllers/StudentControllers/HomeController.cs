using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using university_APIs.Data;
using university_APIs.DTOs;

namespace university_APIs.Controllers.StudentControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public HomeController(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }


        [Authorize(Policy = "RequireStudentRole")]
        [HttpGet("getStudentData/{studentId}")]
        public async Task<ActionResult> getStudentData([FromRoute]int studentId)
        {
            var student = await _dataContext.Students
                .Include(s=>s.Major)
                .Include(s=>s.Faculty)
                .SingleOrDefaultAsync(s => s.Id == studentId);


             var studentDto=_mapper.Map<StudentDto>(student);


            return Ok(studentDto);
        }
    }
}
