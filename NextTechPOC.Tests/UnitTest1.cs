using System.Linq;
using Xunit;
using NextTechPOC.services;

namespace NextTechPOC.Tests
{
    public class NextTechServiceTests
    {
        [Fact]
        public async Task GetStories_ReturnsCorrectNumberOfStories()
        {
            // Arrange
            var httpClient = new HttpClient(); 
            var service = new NextTechService(httpClient);

            // Act
            var stories = await service.GetStoriesWithDetails(1, 10);

            // Assert
            Assert.NotNull(stories);
            Assert.Equal(10, stories.Count()); 
        }

        [Fact]
        public async Task GetStoryById_ReturnsValidStory()
        {
            // Arrange
            var httpClient = new HttpClient(); 
            var service = new NextTechService(httpClient);
            var storyId = 123; 

            // Act
            var story = await service.GetStoryById(storyId);

            // Assert
            Assert.NotNull(story);
            Assert.Equal(storyId, story.Id); 
        }
    }
}
