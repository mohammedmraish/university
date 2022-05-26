using System.ComponentModel.DataAnnotations;

namespace university_APIs.Entity
{
    public class StudentsSections
    {
        public int StudentId { get; set; }
        public Student Student { get; set; }


        public int SectionId { get; set; }
        public Section Section { get; set; }

        public int? Grade { get; set; }

      
    }
}
