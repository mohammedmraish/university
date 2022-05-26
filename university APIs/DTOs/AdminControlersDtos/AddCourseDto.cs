using System.ComponentModel.DataAnnotations;

namespace university_APIs.DTOs.AdminControlerDtos
{
    public class AddCourseDto
    {
       
        [Required]
        [MaxLength(50)]
        public string CourseName { get; set; }

        [Required]
        public int? NumberOfHours { get; set; }

        [Required]
        public int? MajorId { get; set; }
      

    }
}
