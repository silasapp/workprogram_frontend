import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScribesAndChairmenComponent } from './scribes-and-chairmen.component';

describe('ScribesAndChairmenComponent', () => {
  let component: ScribesAndChairmenComponent;
  let fixture: ComponentFixture<ScribesAndChairmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScribesAndChairmenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScribesAndChairmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
