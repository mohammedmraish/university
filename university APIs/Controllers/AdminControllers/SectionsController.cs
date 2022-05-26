using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using university_APIs.Data;
using university_APIs.DTOs;
using university_APIs.DTOs.AdminControlerDtos;
using university_APIs.Entity;
using university_APIs.Extensions;
using university_APIs.Helpers;
using university_APIs.Helpers.AdminHelpers;

namespace university_APIs.Controllers.AdminControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public SectionsController(DataContext dataContext,IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("AddSection")]
        public async Task<ActionResult> AddSection([FromBody] AddSectionDto addSectionDto)
        {
            bool sectionConflict = await _dataContext.Sections
                                  .AnyAsync(x => x.ClassroomId == addSectionDto.ClassroomId
                                              && x.TimeSlotId == addSectionDto.TimeSlotId);
                                     
            if (sectionConflict == true)
                return BadRequest("this section conflicts with an existing section");


            bool teacherTimeConflict = await _dataContext.Sections
                                      .AnyAsync(s => s.TeacherId == addSectionDto.TeacherId 
                                                 && s.TimeSlotId == addSectionDto.TimeSlotId);

            if (teacherTimeConflict == true)
                return BadRequest("time conflict with teacher");


            var section = _mapper.Map<Section>(addSectionDto);
            section.CourseSection = _dataContext.Sections.Count(s=>s.CourseId==section.CourseId)+1;
            await _dataContext.Sections.AddAsync(section);
            await _dataContext.SaveChangesAsync();

            return Ok(section.Year);

        }

        [HttpGet("getSectionsList")]
        public async Task<ActionResult> getSectionsList([FromQuery] SectionsParams sectionsParams)
        {
            var query = _dataContext.Sections.AsQueryable();

            if (sectionsParams.TeacherId != null)
                query = query.Where(s => s.TeacherId == sectionsParams.TeacherId);
            if (sectionsParams.CourseId != null)
                query = query.Where(s => s.CourseId == sectionsParams.CourseId);
            if (sectionsParams.FacultyId != null)
                query = query.Where(s => s.Teacher.FacultyId == sectionsParams.FacultyId);
            if (sectionsParams.MajorId != null)
                query = query.Where(s => s.Course.MajorId == sectionsParams.MajorId);

            var sections=query.ProjectTo<SectionDto>(_mapper.ConfigurationProvider)
                .AsNoTracking();

            var sectionsPaged = await PagedList<SectionDto>.CreateAsync(sections, sectionsParams.PageNumber, sectionsParams.PageSize);
            Response.AddPaginationHeader(sectionsPaged.CurrentPage, sectionsPaged.PageSize, sectionsPaged.TotalCount, sectionsPaged.TotalPages);

            return Ok(sectionsPaged);
        }

        [HttpGet("getTimeSlots/{day}")]
        public async Task<ActionResult> getTimeSlots([FromRoute] string day) 
        {
            var timeSlots = _dataContext.TimeSlots.Where(t => t.Day == day)
                .Select(t => new { timeSlotId = t.Id, timeStartEnd = t.StartTime + ":00-" + t.EndTime + ":00" }).AsNoTracking();
            return Ok(timeSlots);
        }
       

    }
}
