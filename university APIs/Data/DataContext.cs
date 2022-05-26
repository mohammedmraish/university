using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using university_APIs.Entity;

namespace university_APIs.Data
{
    public class DataContext:IdentityDbContext<AppUser,AppRole,int>
    {

        public DataContext(DbContextOptions options) : base(options)
        {

        }


        public DbSet<AppUser> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<StudentsSections> StudentsSections { get; set; }


        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<Major> Majors { get; set; }
        public DbSet<Course> Courses { get; set; }

        public DbSet<TimeSlot> TimeSlots { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(u => u.RoleId)
                .IsRequired();

            builder.Entity<Student>()
                .Property(s => s.Id).ValueGeneratedNever();

            builder.Entity<Teacher>()
              .Property(s => s.Id).ValueGeneratedNever();

          

            builder.Entity<StudentsSections>()
                .HasKey(s => new { s.SectionId, s.StudentId });
                

            //--------------------------------------on delete noAction

            builder.Entity<Major>()
                .HasMany(m=>m.Students)
                .WithOne(s=>s.Major)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Major>()
                .HasMany(m => m.Courses)
                .WithOne(s => s.Major)
                .OnDelete(DeleteBehavior.NoAction);

            //--------------------------------------on delete noAction

            builder.Entity<Faculty>()
                .HasMany(m => m.Majors)
                .WithOne(s => s.Faculty)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Faculty>()
                 .HasMany(m => m.Teachers)
                 .WithOne(s => s.Faculty)
                 .OnDelete(DeleteBehavior.NoAction);

        }
    }
}
