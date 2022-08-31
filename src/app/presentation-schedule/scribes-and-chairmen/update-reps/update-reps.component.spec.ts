import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRepsComponent } from './update-reps.component';

describe('UpdateRepsComponent', () => {
  let component: UpdateRepsComponent;
  let fixture: ComponentFixture<UpdateRepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
