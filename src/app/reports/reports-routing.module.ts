import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentIncidentReportingComponent } from './accident-incident-reporting.component';
import { AssetRegisterTemplatePrescriptionStrategyComponent } from './asset-register-template-prescription-strategy.component';
import { AssetRegisterTemplateRbiComponent } from './asset-register-template-rbi.component';
import { BudgetCapexOpexComponent } from './budget-capex-opex.component';
import { CausesOfOilSpillComponent } from './causes-of-oil-spill.component';
import { ConcessionReservesForCurrentYearComponent } from './concession-reserves-for-current-year';
import { ConcessionReservesForFirstJanuaryComponent } from './concession-reserves-for-first-january.component';
 import { ConcessionSituationComponent } from './concession-situation.component';
import { ConcessionsInformationComponent } from './concessions-information.component';
import { CSRProjectDetailsComponent } from './csr-project-details.component';
import { DrillingOperationsComponent } from './drilling-operations.component';
import { EnvironmentalManagementSystemComponent } from './environmental-management-system.component';
import { FacilitiesProjectPerformanceComponent } from './facilities-project-performance.component';
import { FDPExpectedReservesComponent } from './fdp-expected-reserves.component';
import { FDPFieldStatusComponent } from './fdp-field-status.component';
import { FDPToSubmitComponent } from './fdp-to-submit.component';
import { GasProductionActivitiesDomesticSupplyComponent } from './gas-production-activities-domestic-supply.component';
import { GasProductionActivitiesComponent } from './gas-production-activities.component';
 import { GeophysicalActivitiesComponent } from './geophysical-activities.component';
import { GeophysicalProcessingComponent } from './geophysical-processing.component';
import { HSEClimateChangeAndAirQualityComponent } from './hse-climate-change-and-air-quality.component';
import { HSEInspectionAndMaintenanceFacilityTypeNewComponent } from './hse-inspection-and-maintenance-facility-type-new.component';
import { HSEManagementPositionComponent } from './hse-management-position.component';
import { HSEOccupationalHealthManagementComponent } from './hse-occupational-health-management.component';
import { HSEQualityControlComponent } from './hse-quality-control.component';
import { HSESafetyCultureTrainingComponent } from './hse-safety-culture-training.component';
import { HSESustainableDevelopmentCommunityNewScholarshipsComponent } from './hse-sustainable-development-community-new-scholarships.component';
import { HSESustainableDevelopmentCommunityProjectCSRNewComponent } from './hse-sustainable-development-community-project-csr-new.component';
import { HSESustainableDevelopmentCommunityProjectSkillComponent } from './hse-sustainable-development-community-project-skill.component';
import { HSETechnicalSafetyControlStudiesNewComponent } from './hse-technical-safety-control-studies-new.component';
import { InitialWellCompletionComponent } from './initial-well-completion.component';
import { LegalArbitrationComponent } from './legal-arbitration.component';
import { LegalLitigationComponent } from './legal-litigation.component';
 import { NdrReportComponent } from './ndr-report.component';
import { NigeriaContentSuccessionplanComponent } from './nigeria-content-successionplan.component';
import { NigeriaContentTrainingComponent } from './nigeria-content-training.component';
import { OilAndGasMaintenanceProjectsComponent } from './oil-and-gas-maintenance-projects.component';
import { OilCondensateConformityComponent } from './oil-condensate-conformity.component';
import { OilCondensateMonthlyActivitiesProposedFiveyearsComponent } from './oil-condensate-monthly-activities-proposed-fiveyears.component';
import { OilCondensateMonthlyActivitiesProposedComponent } from './oil-condensate-monthly-activities-proposed.component';
import { OilCondensateMonthlyActivitiesComponent } from './oil-condensate-monthly-activities.component';
import { OilCondensateProductionActivitiesComponent } from './oil-condensate-production-activities.component';
import { OilSpillReportingComponent } from './oil-spill-reporting.component';
import { OspRegistrationComponent } from './osp-registration.component';
import { PlannedAndActualProjectsComponent } from './planned-and-actual-projects.component';
import { ReservesAdditionComponent } from './reserves-addition.component';
import { ReservesDeclineComponent } from './reserves-decline.component';
import { ReservesLifeIndexComponent } from './reserves-life-index.component';
import { ReservesOilCondensateMMBBLComponent } from './reserves-oil-condensate-mmbbl.component';
import { ReservesOilCondensateProductionComponent } from './reserves-oil-condensate-production.component';
import { ReservesReplacementRatioComponent } from './reserves-replacement-ratio.component';
import { ReservesUpdatesDepletionRateComponent } from './reserves-updates-depletion-rate.component';
import { StrategicPlansOnCompanyBasisComponent } from './strategic-plans-on-company-basis.component';
import { UnitizationComponent } from './unitization.component';
import { UploadedCommunityDevelopmentProjectsComponent } from './uploaded-community-development-projects.component';
import { UploadedPresentationsComponent } from './uploaded-presentations.component';
import { WasteManagementUploadComponent } from './waste-management-upload.component';
import { WasteManagementComponent } from './waste-management.component';
import { WaterManagementZoneComponent } from './water-management-zone.component';
import { WaterManagementComponent } from './water-management.component';
import { WorkProgramReportComponent } from './work-program-report/work-program-report.component';
import { WorkoversRecompletionComponent } from './workovers-recompletion.component';

const routes: Routes = [
  {
    path: "ndr",
    component: NdrReportComponent,
  },
  {
    path: "concessionsinformation",
    component: ConcessionsInformationComponent
  },
  {
    path: "concessionsituation",
    component: ConcessionSituationComponent
  },
  {
    path: "geophysicalactivities",
    component: GeophysicalActivitiesComponent
  },
  {
    path: "geophysicalprocessing",
    component: GeophysicalProcessingComponent
  },
  {
    path: "drilling_operations",
    component: DrillingOperationsComponent
  },
  {
    path:"workovers_recompletion",
    component: WorkoversRecompletionComponent
  },
  {
    path:"initial_wellcompletion",
    component: InitialWellCompletionComponent
  },
  {
    path:"fdp_expected_reserves",
    component: FDPExpectedReservesComponent
  },
  {
    path:"fdp_tosubmit",
    component: FDPToSubmitComponent
  },
  {
    path:"fdp_fieldstatus",
    component: FDPFieldStatusComponent
  },
  {
    path: "oil_condensate_production_activities",
    component: OilCondensateProductionActivitiesComponent
  },
  {
    path: "oil_condensate_monthly_activities",
    component: OilCondensateMonthlyActivitiesComponent
  },
  {
    path: "oil_condensate_monthly_activities_proposed",
    component: OilCondensateMonthlyActivitiesProposedComponent
  },
  {
    path: "oil_condensate_monthly_activities_proposed_fiveyears",
    component: OilCondensateMonthlyActivitiesProposedFiveyearsComponent
  },
  {
    path : "gas_production_activities",
    component: GasProductionActivitiesComponent
  },
  {
    path: "gas_production_activities_domestic_supply",
    component: GasProductionActivitiesDomesticSupplyComponent
  },
  {
    path: "unitization",
    component: UnitizationComponent
  },
  {
    path : "concession_reserves_for_1st_january",
    component: ConcessionReservesForFirstJanuaryComponent
  },
  {
    path : "concession_reserves_for_current_year",
    component: ConcessionReservesForCurrentYearComponent
  },
  {
    path: "reserves_addition",
    component: ReservesAdditionComponent
  },
  {
    path: "reserves_decline",
    component: ReservesDeclineComponent
  },
  {
    path: "reserves_life_index",
    component: ReservesLifeIndexComponent
  },
  {
    path: "reserves_updates_depletion_rate",
    component: ReservesUpdatesDepletionRateComponent
  },
  {
    path: "reserves_oil_condensate_mmbbl",
    component: ReservesOilCondensateMMBBLComponent
  },
  {
    path: "reserves_oil_condensate_production",
    component: ReservesOilCondensateProductionComponent
  },
  {
    path: "reserves_replacement_ratio",
    component: ReservesReplacementRatioComponent
  },
  {
    path: "budget_capex_opex",
    component: BudgetCapexOpexComponent
  },
  {
    path: "oil_and_gas_maintenance_projects",
    component: OilAndGasMaintenanceProjectsComponent
  },
  {
    path: "oil_condensate_conformity",
    component: OilCondensateConformityComponent
  },
  {
    path: "facilities_project_performance",
    component: FacilitiesProjectPerformanceComponent
  },
  {
    path: "legal_litigation",
    component: LegalLitigationComponent
  },
  {
    path: "legal_arbitration",
    component: LegalArbitrationComponent
  },
  {
    path: "nigeria_content_training",
    component: NigeriaContentTrainingComponent
  },
  {
    path: "nigeria_content_successionplan",
    component: NigeriaContentSuccessionplanComponent
  },
  {
    path: "strategic_plans_on_company_basis",
    component: StrategicPlansOnCompanyBasisComponent
  },
  {
    path: "hse_technical_safety_control_studies_new",
    component:HSETechnicalSafetyControlStudiesNewComponent
  },
  {
    path: "hse_management_position",
    component: HSEManagementPositionComponent
  },
  {
    path: "hse_safety_culture_training",
    component: HSESafetyCultureTrainingComponent
  },
  {
    path: "hse_occupational_health_management",
    component: HSEOccupationalHealthManagementComponent
  },
  {
    path: "hse_quality_control",
    component: HSEQualityControlComponent
  },
  {
    path: "hse_climate_change_and_air_quality",
    component: HSEClimateChangeAndAirQualityComponent
  },
  {
    path: "hse_inspection_and_maintenance_facility_type_new",
    component: HSEInspectionAndMaintenanceFacilityTypeNewComponent
  },
  {
    path: "incident_reporting",
    component: AccidentIncidentReportingComponent
  },
  {
    path: "uploaded_presentations",
    component: UploadedPresentationsComponent
  },
  {
    path: "uploaded_community_development_projects",
    component: UploadedCommunityDevelopmentProjectsComponent
  },
  {
    path: "training_and_skill_acquisition",
    component: HSESustainableDevelopmentCommunityProjectSkillComponent
  },
  {
    path: "scholarships",
    component: HSESustainableDevelopmentCommunityNewScholarshipsComponent
  },
  {
    path: "hse_sustainable_development_community_project_program_csr_new",
    component: HSESustainableDevelopmentCommunityProjectCSRNewComponent
  },
  {
    path: "csr_project_details",
    component: CSRProjectDetailsComponent
  },
  {
    path: "planned_and_actual_projects",
    component: PlannedAndActualProjectsComponent
  },
  {
    path: "water_management_zone",
    component:WaterManagementZoneComponent
  },
  {
    path:"water_management",
    component: WaterManagementComponent
  },
  {
    path: "waste_management_upload",
    component: WasteManagementUploadComponent
  },
  {
    path: "environmental_management_system",
    component: EnvironmentalManagementSystemComponent
  },
  {
    path: "waste_management",
    component: WasteManagementComponent
  },
  {
    path: "osp_registration",
    component: OspRegistrationComponent
  },
  {
    path: "causes_of_oil_spill",
    component: CausesOfOilSpillComponent
  },
  {
    path: "oil_spill_reporting",
    component: OilSpillReportingComponent
  },
  {
    path: "rbi",
    component: AssetRegisterTemplateRbiComponent
  },
  {
    path: "prescription_strategy",
    component: AssetRegisterTemplatePrescriptionStrategyComponent
  },
  {
    path: "general_report",
    component: WorkProgramReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
