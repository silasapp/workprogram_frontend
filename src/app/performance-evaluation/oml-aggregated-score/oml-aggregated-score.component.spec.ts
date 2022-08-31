import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OMLAggregatedScoreComponent } from './oml-aggregated-score.component';

describe('OMLAggregatedScoreComponent', () => {
  let component: OMLAggregatedScoreComponent;
  let fixture: ComponentFixture<OMLAggregatedScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OMLAggregatedScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OMLAggregatedScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
