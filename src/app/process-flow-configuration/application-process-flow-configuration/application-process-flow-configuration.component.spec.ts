import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationProcessFlowConfigurationComponent } from './application-process-flow-configuration.component';

describe('ApplicationProcessFlowConfigurationComponent', () => {
  let component: ApplicationProcessFlowConfigurationComponent;
  let fixture: ComponentFixture<ApplicationProcessFlowConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationProcessFlowConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationProcessFlowConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
