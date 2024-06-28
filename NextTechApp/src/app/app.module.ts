import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoryListComponent } from './components/story-list/story-list.component'; 

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent 
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

 
 