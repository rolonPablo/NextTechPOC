import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5291/api'; 



  constructor(private http:HttpClient) {}

    // get all stories
    getStories(pageNumber: number, pageSize: number): Observable<Story[]> {
      return this.http.get<Story[]>(`${this.apiUrl}/stories?page=${pageNumber}&pageSize=${pageSize}`);
    } 
    getApi(){
      return this.apiUrl;
    }

}
