using Microsoft.AspNetCore.Identity;

namespace university_APIs.Entity
{
    public class AppUser:IdentityUser<int>
    {
       
        public ICollection<AppUserRole> UserRoles { get; set; }

    }
}
