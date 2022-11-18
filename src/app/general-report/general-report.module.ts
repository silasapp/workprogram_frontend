import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {GeneralReportRoutingModule} from './general-report-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgChartsModule } from 'ng2-charts';

import { Colum } from './colum';
import { SeismicActivitiesApprovedComponent } from './seismic-activities.component';
import { GeneralReportComponent } from './general-report.component';
import { ExecutiveSummaryComponent } from './executive-summary.component';
import { SeismicDataApprovedPreviousComponent } from './seismic-data-approved-previous.component';
import { SeismicDataApproved2yrsagoComponent } from './seismic-data-approved-2yrsago.component';
import { SeismicProcessingCurrentComponent } from './seismic-process-current.component';
import { SeismicProcessingPreviousComponent } from './seismic-processing-previous.component';
import { ExplorationWellsComponent } from './exploration-wells.component';
import { AppraisalWellsComponent } from './appraisal-wells.component';
import { DevelopmentWellsComponent } from './development-wells.component';
import { ReserveUpdateComponent } from './reserves-update.component';
import { OilProductionComponent } from './oil-production.component';
import { OilProductionContractComponent } from './oil-production-contract.component';
import { MonthlyOilProductionComponent } from './monthly-oil-production.component';
import { OilProductionTerrainComponent } from './oil-production-terrain.component';
import { CrudeProductionContractComponent } from './crude-production-contract.component';
import { CrudeProductionTerrainComponent } from './crude-production-terrain.component';
import { ReconciledOilProductionComponent } from './reconciled-oil-production.component';
import { GasProductionAndUtilizationComponent } from './gas-production-utilization.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GasProductionContractComponent } from './gas-production-contract.component';
import { GasProductionTerrainComponent } from './gas-production-terrain.component';
import { GasProductionContractBasisComponent } from './gas-prod-contract-basis.component';
import { GasFlarePenaltyComponent } from './gas-flare-penalty.component';
import { AccidentStatisticsComponent } from './accident-statistics.component';


@NgModule({
  declarations: [
    Colum,
    SeismicActivitiesApprovedComponent,
    SeismicDataApprovedPreviousComponent,
    SeismicDataApproved2yrsagoComponent,
    SeismicProcessingCurrentComponent,
    SeismicProcessingPreviousComponent,
    ExplorationWellsComponent,
    AppraisalWellsComponent,
    DevelopmentWellsComponent,
    ReserveUpdateComponent,
    OilProductionComponent,
    OilProductionContractComponent,
    MonthlyOilProductionComponent,
    OilProductionTerrainComponent,
    CrudeProductionContractComponent,
    CrudeProductionTerrainComponent,
    ReconciledOilProductionComponent,
    GasProductionAndUtilizationComponent,
    GasProductionContractComponent,
    GasProductionTerrainComponent,
    GasProductionContractBasisComponent,
    GasFlarePenaltyComponent,
    GeneralReportComponent,
    ExecutiveSummaryComponent,
    AccidentStatisticsComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatProgressSpinnerModule,
    GeneralReportRoutingModule
  ]
})
export class GeneralReportModule { }
