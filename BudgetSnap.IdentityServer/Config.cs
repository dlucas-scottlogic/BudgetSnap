using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;

namespace BudgetSnap.IdentityServer
{
    public class Config
    {
        public static IEnumerable<Client> GetClients()
        {
            return new Client[] {
                new Client{
                    ClientId = "budgetsnap-frontend",
                    ClientName = "budgetsnap",
                    AllowedGrantTypes = GrantTypes.Code, // just through the browser
                    RedirectUris = { "http://localhost:2908/logincallback" },
                    AllowedScopes = {"openid", "email", "city_of_birth", "profile" },
                    RequireConsent = false,
                    RequireClientSecret = false
                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new IdentityResource[] {
            new IdentityResources.OpenId(),
            new IdentityResources.Email(),
            new IdentityResources.Profile(),
            new IdentityResource
            {
                Name = "city_of_birth",
                UserClaims = {"birth_city"}
            }
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new ApiResource[] { };
        }
    }
}
