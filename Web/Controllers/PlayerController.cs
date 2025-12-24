using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Data;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        [HttpGet("sync")]
        public string Sync()
        {
            // Get database.
            var db = new DataContext();

            // Let's get the song we need to play now.
            var entry = db.Entries.OrderBy(e => e.LastPlayed).FirstOrDefault();

            // Oh noes, nothing found. Play placeholder.
            if (entry == null)
                return "null";

            // Update the last played in the database.
            entry.LastPlayed = DateTime.Now;
            db.Entries.Update(entry);
            db.SaveChanges();

            // Let's play!
            return entry.YouTubeID;
        }
    }
}
