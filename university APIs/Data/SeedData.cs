using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using university_APIs.Entity;

namespace university_APIs.Data
{
    public class SeedData
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly DataContext _dataContext;

        public SeedData(UserManager<AppUser> usermanager,RoleManager<AppRole> roleManager,DataContext dataContext)
        {
            _userManager = usermanager;
            _roleManager = roleManager;
            _dataContext = dataContext;
        }
        public async Task SeedUsers()
        {

            if (await _userManager.Users.AnyAsync())
                return;

            //seed roles
            await _roleManager.CreateAsync(new AppRole { Name = "Student" });
            await _roleManager.CreateAsync(new AppRole { Name = "Admin" });
            await _roleManager.CreateAsync(new AppRole { Name = "Teacher" });

            //seed Admin
            var admin = new AppUser {UserName = "admin"};
            await _userManager.CreateAsync(admin, "Password");
            await _userManager.AddToRoleAsync(admin, "Admin");

            //seed timeSlots
            string[] days = new string[5] { "sunday", "monday", "tuesday","wednesday","thursday" };
            foreach (string day in days) 
            {
                for (int hour = 8; hour <= 18; hour++) 
                {
                    var timeSlot = new TimeSlot
                    {
                        Day = day,
                        StartTime = hour,
                        EndTime = hour + 1
                    };
                    await _dataContext.TimeSlots.AddAsync(timeSlot);
                }
            }

           await _dataContext.SaveChangesAsync();
        }
    }
}
