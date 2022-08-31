import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionsfieldsComponent } from './concessionsfields.component';

describe('ConcessionsfieldsComponent', () => {
  let component: ConcessionsfieldsComponent;
  let fixture: ComponentFixture<ConcessionsfieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcessionsfieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcessionsfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
