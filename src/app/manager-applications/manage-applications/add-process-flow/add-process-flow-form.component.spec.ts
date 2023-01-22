import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcessFlowFormComponent } from './add-process-flow-form.component';

describe('AddProcessFlowFormComponent', () => {
  let component: AddProcessFlowFormComponent;
  let fixture: ComponentFixture<AddProcessFlowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProcessFlowFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProcessFlowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
