import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicFormComponent } from './music-form.component';

describe('MusicFormComponent', () => {
  let component: MusicFormComponent;
  let fixture: ComponentFixture<MusicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
