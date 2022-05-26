using AutoMapper;
using university_APIs.DTOs;
using university_APIs.DTOs.AdminControlerDtos;
using university_APIs.DTOs.AdminControlersDtos;
using university_APIs.Entity;

namespace university_APIs.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AddSectionDto, Section>();
            CreateMap<AddFacultyDto, Faculty>();
            CreateMap<AddMajorDto, Major>();
            CreateMap<AddCourseDto, Course>();


            CreateMap<RegisterStudentDto, Student>();
            CreateMap<RegisterTeacherDto, Teacher>();


            CreateMap<Student, StudentDto>()
                .ForMember(s => s.MajorName, opt => opt.MapFrom(src =>
                     src.Major.MajorName))
                .ForMember(s => s.FacultyName, opt => opt.MapFrom(src =>
                     src.Faculty.FacultyName));

            CreateMap<Teacher, TeacherDto>()
                .ForMember(t => t.FacultyName, opt => opt.MapFrom(src =>
                     src.Faculty.FacultyName));

            CreateMap<Section, SectionDto>()
               .ForMember(s => s.TeacherName, opt => opt.MapFrom(src =>
                    src.Teacher.FullName))
               .ForMember(s => s.CourseName, opt => opt.MapFrom(src =>
                    src.Course.CourseName))
               .ForMember(s => s.FacultyName, opt => opt.MapFrom(src =>
                    src.Course.Major.Faculty.FacultyName))
               .ForMember(s => s.MajorName, opt => opt.MapFrom(src =>
                    src.Course.Major.MajorName))
               .ForMember(s => s.Time, opt => opt.MapFrom(src =>
                    src.TimeSlot.StartTime + ":00-" + src.TimeSlot.EndTime + ":00"))
               .ForMember(s => s.Day, opt => opt.MapFrom(src =>
                      src.TimeSlot.Day))
                .ForMember(s => s.StudentsCount, opt => opt.MapFrom(src =>
                      src.StudentsSections.Where(se=>se.SectionId==src.Id).Count()));

            CreateMap<Major, MajorsListDto>()
                .ForMember(m => m.FacultyName, opt => opt.MapFrom(src =>
                     src.Faculty.FacultyName))
                .ForMember(m => m.coursesCount, opt => opt.MapFrom(src =>
                     src.Courses.Count))
                .ForMember(m => m.StudentsCount, opt => opt.MapFrom(src =>
                     src.Students.Count));

            CreateMap<Course, CourseListDto>()
               .ForMember(m => m.MajorName, opt => opt.MapFrom(src =>
                    src.Major.MajorName))
               .ForMember(m => m.FacultyName, opt => opt.MapFrom(src =>
                    src.Major.Faculty.FacultyName));

        }
    }
}
