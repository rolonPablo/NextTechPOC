import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render stories correctly', () => {
    // Set filteredStories to a sample list of stories
    component.filteredStories = [
      { id: 1, title: 'Story 1', url: 'https://example.com/story1' },
      { id: 2, title: 'Story 2', url: 'https://example.com/story2' },
    ];

    // Trigger change detection
    fixture.detectChanges();

    // Check that the rendered HTML contains the story  URLs
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a').getAttribute('href')).toBe(
      'https://example.com/story1'
    );
  });

  it('should display message when no stories are available', () => {
    // Set filteredStories to an empty list
    component.filteredStories = [];

    // Trigger change detection
    fixture.detectChanges();

    // Check that the rendered HTML displays the correct message
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('No stories to show.');
  });
});
