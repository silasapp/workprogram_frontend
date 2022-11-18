import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllapprovalsComponent } from './allapprovals.component';

describe('AllapprovalsComponent', () => {
  let component: AllapprovalsComponent;
  let fixture: ComponentFixture<AllapprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllapprovalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllapprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
