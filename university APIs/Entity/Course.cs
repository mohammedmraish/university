using System.ComponentModel.DataAnnotations;

namespace university_APIs.Entity
{
    public class Course
    {
        public int Id { get; set; }


        [MaxLength(50)]
        public string CourseName { get; set; }

        public int NumberOfHours { get; set; }

        public int MajorId { get; set; }
        public Major Major { get; set; }

        public ICollection<Section> Sections { get; set; }
    }
}
