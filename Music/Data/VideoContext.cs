using Microsoft.EntityFrameworkCore;

namespace Web.Data
{
    public class VideoContext : DbContext
    {
        public DbSet<Video> Videos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(@"Host=myserver;Username=mylogin;Password=mypass;Database=mydatabase");
    }

    public class Video
    {
        public required string Id { get; set; }

        public DateTime Added { get; set; }
    }
}
