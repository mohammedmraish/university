using Microsoft.EntityFrameworkCore;
using university_APIs.Data;
using university_APIs.Helpers;
using university_APIs.Interfaces;
using university_APIs.Services;

namespace university_APIs.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration config)
        {
            
            services.AddScoped<ITokenService, TokenService>();
           
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddDbContext<DataContext>(opions =>
            {
                opions.UseSqlServer(config.GetConnectionString("Default"));
            });

            return services;
        }
    }
}
