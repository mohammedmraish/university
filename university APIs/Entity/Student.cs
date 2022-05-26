using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace university_APIs.Entity
{
    public class Student
    {
        
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(255)]
        public string FullName { get; set; }

        public DateTime RegisterDate { get; set; }=DateTime.Now;

        [MaxLength(50)]
        public string Gender { get; set; }

        [MaxLength(50)]
        public string City { get; set; }

        [MaxLength(50)]
        public string PhoneNumber { get; set; }

      

        public ICollection<StudentsSections> StudentsSections { get; set; }

        public Major Major { get; set; }
        public int MajorId { get; set; }

        public Faculty Faculty { get; set; }
        public int FacultyId { get; set; }

    }
}
