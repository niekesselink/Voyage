using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using Microsoft.AspNetCore.Mvc;
using Web.Models;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly IConfiguration _config;

        private readonly ILogger<SearchController> _logger;

        public SearchController(IConfiguration config, ILogger<SearchController> logger)
        {
            _config = config;
            _logger = logger;
        }

        [HttpGet("{terms}")]
        public async Task<List<Result>> GetAsync(string terms)
        {
            YouTubeService youtubeService = new(new BaseClientService.Initializer()
            {
                ApiKey = _config["YouTubeApiKey"],
                ApplicationName = GetType().ToString()
            });

            SearchResource.ListRequest searchListRequest = youtubeService.Search.List("snippet");
            //searchListRequest.VideoEmbeddable = SearchResource.ListRequest.VideoEmbeddableEnum.True__;
            searchListRequest.MaxResults = 20;
            searchListRequest.Type = "video";
            searchListRequest.Q = terms;

            SearchListResponse searchListResponse = await searchListRequest.ExecuteAsync();
            List<Result> videos = [];

            foreach (SearchResult searchResult in searchListResponse.Items)
            {
                videos.Add(new Result
                {
                    Title = searchResult.Snippet.Title,
                    Channel = searchResult.Snippet.ChannelTitle,
                    Image = searchResult.Snippet.Thumbnails.Medium.Url,
                    Id = searchResult.Id.VideoId
                });
            }

            return videos;
        }

        [HttpGet("add/{id}")]
        public void Add(string id)
        {

        }
    }
}
