﻿using System.Linq;
using System.Security.Claims;

namespace DMG.Web.Api
{
    public static class UtilitiesService
    {
        public static string GetUserId(this ClaimsPrincipal user)
        {
            return user.Claims.First(x => x.Type == "Id").Value;
        }
    }

}
