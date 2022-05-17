//using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server_app.Models;

namespace server_app.Data
{
    public class DataContext : IdentityDbContext<AppIdUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Task> Tasks {get; set;}
    }
}