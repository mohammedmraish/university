using System.ComponentModel.DataAnnotations;

namespace university_APIs.Entity
{
    public class Major
    {
        public int Id { get; set; }
        [MaxLength(50)]
        public string MajorName { get; set; }

        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }

        public ICollection<Course> Courses { get; set; }
        public ICollection<Student> Students { get; set; }
    }
}
