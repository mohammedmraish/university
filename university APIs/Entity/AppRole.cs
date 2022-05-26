﻿using Microsoft.AspNetCore.Identity;

namespace university_APIs.Entity
{
    public class AppRole:IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
