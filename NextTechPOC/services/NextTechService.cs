using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NextTechPOC.models;

namespace NextTechPOC.services
{
    public class NextTechService
    {
        private readonly HttpClient _httpClient;

        public NextTechService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<int>> GetStories()
        {
            var response = await _httpClient.GetStringAsync("https://hacker-news.firebaseio.com/v0/newstories.json") ?? string.Empty;
            var storyIds = JsonConvert.DeserializeObject<IEnumerable<int>>(response);
            return storyIds ?? Enumerable.Empty<int>();
        }

        public async Task<Story> GetStoryById(int id)
        {
            var response = await _httpClient.GetStringAsync($"https://hacker-news.firebaseio.com/v0/item/{id}.json") ?? string.Empty;
            var story = JsonConvert.DeserializeObject<Story>(response);
            return story ?? new Story(); // new instance if story is null
        }

        public async Task<IEnumerable<Story>> GetStoriesWithDetails(int page, int pageSize)
        {
            var storyIds = await GetStories();

            // Skip and take the stories for the current page
            var paginatedStoryIds = storyIds.Skip((page - 1) * pageSize).Take(pageSize);

            var tasks = paginatedStoryIds.Select(async id =>
            {
                var storyDetails = await GetStoryById(id);
                return new Story
                {
                    Id = id,
                    Title = storyDetails.Title,
                    Url = storyDetails.Url
                };
            });

            var stories = await Task.WhenAll(tasks);
            return stories;
        }
    }

}
