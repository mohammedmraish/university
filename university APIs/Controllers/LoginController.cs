
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using university_APIs.Data;
using university_APIs.DTOs;
using university_APIs.Entity;
using university_APIs.Interfaces;

namespace university_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;

        public LoginController(DataContext dataContext, SignInManager<AppUser> signInManager
            , ITokenService tokenService,UserManager<AppUser>userManager)
        {
            _dataContext = dataContext;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _userManager = userManager;
        }


        [HttpPost]
        public async Task<ActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _dataContext.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null)
                return Unauthorized("invalid username");


            var result = await _signInManager
               .CheckPasswordSignInAsync(user, loginDto.Password, false);


            if (!result.Succeeded)
                return Unauthorized("invalid password");

            var userId = user.Id;
            var token = await _tokenService.CreateToken(user);

            return Ok(new  { token = token,userId= userId}) ;
        }

      
        
    }
}
