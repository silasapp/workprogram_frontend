import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushApplicationFormComponent } from './push-application-form.component';

describe('PushApplicationFormComponent', () => {
  let component: PushApplicationFormComponent;
  let fixture: ComponentFixture<PushApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PushApplicationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PushApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
