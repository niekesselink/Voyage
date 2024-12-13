using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        [HttpGet("sync")]
        public string Sync()
        {
            List<string> videos = ["VuHq1dF1YeU", "dgSsecMNq4s", "0uvCViy-7BU", "J-8VCL4uSUc"];
            Random rnd = new();

            return videos[rnd.Next(videos.Count)];
        }
    }
}
