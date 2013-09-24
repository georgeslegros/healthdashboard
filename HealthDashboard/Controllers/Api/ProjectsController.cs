using System;
using System.Collections.Generic;
using System.Web.Http;
using HealthDashboard.Models;

namespace HealthDashboard.Controllers.Api
{
    public class ProjectsController : ApiController
    {
        public IEnumerable<Project> Get()
        {
            return new[]
                {
                    new Project{
                        Id = Guid.Parse("C8FF5AEC-7CF2-45A3-8AC8-B88F67D7B64D"),
                        Name = "Project 1"
                    },
                    new Project{
                        Id = Guid.Parse("541A8612-92BF-41B1-BA7A-DB558A4D1826"),
                        Name = "Project 2"
                    },
                    new Project{
                        Id = Guid.Parse("272CD17E-2938-4B47-A80A-D30570081BDB"),
                        Name = "Project 3"
                    }
                };
        } 
    }
}
