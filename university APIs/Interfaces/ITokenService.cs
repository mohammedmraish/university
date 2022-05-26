using university_APIs.Entity;

namespace university_APIs.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
