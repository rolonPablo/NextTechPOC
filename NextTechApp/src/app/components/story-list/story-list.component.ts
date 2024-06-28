import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Story } from '../../app.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-story-list',
  imports: [CommonModule],
  providers: [ApiService],
  templateUrl: './story-list.component.html',
  standalone: true,
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  @Input() stories: Story[] = [];
  filteredStories: Story[] = [];
  searchTerm = "";
  pageNumber = 1;
  pageSize = 10; // Cantidad de historias por página

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getStories();
  }

  getStories(): void {
    this.apiService.getStories(this.pageNumber,this.pageSize).subscribe
    ({
      next
        :
        (response) => {
          console.log(response);
          // Muestra el observable en la consola
          console.log(response);
          this.stories = response;
          this.filteredStories = response;
          console.log(this.stories)
          // Almacena los datos en una propiedad para usarlos en el template
        },
      error
        :
        (err) => {
          console.
            error
          (
            'Error al obtener datos'
            , err);
        }});
  }

  filterStories(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    console.log("llegué aquí");
    console.log(searchTerm);
    if (!searchTerm) {
      this.filteredStories = this.stories; // Si no hay término de búsqueda, muestra todas las historias
    } else {
      this.filteredStories = this.stories.filter(story =>
        story.title.toLowerCase().includes(searchTerm)
      );
    }
  }

  nextPage(): void {
    this.pageNumber++;
    this.getStories();
  }

  prevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getStories();
    }
  }
}
