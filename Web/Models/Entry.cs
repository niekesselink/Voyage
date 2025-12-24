namespace Web.Models
{
    public class Entry
    {
        public int Id { get; set; }

        public required string Title { get; set; }

        public required string YouTubeID { get; set; }

        public required DateTime LastPlayed { get; set; }
    }
}
