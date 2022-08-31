import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OMLAggregatedScoreComponent } from './oml-aggregated-score/oml-aggregated-score.component';
import { OMLRecalibratedScaleComponent } from './oml-recalibrated-scale/oml-recalibrated-scale.component';
import { OPLAggregatedScoreComponent } from './opl-aggregated-score/opl-aggregated-score.component';
import { OPLRecalibratedScaleComponent } from './opl-recalibrated-scale/opl-recalibrated-scale.component';

const routes: Routes = [
  {
    path: "oml_aggregated_score",
    component: OMLAggregatedScoreComponent
  },
  {
    path: "opl_aggregated_score",
    component: OPLAggregatedScoreComponent
  },
  {
    path: "opl_recalibrated_scale",
    component: OPLRecalibratedScaleComponent
  },
  {
    path: "oml_recalibrated_scale",
    component:OMLRecalibratedScaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceEvaluationRoutingModule { }
