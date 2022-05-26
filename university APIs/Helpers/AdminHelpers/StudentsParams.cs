namespace university_APIs.Helpers.AdminHelpers
{
    public class StudentsParams:Params
    {
        public int? FacultyId { get; set; }
        public int? MajorId { get; set; }
        public string? Name { get; set; }
    }
}
