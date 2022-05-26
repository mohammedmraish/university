using System.ComponentModel.DataAnnotations;

namespace university_APIs.DTOs.AdminControlerDtos
{
    public class RegisterTeacherDto
    {
        [Required]
        public string Password { get; set; }

        [Required]
        public int? FacultyId { get; set; }

        [Required]
        [MaxLength(255)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(255)]
        public string FullName { get; set; }
    }
}
