namespace university_APIs.Entity
{
    public class Section
    {
        public int Id { get; set; }
        
        public string  Semester { get; set; }

        public int Year { get; set; } = DateTime.Now.Year;

        public Course Course { get; set; }

        public int CourseSection { get; set; }

        public int CourseId { get; set; }

        public int ClassroomId { get; set; }

        public TimeSlot TimeSlot { get; set; }
        public int TimeSlotId { get; set; }

        public Teacher Teacher { get; set; }
        public int TeacherId { get; set; }

        public ICollection<StudentsSections> StudentsSections { get; set; }
       
    }
}
