import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProcessFlowComponent } from './delete-process-flow.component';

describe('DeleteProcessFlowComponent', () => {
  let component: DeleteProcessFlowComponent;
  let fixture: ComponentFixture<DeleteProcessFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteProcessFlowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteProcessFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
