using System.ComponentModel.DataAnnotations;

namespace university_APIs.DTOs.AdminControlerDtos
{
    public class RegisterStudentDto
    {
        [Required]
        [MinLength(6)]
        [MaxLength(20)]
        public string Password { get; set; }

        [Required]
        [MaxLength(255)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(255)]
        public string FullName { get; set; }

        [Required]
        public int? MajorId { get; set; }

        [Required]
        public int? FacultyId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Gender { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        [MaxLength(50)]
        public string PhoneNumber { get; set; }
    }
}
