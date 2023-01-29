import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SBUConfigurationComponent } from './sbu-configuration.component';

describe('SBUConfigurationComponent', () => {
  let component: SBUConfigurationComponent;
  let fixture: ComponentFixture<SBUConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SBUConfigurationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SBUConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
