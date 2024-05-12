import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MusicService } from '../../shared/services/music.service';

@Component({
  selector: 'app-music-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './music-form.component.html',
  styleUrl: './music-form.component.scss',
})
export class MusicFormComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private musicService: MusicService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.musicService.save(this.signupForm.value).subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('Form is not valid.');
    }
  }
}
