import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfilingComponent } from './company-profiling.component';

describe('CompanyProfilingComponent', () => {
  let component: CompanyProfilingComponent;
  let fixture: ComponentFixture<CompanyProfilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyProfilingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyProfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
