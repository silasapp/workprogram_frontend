import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProgramReportComponent } from './work-program-report.component';

describe('WorkProgramReportComponent', () => {
  let component: WorkProgramReportComponent;
  let fixture: ComponentFixture<WorkProgramReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkProgramReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkProgramReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
