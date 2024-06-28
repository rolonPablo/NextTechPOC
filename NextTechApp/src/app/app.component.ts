import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoryListComponent } from './components/story-list/story-list.component';
import { ApiService } from './services/api.service';

export interface Story {
  id: number;
  title: string;
  url: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StoryListComponent],
  providers: [ApiService,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NextTechApp';
  static nativeElement: HTMLElement;


  constructor(private apiService: ApiService) { }


  
}
