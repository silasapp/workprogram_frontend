import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSBUFormComponent } from './add-sbu-form.component';

describe('AddSBUFormComponent', () => {
  let component: AddSBUFormComponent;
  let fixture: ComponentFixture<AddSBUFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSBUFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSBUFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
