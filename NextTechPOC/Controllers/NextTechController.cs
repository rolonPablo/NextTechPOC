using Microsoft.AspNetCore.Mvc;
using NextTechPOC.services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NextTechPOC.Controllers
{
    [ApiController]
    [Route("api/")]
    public class NextTechController : ControllerBase
    {
        private readonly NextTechService _nextTechService;

        public NextTechController(NextTechService nextTechService)
        {
            _nextTechService = nextTechService;
        }

        [HttpGet("stories")]
        public async Task<IActionResult> GetStories(int page = 1, int pageSize = 10)
        {
            var stories = await _nextTechService.GetStoriesWithDetails(page, pageSize);
            return Ok(stories);
        }

        [HttpGet("story/{id}")]
        public async Task<IActionResult> GetStoryByID(int id)
        {
            var story = await _nextTechService.GetStoryById(id);
            return Ok(story);
        }
    }
}
