import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MusicService } from '../shared/services/music.service';
import { Music } from '../shared/model/Music';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-music-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './music-list.component.html',
  styleUrl: './music-list.component.scss',
})
export class ClubListComponent {
  music?: Music;
  musics!: Music[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private musicService: MusicService,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit() {
    this.musicService.getAll().subscribe({
      next: (data) => {
        this.musics = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
