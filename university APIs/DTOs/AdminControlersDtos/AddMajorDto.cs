using System.ComponentModel.DataAnnotations;

namespace university_APIs.DTOs.AdminControlerDtos
{


    public class AddMajorDto
    {
        [Required]
        [MaxLength(50)]
        public string MajorName { get; set; }

        [Required]
        public int FacultyId { get; set; }
    }
}
