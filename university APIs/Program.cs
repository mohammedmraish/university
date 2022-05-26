using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using university_APIs.Data;
using university_APIs.Entity;
using university_APIs.Extensions;
using university_APIs.Interfaces;
using university_APIs.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


//custom services 
builder.Services.AddAplicationServices(builder.Configuration);



//identity config
builder.Services.AddIdentityServices(builder.Configuration);



//------------------------cors
builder.Services.AddCors(); //
//------------------------cors

builder.Services.AddTransient<SeedData>();

var app = builder.Build();




//Seed Data-----------------------------------------------------------------
await SeedDataAsync(app);
async Task SeedDataAsync(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();


    using (var scope = scopedFactory?.CreateScope())
    {

        var service = scope.ServiceProvider.GetService<SeedData>();
        await service.SeedUsers();
    }
}
//Seed Data-----------------------------------------------------------------



/*// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
*/



//cors-------------------------------
app.UseCors(builder => builder     //
     .AllowAnyOrigin()             //
     .AllowAnyMethod()             // 
     .AllowAnyHeader());           //
//cors-------------------------------


app.UseHttpsRedirection();



app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
