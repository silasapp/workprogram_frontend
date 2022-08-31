import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedCompanyComponent } from './uploaded-company.component';

describe('UploadedCompanyComponent', () => {
  let component: UploadedCompanyComponent;
  let fixture: ComponentFixture<UploadedCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
