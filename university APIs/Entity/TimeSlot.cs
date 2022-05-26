using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace university_APIs.Entity
{
    [Table("TimeSlots")]
    public class TimeSlot
    {
        public int Id { get; set; }

        [MaxLength(50)]
        public string Day { get; set; }

        public int StartTime { get; set; }

        public int EndTime { get; set; }
    }
}
