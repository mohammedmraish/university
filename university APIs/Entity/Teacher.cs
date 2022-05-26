using System.ComponentModel.DataAnnotations;

namespace university_APIs.Entity
{
    public class Teacher
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(255)]
        public string FullName { get; set; }

        public DateTime RegisterDate { get; set; } = DateTime.Now;

        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }

        public ICollection<Section> Sections { get; set; }
    }
}
