namespace university_APIs.DTOs
{
    public class StudentDto
    {

        public string FullName { get; set; }

        public DateTime RegisterDate { get; set; } = DateTime.Now;
       
        public string FacultyName { get; set; }

        public string MajorName { get; set; }
      
        public string PhoneNumber { get; set; }

        public string City { get; set; }

    }
}
