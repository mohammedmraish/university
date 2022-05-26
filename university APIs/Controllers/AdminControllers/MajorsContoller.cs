using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using university_APIs.Data;
using university_APIs.DTOs;
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
    public class MajorsController : ControllerBase
    {

        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public MajorsController(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }


        [HttpPost("addMajor")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<ActionResult> AddMajor([FromBody]AddMajorDto addMajorDto)
        {
            bool facultyIdExist = await _dataContext.Faculties.AnyAsync(f=>f.Id==addMajorDto.FacultyId);
            if (facultyIdExist == false)
                return BadRequest("faculty not exists!");

            bool majorExist = await _dataContext.Majors.AnyAsync(m => m.MajorName == addMajorDto.MajorName);
            if (majorExist == true)
                return BadRequest("The major already exists!");

            Major major = _mapper.Map<Major>(addMajorDto);
            await _dataContext.Majors.AddAsync(major);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }


        [HttpGet("facultyMajors/{facultyId}")]
        [Authorize(Policy = "RequireAdminRole")]

        public async Task<ActionResult> GetFacultyMajors([FromRoute]int facultyId)
        {
            var majors = await _dataContext.Majors.Where(m => m.FacultyId == facultyId)
                .Select(m=>new { majorName=m.MajorName,majorId=m.Id}).ToListAsync();

            return Ok(majors);
        }


        [HttpGet("getMajorsList")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<ActionResult> GetMajorsList([FromQuery]MajorsParams majorsParams)
        {
            var query = _dataContext.Majors.AsQueryable();

            if (majorsParams.FacultyId != null)
               query=query.Where(m => m.FacultyId == majorsParams.FacultyId);

           var majors=query
                .ProjectTo<MajorsListDto>(_mapper.ConfigurationProvider)
                .AsNoTracking();

            var majorsPaged = await PagedList<MajorsListDto>.CreateAsync(majors, majorsParams.PageNumber, majorsParams.PageSize);
            Response.AddPaginationHeader(majorsPaged.CurrentPage, majorsPaged.PageSize, majorsPaged.TotalCount, majorsPaged.TotalPages);

            return Ok(majorsPaged);
        }
    }
}
