import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMomComponent } from './upload-mom.component';

describe('UploadMomComponent', () => {
  let component: UploadMomComponent;
  let fixture: ComponentFixture<UploadMomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
