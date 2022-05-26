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
    public class TeachersController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public TeachersController(DataContext dataContext
            , ITokenService tokenService, UserManager<AppUser> userManager, IMapper mapper)
        {
            _dataContext = dataContext;
            _tokenService = tokenService;
            _userManager = userManager;
            _mapper = mapper;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("register")]
        public async Task<ActionResult<TeacherDto>> registerTeacher([FromBody] RegisterTeacherDto registerTeacherDto)
        {

            if (await UserExists(registerTeacherDto.UserName))
                return BadRequest("userName is taken");


            //creat IdentityUser
            var user = new AppUser
            {
                UserName = registerTeacherDto.UserName.ToLower(),
            };
            var result = await _userManager.CreateAsync(user, registerTeacherDto.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);


            //add role
            var roleResult = await _userManager.AddToRoleAsync(user, "Teacher");
            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);


            //creat teacher
            var userId = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == user.UserName);
            var teacher = _mapper.Map<Teacher>(registerTeacherDto);
            teacher.Id = userId.Id;
            await _dataContext.Teachers.AddAsync(teacher);
            await _dataContext.SaveChangesAsync();


            //return Dto
            return new TeacherDto
            {
                FullName = teacher.FullName,
                RegisterDate = teacher.RegisterDate,
                Token = await _tokenService.CreateToken(user)

            };
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("getTeachers")]
        public async Task<ActionResult<PagedList<TeacherDto>>> getTeachers([FromQuery] TeachersParams teacherParams)
        {
            var query = _dataContext.Teachers.AsQueryable();

            if (teacherParams.FacultyId != null)
                query = query.Where(t => t.FacultyId == teacherParams.FacultyId);

            var students= query.ProjectTo<TeacherDto>(_mapper.ConfigurationProvider)
                .AsNoTracking();

            var studentsPaged = await PagedList<TeacherDto>.CreateAsync(students, teacherParams.PageNumber, teacherParams.PageSize);
            Response.AddPaginationHeader(studentsPaged.CurrentPage, studentsPaged.PageSize, studentsPaged.TotalCount, studentsPaged.TotalPages);

            return studentsPaged;
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(u => u.UserName == username.ToLower());
        }

    }
}
