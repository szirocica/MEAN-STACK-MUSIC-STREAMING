import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubListComponent } from './music-list.component';

describe('ClubListComponent', () => {
  let component: ClubListComponent;
  let fixture: ComponentFixture<ClubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
