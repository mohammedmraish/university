using System.ComponentModel.DataAnnotations;

namespace university_APIs.DTOs.AdminControlerDtos
{
    public class AddSectionDto
    {
        [Required]
        public string Semester { get; set; }

        [Required]
        public int? CourseId { get; set; }

        [Required]
        public int? ClassroomId { get; set; }

        [Required]
        public int? TimeSlotId { get; set; }

        [Required]
        public int? TeacherId { get; set; }
    }
}
