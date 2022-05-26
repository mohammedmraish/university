using System.ComponentModel.DataAnnotations;

namespace university_APIs.Entity
{
    public class Faculty
    {
        public int Id { get; set; }
        [MaxLength(50)]
        public string FacultyName { get; set; }

        public ICollection<Major> Majors { get; set; }
        public ICollection<Student> Students { get; set; }
        public ICollection<Teacher> Teachers { get; set; }
    }
}
