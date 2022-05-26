namespace university_APIs.Helpers.AdminHelpers
{
    public class SectionsParams:Params
    {
        public int? CourseId { get; set; }
        public int? MajorId{ get; set; }
        public int? FacultyId { get; set; }
        public int? TeacherId{ get; set; }
    }
}
