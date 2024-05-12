import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { MusicFormComponent } from './music-form/music-form.component';
import { HeaderComponent } from '../header/header.component';
import { MusicService } from '../shared/services/music.service';
import { Music } from '../shared/model/Music';
import { User } from '../shared/model/User';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MusicFormComponent,
    HeaderComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  musics!: Music[];
  users!: User[];

  constructor(
    private musicService: MusicService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.musicService.getAll().subscribe({
      next: (data) => {
        this.musics = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDeleteMusic(musicId: number) {
    this.musicService.deleteMusic(musicId).subscribe({
      next: (data: any) => {
        console.log(data);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDeleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (data: any) => {
        console.log(data);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
