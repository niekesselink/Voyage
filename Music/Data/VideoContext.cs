using Microsoft.EntityFrameworkCore;
using Music.Models;

namespace Music.Data
{
    public class VideoContext : DbContext
    {
        public DbSet<Video> Videos { get; set; }

        public VideoContext(DbContextOptions<VideoContext> options) : base(options) 
        {
            optionsBuilder.UseSqlite("Data Source=Muziek.db;");
        }
    }
}
