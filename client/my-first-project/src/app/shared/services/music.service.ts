import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Music } from '../model/Music';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Music[]>('http://localhost:5000/app/getAllBooks', {
      withCredentials: true,
    });
  }

  save(music: Music) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('title', music.title);
    body.set('author', music.author);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post('http://localhost:5000/app/saveBook', body, {
      headers: headers,
    });
  }

  getMusic(musicId: number | string) {
    const params = new HttpParams().set('bookId', musicId);
    return this.http.get<Music>('http://localhost:5000/app/getBook', {
      withCredentials: true,
      params,
    });
  }

  deleteMusic(musicId: number | string) {
    const params = new HttpParams().set('bookId', musicId);
    return this.http.delete('http://localhost:5000/app/deleteBook', {
      withCredentials: true,
      params,
    });
  }
}
