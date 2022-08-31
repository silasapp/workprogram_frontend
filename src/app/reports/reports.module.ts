import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import {NdrReportComponent } from './ndr-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ConcessionsInformationComponent } from './concessions-information.component';
import { ConcessionSituationComponent } from './concession-situation.component';
import { GeophysicalActivitiesComponent } from './geophysical-activities.component';
import { GeophysicalProcessingComponent } from './geophysical-processing.component';
import { DrillingOperationsComponent } from './drilling-operations.component';
import { WorkoversRecompletionComponent } from './workovers-recompletion.component';
import { InitialWellCompletionComponent } from './initial-well-completion.component';
import { FDPExpectedReservesComponent } from './fdp-expected-reserves.component';
import { FDPToSubmitComponent } from './fdp-to-submit.component';
import { FDPFieldStatusComponent } from './fdp-field-status.component';
import { OilCondensateProductionActivitiesComponent } from './oil-condensate-production-activities.component';
import { OilCondensateMonthlyActivitiesComponent } from './oil-condensate-monthly-activities.component';
import { OilCondensateMonthlyActivitiesProposedComponent } from './oil-condensate-monthly-activities-proposed.component';
import { OilCondensateMonthlyActivitiesProposedFiveyearsComponent } from './oil-condensate-monthly-activities-proposed-fiveyears.component';
import { GasProductionActivitiesComponent } from './gas-production-activities.component';
import { GasProductionActivitiesDomesticSupplyComponent } from './gas-production-activities-domestic-supply.component';
import { UnitizationComponent } from './unitization.component';
import { ConcessionReservesForFirstJanuaryComponent } from './concession-reserves-for-first-january.component';
import { ReservesOilCondensateProductionComponent } from './reserves-oil-condensate-production.component';
import { ReservesAdditionComponent } from './reserves-addition.component';
import { ReservesDeclineComponent } from './reserves-decline.component';
import { ReservesLifeIndexComponent } from './reserves-life-index.component';
import { ReservesUpdatesDepletionRateComponent } from './reserves-updates-depletion-rate.component';
import { ReservesOilCondensateMMBBLComponent } from './reserves-oil-condensate-mmbbl.component';
import { ReservesReplacementRatioComponent } from './reserves-replacement-ratio.component';
import { BudgetCapexOpexComponent } from './budget-capex-opex.component';
import { OilAndGasMaintenanceProjectsComponent } from './oil-and-gas-maintenance-projects.component';
import { OilCondensateConformityComponent } from './oil-condensate-conformity.component';
import { FacilitiesProjectPerformanceComponent } from './facilities-project-performance.component';
import { LegalLitigationComponent } from './legal-litigation.component';
import { LegalArbitrationComponent } from './legal-arbitration.component';
import { NigeriaContentTrainingComponent } from './nigeria-content-training.component';
import { NigeriaContentSuccessionplanComponent } from './nigeria-content-successionplan.component';
import { StrategicPlansOnCompanyBasisComponent } from './strategic-plans-on-company-basis.component';
import { HSETechnicalSafetyControlStudiesNewComponent } from './hse-technical-safety-control-studies-new.component';
import { HSEManagementPositionComponent } from './hse-management-position.component';
import { HSESafetyCultureTrainingComponent } from './hse-safety-culture-training.component';
import { HSEOccupationalHealthManagementComponent } from './hse-occupational-health-management.component';
import { HSEQualityControlComponent } from './hse-quality-control.component';
import { HSEClimateChangeAndAirQualityComponent } from './hse-climate-change-and-air-quality.component';
import { HSEInspectionAndMaintenanceFacilityTypeNewComponent } from './hse-inspection-and-maintenance-facility-type-new.component';
import { UploadedPresentationsComponent } from './uploaded-presentations.component';
import { UploadedCommunityDevelopmentProjectsComponent } from './uploaded-community-development-projects.component';
import { HSESustainableDevelopmentCommunityProjectSkillComponent } from './hse-sustainable-development-community-project-skill.component';
import { HSESustainableDevelopmentCommunityNewScholarshipsComponent } from './hse-sustainable-development-community-new-scholarships.component';
import { HSESustainableDevelopmentCommunityProjectCSRNewComponent } from './hse-sustainable-development-community-project-csr-new.component';
import { CSRProjectDetailsComponent } from './csr-project-details.component';
import { PlannedAndActualProjectsComponent } from './planned-and-actual-projects.component';
import { WaterManagementZoneComponent } from './water-management-zone.component';
import { WaterManagementComponent } from './water-management.component';
import { WasteManagementUploadComponent } from './waste-management-upload.component';
import { EnvironmentalManagementSystemComponent } from './environmental-management-system.component';
import { WasteManagementComponent } from './waste-management.component';
import { OspRegistrationComponent } from './osp-registration.component';
import { AccidentIncidentReportingComponent } from './accident-incident-reporting.component';
import { CausesOfOilSpillComponent } from './causes-of-oil-spill.component';
import { OilSpillReportingComponent } from './oil-spill-reporting.component';
import { AssetRegisterTemplateRbiComponent } from './asset-register-template-rbi.component';
import { AssetRegisterTemplatePrescriptionStrategyComponent } from './asset-register-template-prescription-strategy.component';
import { WorkProgramReportComponent } from './work-program-report/work-program-report.component';
import { ConcessionReservesForCurrentYearComponent } from './concession-reserves-for-current-year';


@NgModule({
  declarations: [
    NdrReportComponent,
    ConcessionsInformationComponent,
    ConcessionSituationComponent,
    GeophysicalActivitiesComponent,
    GeophysicalProcessingComponent,
    DrillingOperationsComponent,
    WorkoversRecompletionComponent,
    InitialWellCompletionComponent,
    FDPExpectedReservesComponent,
    FDPToSubmitComponent,
    FDPFieldStatusComponent,
    OilCondensateProductionActivitiesComponent,
    OilCondensateMonthlyActivitiesComponent,
    OilCondensateMonthlyActivitiesProposedComponent,
    OilCondensateMonthlyActivitiesProposedFiveyearsComponent,
    GasProductionActivitiesComponent,
    GasProductionActivitiesDomesticSupplyComponent,
    UnitizationComponent,
    ConcessionReservesForFirstJanuaryComponent,
    ConcessionReservesForCurrentYearComponent,
    ReservesOilCondensateProductionComponent,
    ReservesAdditionComponent,
    ReservesDeclineComponent,
    ReservesLifeIndexComponent,
    ReservesUpdatesDepletionRateComponent,
    ReservesOilCondensateMMBBLComponent,
    ReservesReplacementRatioComponent,
    BudgetCapexOpexComponent,
    OilAndGasMaintenanceProjectsComponent,
    OilCondensateConformityComponent,
    FacilitiesProjectPerformanceComponent,
    LegalLitigationComponent,
    LegalArbitrationComponent,
    NigeriaContentTrainingComponent,
    NigeriaContentSuccessionplanComponent,
    StrategicPlansOnCompanyBasisComponent,
    HSETechnicalSafetyControlStudiesNewComponent,
    HSEManagementPositionComponent,
    HSESafetyCultureTrainingComponent,
    HSEOccupationalHealthManagementComponent,
    HSEQualityControlComponent,
    HSEClimateChangeAndAirQualityComponent,
    HSEInspectionAndMaintenanceFacilityTypeNewComponent,
    UploadedPresentationsComponent,
    UploadedCommunityDevelopmentProjectsComponent,
    HSESustainableDevelopmentCommunityProjectSkillComponent,
    HSESustainableDevelopmentCommunityNewScholarshipsComponent,
    HSESustainableDevelopmentCommunityProjectCSRNewComponent,
    CSRProjectDetailsComponent,
    PlannedAndActualProjectsComponent,
    WaterManagementZoneComponent,
    WaterManagementComponent,
    WasteManagementUploadComponent,
    EnvironmentalManagementSystemComponent,
    WasteManagementComponent,
    OspRegistrationComponent,
    AccidentIncidentReportingComponent,
    CausesOfOilSpillComponent,
    OilSpillReportingComponent,
    AssetRegisterTemplateRbiComponent,
    AssetRegisterTemplatePrescriptionStrategyComponent,
    WorkProgramReportComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class ReportsModule { }
