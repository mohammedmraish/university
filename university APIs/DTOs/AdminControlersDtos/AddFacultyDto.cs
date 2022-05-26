using System.ComponentModel.DataAnnotations;

namespace university_APIs.DTOs.AdminControlerDtos
{
    public class AddFacultyDto
    {
        [MaxLength(50)]
        [Required]
        public string FacultyName { get; set; }
    }
}
