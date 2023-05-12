using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using Microsoft.AspNetCore.Mvc;
using Music.Models;

namespace Music.Apis
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        // GET api/<SearchController>/5
        [HttpGet("{terms}")]
        public async Task<List<VideoSearch>> GetAsync(string terms)
        {
            YouTubeService youtubeService = new(new BaseClientService.Initializer()
            {
                ApiKey = "",
                ApplicationName = GetType().ToString()
            });

            SearchResource.ListRequest searchListRequest = youtubeService.Search.List("snippet");
            searchListRequest.VideoEmbeddable = SearchResource.ListRequest.VideoEmbeddableEnum.True__;
            searchListRequest.MaxResults = 20;
            searchListRequest.Type = "video";
            searchListRequest.Q = terms;

            SearchListResponse searchListResponse = await searchListRequest.ExecuteAsync();
            List<VideoSearch> videos = new();

            foreach (SearchResult? searchResult in searchListResponse.Items)
            {
                videos.Add(new VideoSearch
                {
                    Title = searchResult.Snippet.Title,
                    Channel = searchResult.Snippet.ChannelTitle,
                    Image = searchResult.Snippet.Thumbnails.Medium.Url,
                    Id = searchResult.Id.VideoId
                });
            }

            return videos;
        }

        // GET api/<SearchController>
        [HttpGet("add/{id}")]
        public void Add(string id)
        {

        }
    }
}
