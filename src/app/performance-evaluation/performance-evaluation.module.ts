import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PerformanceEvaluationRoutingModule } from './performance-evaluation-routing.module';
import { OPLRecalibratedScaleComponent } from './opl-recalibrated-scale/opl-recalibrated-scale.component';
import { OPLAggregatedScoreComponent } from './opl-aggregated-score/opl-aggregated-score.component';
import { OMLRecalibratedScaleComponent } from './oml-recalibrated-scale/oml-recalibrated-scale.component';
import { OMLAggregatedScoreComponent } from './oml-aggregated-score/oml-aggregated-score.component';


@NgModule({
  declarations: [
    OPLRecalibratedScaleComponent,
    OPLAggregatedScoreComponent,
    OMLRecalibratedScaleComponent,
    OMLAggregatedScoreComponent
  ],
  imports: [
    CommonModule,
    PerformanceEvaluationRoutingModule,
    MatIconModule,
  ]
})
export class PerformanceEvaluationModule { }
