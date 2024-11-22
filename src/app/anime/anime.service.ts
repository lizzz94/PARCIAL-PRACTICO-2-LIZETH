import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable, map } from 'rxjs';
import { Anime } from './anime';
import {Component, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.apiUrl);
  }

  getAnime(id: string): Observable<Anime> {
    return this.http.get<Anime[]>(this.apiUrl).pipe(
      map((animes: Anime[]) => {
      for (id in animes) {
          if (id == id) {
            return animes[id];
          }
        }
        throw new Error(`Anime con ID ${id} no encontrado`);
      })
    );
  }
  ngOnInit() {
    this.getAnimes();
  }
}
