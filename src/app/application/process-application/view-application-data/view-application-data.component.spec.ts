import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationDataComponent } from './view-application-data.component';

describe('ViewApplicationDataComponent', () => {
  let component: ViewApplicationDataComponent;
  let fixture: ComponentFixture<ViewApplicationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApplicationDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApplicationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
