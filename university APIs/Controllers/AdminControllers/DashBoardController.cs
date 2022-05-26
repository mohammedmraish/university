using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using university_APIs.Data;

namespace university_APIs.Controllers.AdminControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashBoardController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public DashBoardController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("getCardNumbers")]
        public async Task<IActionResult> getCardNumbers() 
        {
            var keyValue = new List<object>();
           
            keyValue.Add(new { name = "Faculties", value = _dataContext.Faculties.Count() });
            keyValue.Add(new { name = "Majors", value = _dataContext.Majors.Count()});
            keyValue.Add(new { name = "Courses", value = _dataContext.Courses.Count() });
            keyValue.Add(new { name = "Teachers", value = _dataContext.Teachers.Count() });
            keyValue.Add(new { name = "Students", value = _dataContext.Students.Count() });

            return Ok(keyValue);
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("getFacultiesStudents")]
        public async Task<IActionResult> getFacultiesStudents()
        {
            var keyValue = await _dataContext.Faculties.Select(f => new { name = f.FacultyName, value = f.Students.Count() })
                .AsNoTracking().ToListAsync();
      
            return Ok(keyValue);
        }
    }
}
