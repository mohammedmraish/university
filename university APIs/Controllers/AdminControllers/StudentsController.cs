using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using university_APIs.Data;
using university_APIs.DTOs;
using university_APIs.DTOs.AdminControlerDtos;
using university_APIs.Entity;
using university_APIs.Extensions;
using university_APIs.Helpers;
using university_APIs.Helpers.AdminHelpers;
using university_APIs.Interfaces;

namespace university_APIs.Controllers.AdminControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {

        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public StudentsController(DataContext dataContext
            , ITokenService tokenService, UserManager<AppUser> userManager, IMapper mapper)
        {
            _dataContext = dataContext;
            _tokenService = tokenService;
            _userManager = userManager;
            _mapper = mapper;
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("register")]
        public async Task<ActionResult> registerStudent([FromBody] RegisterStudentDto registerStudentDto)
        {


            if (await UserExists(registerStudentDto.UserName))
                return BadRequest("userName is taken");


            //creat IdentityUser
            var user = new AppUser
            {
                UserName = registerStudentDto.UserName.ToLower(),
            };
            var result = await _userManager.CreateAsync(user, registerStudentDto.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);


            //add role
            var roleResult = await _userManager.AddToRoleAsync(user, "Student");
            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);



            //creat student
            var userId = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == user.UserName);
            var student = _mapper.Map<Student>(registerStudentDto);
            student.Id = userId.Id;
            await _dataContext.Students.AddAsync(student);
            await _dataContext.SaveChangesAsync();


            //return Dto
            return Ok();    
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("getStudents")]
        public async Task<ActionResult<PagedList<StudentDto>>> getStudents([FromQuery] StudentsParams studentsParams)
        {
            var query = _dataContext.Students.AsQueryable();

            if (studentsParams.MajorId != null)
                query = query.Where(s => s.MajorId == studentsParams.MajorId);

            if (studentsParams.FacultyId != null)
                query = query.Where(s => s.FacultyId == studentsParams.FacultyId);

            if (studentsParams.Name != null)
                query = query.Where(s => EF.Functions.Like(s.FullName, "%"+studentsParams.Name+"%"));

            var students=query.ProjectTo<StudentDto>(_mapper.ConfigurationProvider)
                .AsNoTracking();

            var studentsPaged= await PagedList<StudentDto>.CreateAsync(students, studentsParams.PageNumber, studentsParams.PageSize);
            Response.AddPaginationHeader(studentsPaged.CurrentPage, studentsPaged.PageSize, studentsPaged.TotalCount, studentsPaged.TotalPages);

            return studentsPaged;
        }


        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(u => u.UserName == username.ToLower());
        }
    }
}
