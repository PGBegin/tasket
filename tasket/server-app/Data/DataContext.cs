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
        public DbSet<Status> Statuses {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Status>( x=> x.HasKey(aa => new {aa.status}));
            
            builder.Entity<Task>()
                .HasOne(d => d.StatusNavigation)
                .WithMany(x => x.Tasks)
                .HasForeignKey(d => d.status);
        }
    }
}