// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { map, retry } from 'rxjs/operators';
// import { GenericService } from './generic.services';
// import { CONCESSION_SITUATION } from '../models/step1-concession.model';
// import {
//   HSE_ACCIDENT_INCIDENCE_REPORTING_NEW,
//   HSE_ACCIDENT_INCIDENCE_MODEL,
//   HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW,
//   HSE_ASSET_REGISTER_TEMPLATE_RBI_EQUIPMENT_INSPECTION_STRATEGY_NEW,
//   HSE_CAUSES_OF_SPILL,
//   HSE_CLIMATE_CHANGE_AND_AIR_QUALITY,
//   HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW,
//   HSE_INSPECTION_AND_MAINTENANCE_NEW,
//   HSE_OIL_SPILL_REPORTING_NEW,
//   HSE_OSP_REGISTRATIONS_NEW,
//   HSE_QUALITY_CONTROL,
//   HSE_SAFETY_STUDIES_NEW,
//   HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW,
//   HSE_FATALITY,
//   HSE_DESIGNS_SAFETY,
//   HSE_ENVIRONMENTAL_STUDIES_NEW_UPDATED,
//   HSE_ENVIRONMENTAL_STUDIES_NEW,
//   HSE_WASTE_MANAGEMENT_NEW,
//   HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW,
//   HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED,
//   HSE_PRODUCED_WATER_MANAGEMENT_NEW,
//   HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW,
//   HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW,
//   HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW,
//   HSE_WASTE_MANAGEMENT_SYSTEM,
//   HSE_ENVIRONMENTAL_MANAGEMENT_SYSTEM,
//   HSE_MANAGEMENT_POSITION,
//   HSE_OCCUPATIONAL_HEALTH_MANAGEMENT,
//   HSE_SAFETY_CULTURE_TRAINING,
// } from '../models/step5_hse.model';
// import {
//   HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_PLANNED_AND_ACTUAL,
//   HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_QUESTION,
//   HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_MOU,
//   HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_SCHOLASHIP_SCHEME,
//   PICTURE_UPLOAD_COMMUNITY_DEVELOPMENT_PROJECT,
//   HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Training_Skill_Acquisition,
//   HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Scholarship,
//   HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW,
// } from 'src/app/models/step5_sdcp.model';
// import { Observable, pipe } from 'rxjs';
// import {
//   GEOPHYSICAL_ACTIVITIES_ACQUISITION,
//   GEOPHYSICAL_ACTIVITIES_PROCESSING,
// } from '../models/step1-geophysical.model';
// import {
//   DRILLING_EACH_WELL_COST,
//   DRILLING_EACH_WELL_COST_PROPOSED,
// } from '../models/step1-drilling.model';
// import {
//   budgetActualExpenditure,
//   developmentDrillingActivities,
//   exploratoryActivities,
//   facilitiesDevelopmentProject,
//   productionCost,
// } from '../models/step3-budget-performance.model';
// import {
//   budgetProposal,
//   capexOpex,
// } from '../models/step3-budget-proposal.model';
// import {
//   facilitiesProjectPerformance,
//   newTechnologyAndConformityAssessment,
//   oilAndGasFacilityMaintenanceProject,
// } from '../models/step3-budget-facility-maintenance.model';
// import {
//   INITIAL_WELL_COMPLETION_JOB1,
//   WORKOVERS_RECOMPLETION_JOB1,
// } from '../models/step2-initial';
// import {
//   LEGAL_ARBITRATION,
//   LEGAL_LITIGATION,
//   NIGERIA_CONTENT_QUESTION,
//   NIGERIA_CONTENT_Training,
//   NIGERIA_CONTENT_Upload_Succession_Plan,
//   STRATEGIC_PLANS_ON_COMPANY_BASES,
// } from '../models/step4-NCQ.model';
// import {
//   FIELD_DEVELOPMENT_PLAN,
//   FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE,
//   GAS_PRODUCTION_ACTIVITY,
//   OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED,
//   OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity,
//   OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION,
//   OIL_CONDENSATE_PRODUCTION_ACTIVITy,
//   POST_RESERVES_REPLACEMENT_RATIO,
//   RESERVES_UPDATES_DEPLETION_RATE,
//   RESERVES_UPDATES_LIFE_INDEX,
//   RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION,
//   RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition,
//   RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE,
//   RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection,
//   RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE,
// } from '../models/step2-FIPR.model';
// import { Royalty } from '../models/step1-royalty.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class WorkProgramService {
//   private num = 2;

//   constructor(private http: HttpClient, private gen: GenericService) {}

//   getConcessionHeld(id, year) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/get_concession_held`, {
//         params: { mycompanyId: id, myyear: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getConcessionField(concessionName, companyId) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/get_concessions_fields`, {
//         params: { concessionID: concessionName, companyID: companyId },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getCompletedSteps(concessionName) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/getcompletedpages`, {
//         params: { omlname: concessionName },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getWPYearList() {
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/get_wpyear_list`)
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getFormOne(omlName, fieldName, year) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/get_form_one_concession`, {
//         params: { omlName: omlName, fieldName: fieldName, myyear: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getFormOneGeoPhysical(omlName, fieldName, year) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/get_form_one_geophysical`,
//         { params: { omlName: omlName, fieldName: fieldName, myyear: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getDrilling(omlName, fieldName, year) {
//     if (!fieldName) {
//       fieldName = '0';
//     }
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_ONE_DRILLING`, {
//         params: { omlName: omlName, fieldName: fieldName, myyear: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getFormThreeBudget(omlName, year, fieldName) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/get_form_three_budget_performance`,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   getFormThreeBudget_2(omlName, year, fieldName) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/get_form_three_budget_proposal_in_naira_dollar`,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getFormThreeBudget_3(omlName, year, fieldName) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/get_form_three_oil_gas_facility_maintenance`,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getFormFiveHSE(omlName, year, fieldName) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/get_form_five_hse`, {
//         params: { omlName: omlName, fieldName: fieldName, year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   getFormFiveSCDP(omlName, year, fieldName) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/get_form_five_sdcp`, {
//         params: { omlName: omlName, fieldName: fieldName, year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   concessionSituation(
//     conbody: CONCESSION_SITUATION,
//     year: string,
//     omlName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_concession_situation`,
//         conbody,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveQuarterAcquisition(
//     conbody: GEOPHYSICAL_ACTIVITIES_ACQUISITION,
//     year: string,
//     omlName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_geophysical_activities_acquisition`,
//         conbody,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveQuarterProcessing(
//     conbody: GEOPHYSICAL_ACTIVITIES_PROCESSING,
//     year: string,
//     omlName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_geophysical_activities_processing`,
//         conbody,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveCategoryQuarter(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_drilling_operations_categories_of_well`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   saveCostProposedQuarter(
//     conbody: DRILLING_EACH_WELL_COST_PROPOSED,
//     year: string,
//     omlName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_drilling_each_well_cost_proposed`,
//         conbody,
//         { params: { omlName: omlName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   //#region Step 3
//   getBudgetActualExpenditure(omlName, year) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/get_budget_actual_expenditure`,
//         { params: { omlName: omlName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getBudgetExploratory(omlName, year) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/get_budget_performance_exploratory_activity`,
//         { params: { omlName: omlName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getBudgetDevelopmentDrilling(omlName, year) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/get_budget_performance_development_drilling_activity`,
//         { params: { omlName: omlName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   getBudgetFacilitiesDevelopment(omlName, year) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/get_budget_performance_facilities_development_project`,
//         { params: { omlName: omlName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getWorkover(year: string, omlName: string, fieldName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/GET_FORM_TWO_WORKOVERS_RECOMPLETION_JOB`,
//         { params: { year: year, omlName: omlName, fieldName: fieldName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveWorkover(
//     conbody: WORKOVERS_RECOMPLETION_JOB1,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_WORKOVERS_RECOMPLETION_JOB`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getFDP(year: string, omlName: string, fieldName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/GET_FORM_TWO_FDP_UNITISATION`,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getGasProduction(year: string, omlName: string, fieldName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/GET_FORM_TWO_GAS_PRODUCTION`,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveGasProduction(
//     conbody: GAS_PRODUCTION_ACTIVITY,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_GAS_PRODUCTION_ACTIVITY`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getOilProduction(year: string, omlName: string, fieldName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/GET_FORM_TWO_OIL_PRODUCTION`,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveOilProduction(
//     conbody: OIL_CONDENSATE_PRODUCTION_ACTIVITy,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_OIL_CONDENSATE_PRODUCTION_ACTIVITY`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveMonthlyActivity(
//     conbody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_OIL_CONDENSATE_PRODUCTION_ACTIVITIES_MONTHLY_ACTIVITY`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveProposedActivity(
//     conbody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_OIL_CONDENSATE_PRODUCTION_ACTIVITIES_MONTHLY_ACTIVITIES_PROPOSED`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveFiveYearForecast(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveFDP(
//     conbody: FIELD_DEVELOPMENT_PLAN,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_FIELD_DEVELOPMENT_PLAN`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getReservesUpdate(year: string, omlName: string, fieldName: string) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_TWO_RESERVES`, {
//         params: { omlName: omlName, fieldName: fieldName, year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveReserveUpdatePreceeding(
//     conbody: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE_PRECEEDING`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveReserveUpdateCurrent(
//     conbody: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE_CURRENT`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveReserveUpdateFiveYearPorjection(
//     conbody: RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_FIVEYEARS_PROJECTION`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((res) => res)
//       );
//   }

//   saveReserveUpdateOilCondensateCompanyAnnualProduction(
//     conbody: RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_COMPANY_ANNUAL_PRODUCTION`,
//         conbody,
//         {
//           params: {
//             omlName: omlName,
//             fieldName: fieldName,
//             year: year,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((res) => res)
//       );
//   }

//   saveUpdateOilCondensateReservesAddition(
//     conbody: RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_RESERVES_Addition`,
//         conbody,
//         {
//           params: {
//             omlName: omlName,
//             fieldName: fieldName,
//             year: year,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((res) => res)
//       );
//   }

//   saveUpdateOilCondensateReservesDecline(
//     conbody: RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_RESERVES_DECLINE`,
//         conbody,
//         {
//           params: { omlName: omlName, fieldName: fieldName, year: year },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((res) => res)
//       );
//   }

//   saveReserveReplacementRatio(
//     conbody: POST_RESERVES_REPLACEMENT_RATIO,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_RESERVES_REPLACEMENT_RATIO`,
//         conbody,
//         {
//           params: { omlName: omlName, fieldName: fieldName, year: year },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((res) => res)
//       );
//   }

//   getReserveUpdateDepletionRate(
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/Report/RESERVES_UPDATES_DEPLETION_RATE`,
//         {
//           params: { omlName: omlName, fieldName: fieldName, myyear: year },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveReserveUpdateDepletionRate(
//     conbody: RESERVES_UPDATES_DEPLETION_RATE,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_DEPLETION_RATE`,
//         conbody,
//         {
//           params: { omlName: omlName, fieldName: fieldName, year: year },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((res) => res)
//       );
//   }

//   saveReserveUpdateLifeIndex(
//     conbody: RESERVES_UPDATES_LIFE_INDEX,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_LIFE_INDEX`,
//         conbody,
//         {
//           params: { omlName: omlName, fieldName: fieldName, year: year },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((res) => res)
//       );
//   }

//   saveFieldDevelopmentExpectedReserves(
//     conbody: FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE`,
//         conbody,
//         {
//           params: { omlName: omlName, fieldName: fieldName, year: year },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((res) => res)
//       );
//   }

//   saveUnitization(
//     conbody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION`,
//         conbody,
//         {
//           params: { omlName: omlName, fieldName: fieldName, year: year },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((res) => res)
//       );
//   }

//   post_Budget(
//     budget: budgetActualExpenditure,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_budget_actual_expenditure`,
//         budget,
//         { params: { year: year, omlName: omlName, fieldName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_Exploratory(
//     budget: exploratoryActivities,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_budget_performance_exploratory_activity`,
//         budget,
//         { params: { year: year, omlName: omlName, fieldName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_Development(
//     budget: developmentDrillingActivities,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_budget_performance_development_drilling_activity`,
//         budget,
//         { params: { year: year, omlName: omlName, fieldName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_Facility(
//     budget: facilitiesDevelopmentProject,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_budget_performance_facilities_development_project`,
//         budget,
//         { params: { year: year, omlName: omlName, fieldName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_Production(
//     budget: productionCost,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_budget_performance_production_cost`,
//         budget,
//         { params: { year: year, omlName: omlName, fieldName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_BudgetProposal(
//     budget: budgetProposal,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_budget_proposal_in_naira_and_dollar_component`,
//         budget,
//         { params: { year: year, omlName: omlName, fieldName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_Opex(
//     budget: capexOpex,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_budget_capex_opex`,
//         budget,
//         { params: { year: year, omlName: omlName, fieldName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_OilGas(
//     budget: oilAndGasFacilityMaintenanceProject,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_oil_and_gas_facility_maintenance_project`,
//         budget,
//         { params: { year: year, omlName: omlName, fieldName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_Technology(
//     budget: newTechnologyAndConformityAssessment,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_oil_condensate_production_activities_new_technology_conformity_assessment`,
//         budget,
//         { params: { year: year, omlName: omlName, fieldName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_FacilityProject(
//     budget: facilitiesProjectPerformance,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_facilities_project_performance`,
//         budget,
//         { params: { year: year, omlName: omlName, fieldName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   //#endregion

//   //Step 5 linking
//   getFormFive_HSE(omlName, year, fieldName) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/get_form_five_hse`, {
//         params: { omlName: omlName, fieldName: fieldName, year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_TechnicalSafety(
//     conbody: HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_technical_safety_control_studies_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             actionToDo,
//             id,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_SafetyStudies(
//     conbody: HSE_SAFETY_STUDIES_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_safety_studies_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             actionToDo,
//             id,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_SafetyStudies_2(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     actionToDo,
//     id
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_safety_studies_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             actionToDo,
//             id,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_Management(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_management_position`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             actionToDo,
//             id,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_SafetyCulture(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_safety_culture_training`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id: id,
//             actionToDo: actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_Occupational(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_occupational_health_management`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_QualityControl(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_quality_control`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_ClimateChange(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_climate_change_and_air_quality`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_Management_Position(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_management_position`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_InspectionMaintenance(
//     conbody: HSE_INSPECTION_AND_MAINTENANCE_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_inspection_and_maintenance_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_AssetRegister_PRE(
//     conbody: HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_asset_register_template_prescriptive_equipment_inspection_strategy_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_AssetRegister_RBI(
//     conbody: HSE_ASSET_REGISTER_TEMPLATE_RBI_EQUIPMENT_INSPECTION_STRATEGY_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_asset_register_template_rbi_equipment_inspection_strategy_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_OilSpill(
//     conbody: HSE_OIL_SPILL_REPORTING_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_oil_spill_reporting_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_Causes_Of_Spill(
//     conbody: HSE_CAUSES_OF_SPILL,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_causes_of_spill`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_Accident_Incidence(
//     conbody: HSE_ACCIDENT_INCIDENCE_MODEL,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_accident_incidence`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_OSP_Registrations(
//     conbody: HSE_OSP_REGISTRATIONS_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_osp_registrations_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_Community(
//     conbody: HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_community_disturbances_and_oil_spill_cost_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_Fatality(
//     conbody: HSE_FATALITY,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_fatality`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_DesignSafety(
//     conbody: HSE_DESIGNS_SAFETY,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_designs_safety`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_Environmental_Studies_New_Updated(
//     conbody: HSE_ENVIRONMENTAL_STUDIES_NEW_UPDATED,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_environmental_studies_new_updated`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_Environmental_Studies_Updated(
//     conbody: HSE_ENVIRONMENTAL_STUDIES_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_environmental_studies_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_Waste_Management(
//     conbody: HSE_WASTE_MANAGEMENT_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_waste_management_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_Waste_ManagementFacility(
//     conbody: HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_waste_management_type_of_facility_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_Waste_Management_Files(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_waste_management_system`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_Water_Management_New_Updated(
//     conbody: HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_produced_water_management_new_updated`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_Water_Management(
//     conbody: HSE_PRODUCED_WATER_MANAGEMENT_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_produced_water_management_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_Environmental_Compliance(
//     conbody: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_environmental_compliance_monitoring_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_Environmental_Chemical_Compliance(
//     conbody: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_environmental_compliance_monitoring_chemical_usage_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_HSE_Environmental_Studies_Strategic_Plan(
//     conbody: HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_environmental_studies_five_year_strategic_plan_new`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
//   post_HSE_EMS_Files(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_environmental_studies_new_updated`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

// //SCDP
// post_SDCP_CSR(conbody: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_PLANNED_AND_ACTUAL, year: string, omlName: string, fieldName: string, id, actionToDo){

//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_planned_and_actual`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }
// post_SDCP_Question(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){
//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_question`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }
// post_SDCP_MOU(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_mou`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }
// post_SDCP_Capital(conbody: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_csr_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }
// post_SDCP_Scholarship(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_scholaship_scheme`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }
// post_SDCP_Scholarship_CSR(conbody: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Scholarship, year: string, omlName: string, fieldName: string, id, actionToDo){

//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_csr_new_scholarship`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }
// post_SDCP_Training_Skills_CSR(conbody: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Training_Skill_Acquisition, year: string, omlName: string, fieldName: string, id, actionToDo){

//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_csr_new_training_skill_acquisition`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }

//   post_SDCP_Training_Details_CSR(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_training_scheme`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_SDCP_Pictures(
//     conbody: FormData,
//     year: string,
//     omlName: string,
//     fieldName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_picture_upload_community_development_project`,
//         conbody,
//         {
//           params: {
//             year: year,
//             omlName: omlName,
//             fieldName: fieldName,
//             id,
//             actionToDo,
//           },
//         }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   post_WorkProgram(data: any, year: string, omlName: string, fieldName) {
//     return this.http
//       .post<any>(`${environment.apiUrl}/workprogramme/post_workprogram`, data, {
//         params: { year: year, omlName: omlName, fieldName: fieldName },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveWellCostQuarter(
//     conbody: DRILLING_EACH_WELL_COST,
//     year: string,
//     omlName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_drilling_each_well_cost`,
//         conbody,
//         { params: { omlName: omlName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getInitialWellCompletion(year: string, omlName: string, fieldName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/GET_FORM_TWO_INITIAL_WELL_COMPLETION_JOB`,
//         { params: { year: year, omlName: omlName, fieldName: fieldName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveInitialWellCompletion(
//     conbody: INITIAL_WELL_COMPLETION_JOB1,
//     year: string,
//     omlName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_INITIAL_WELL_COMPLETION_JOB`,
//         conbody,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveNigeriaContentQuestion(
//     conbody: NIGERIA_CONTENT_QUESTION,
//     year: string,
//     omlName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_nigeria_content_question`,
//         conbody,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   deleteNigeriaContentTraining(id: any) {
//     return this.http
//       .delete<any>(
//         `${environment.apiUrl}/workprogramme/delete-nigeria-content-training?id=${id}`
//       )
//       .pipe(retry(this.num));
//   }

//   saveNigeriaContenttraining(
//     conbody: NIGERIA_CONTENT_Training,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_nigeria_content_training?omlName=${omlName}&fieldName=${fieldName}&year=${year}`,
//         conbody
//         // { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveNigeriaUploadSuccessionPlan(
//     conbody: NIGERIA_CONTENT_Upload_Succession_Plan,
//     year: string,
//     omlName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_nigeria_upload_succession_plan`,
//         conbody,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getNigeriaContentQuestion(year: string, omlName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/NIGERIA_CONTENT_QUESTION`,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   // getNigeriaContentTraining(year: string, omlName: string) {
//   // return this.http.get<any>(`${environment.apiUrl}/workprogramme/NIGERIA_CONTENT_Training`, {params: {year: year, omlName: omlName}})
//   // .pipe(retry(this.num),
//   // map((response) => {
//   //   return response
//   // })
//   // )
//   // }

//   getNigeriaUpload(year: string, omlName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/NIGERIA_CONTENT_Upload_Succession_Plan`,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getStrategicPlansOnCompanyBases(year: string, omlName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/get_strategic_plans_on_company_bases`,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveStrategicPlansOnCompanyBases(
//     conbody: STRATEGIC_PLANS_ON_COMPANY_BASES,
//     year: string,
//     omlName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_strategic_plans_on_company_bases`,
//         conbody,
//         { params: { year: year, omlName: omlName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   // saveLegalLitigation(conbody: LEGAL_LITIGATION, year: string, omlName: string) {
//   //   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_legal_litigation`, conbody, {params: {year: year, omlName: omlName}})
//   //   .pipe(retry(this.num),
//   //   map((response) => {
//   //     return response
//   //   })
//   //   )
//   // }

//   // saveArbitration(conbody: LEGAL_ARBITRATION, year: string, omlName: string) {
//   //   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_legal_arbitration`, conbody, {params: {year: year, omlName: omlName}})
//   //   .pipe(retry(this.num),
//   //   map((response) => {
//   //     return response
//   //   })
//   //   )
//   // }

//   getLegalLitigation(year: string, omlName: string) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/get_form_four_legal_proceedings`,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   // getNigeriaContent(year: string, omlName: string){
//   //   return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_nigeria_content_training`, {params: {year: year, omlName: omlName}})
//   //   .pipe(retry(this.num),
//   //   map((response) => {
//   //     return response
//   //   })
//   //   )
//   // }

//   // saveNigeriaContent(conbody: NIGERIA_CONTENT_Training, year: string, omlName: string, id, actionToDo){
//   //   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_nigeria_content_training`, conbody, {params: {year: year, omlName: omlName, id, actionToDo}})
//   //   .pipe(retry(this.num),
//   //   map((response) => {
//   //     return response
//   //   })
//   //   )
//   // }

//   getSeismicActivities(year: string) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/report/GET_SEISMIC_DATA_REPORT`, {
//         params: { year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getSeismicActivitiesReportText(year: string) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/report/EXECUTIVE_SUMMARY_REPORT2`, {
//         params: { year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getExplorationWells(year: string) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/report/Get_Exploration_Report`, {
//         params: { year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getAppraisalWells(year: string) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/report/Get_Appraisal_Report`, {
//         params: { year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getAccidentStatistics(year: string) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/report/Get_Accident_Statistics_Report`, {
//         params: { year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getDevelopmentWells(year: string) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/report/Get_Development_Report`, {
//         params: { year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getReservesUpdatestWells(year: string) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/report/Get_Reserves_Updates_Report`, {
//         params: { year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getCrudeOilProduction(year: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/report/Get_Crude_Oil_Production_Report`,
//         { params: { year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   GetGasProductionReport(year: string) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/report/Get_Gas_Production_Report`, {
//         params: { year: year },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getOilProductionText(year: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/report/Get_Crude_Oil_Production_Report_Content`,
//         { params: { year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getNigeriaContentTraining(year: string, omlName: string, fieldName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/GET_FORM_FOUR_NIGERIA_CONTENT`,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   // getNigeriaUpload(year: string, omlName: string, fieldName: string,) {
//   // return this.http.get<any>(`${environment.apiUrl}/workprogramme/NIGERIA_CONTENT_Upload_Succession_Plan`, {params: {omlName: omlName, fieldName:fieldName, year:year}})
//   // .pipe(retry(this.num),
//   // map((response) => {
//   //   return response
//   // })
//   // )
//   // }

//   getStrategicPlans(year: string, fieldName: string, omlName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/GET_FORM_FOUR_STRATEGIC_PLANS`,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveStrategicPlans(
//     conbody: STRATEGIC_PLANS_ON_COMPANY_BASES,
//     year: string,
//     fieldName: string,
//     omlName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_STRATEGIC_PLANS_ON_COMPANY_BASES`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveLegalLitigation(
//     conbody: LEGAL_LITIGATION,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/POST_LEGAL_LITIGATION`,
//         conbody,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveArbitration(conbody: LEGAL_ARBITRATION, year: string, omlName: string) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_legal_arbitration`,
//         conbody,
//         { params: { year: year, omlName: omlName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getlegalLitigation(year: string, fieldName: string, omlName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/GET_FORM_FOUR_LEGAL_PROCEEDINGS`,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getNigeriaContent(year: string, omlName: string, fieldName: string) {
//     return this.http
//       .get<any>(
//         `${environment.apiUrl}/workprogramme/get_nigeria_content_training`,
//         { params: { omlName: omlName, fieldName: fieldName, year: year } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveNigeriaContent(
//     conbody: NIGERIA_CONTENT_Training,
//     year: string,
//     omlName: string,
//     id,
//     actionToDo
//   ) {
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_nigeria_content_training`,
//         conbody,
//         { params: { year: year, omlName: omlName, id, actionToDo } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveAddStaffDisposition(
//     conbody: NIGERIA_CONTENT_Training,
//     year: string,
//     omlName: string,
//     fieldName: string
//   ) {
//     debugger;
//     return this.http
//       .post<any>(
//         `${environment.apiUrl}/workprogramme/post_nigeria_content_training`,
//         conbody,
//         { params: { year: year, omlName: omlName, fieldName: fieldName } }
//       )
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   saveRoyalty(conbody: any, year: string, omlName: string, fieldName: string) {
//     return this.http
//       .post<any>(`${environment.apiUrl}/workprogramme/post_royalty`, conbody, {
//         params: { year: year, omlName: omlName, fieldName: fieldName },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }

//   getRoyalty(omlName: string, year: string) {
//     return this.http
//       .get<any>(`${environment.apiUrl}/workprogramme/get_royalty`, {
//         params: { myyear: year, omlName: omlName },
//       })
//       .pipe(
//         retry(this.num),
//         map((response) => {
//           return response;
//         })
//       );
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators'
import { GenericService } from './generic.services';
import { CONCESSION_SITUATION } from '../models/step1-concession.model';
import { HSE_ACCIDENT_INCIDENCE_REPORTING_NEW, HSE_ACCIDENT_INCIDENCE_MODEL, HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW,
   HSE_ASSET_REGISTER_TEMPLATE_RBI_EQUIPMENT_INSPECTION_STRATEGY_NEW, HSE_CAUSES_OF_SPILL, HSE_CLIMATE_CHANGE_AND_AIR_QUALITY, HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW,
    HSE_INSPECTION_AND_MAINTENANCE_NEW, HSE_OIL_SPILL_REPORTING_NEW, HSE_OSP_REGISTRATIONS_NEW, HSE_QUALITY_CONTROL, HSE_SAFETY_STUDIES_NEW, HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW,
     HSE_FATALITY, HSE_DESIGNS_SAFETY, HSE_ENVIRONMENTAL_STUDIES_NEW_UPDATED, HSE_ENVIRONMENTAL_STUDIES_NEW, HSE_WASTE_MANAGEMENT_NEW, HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW, HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED,
     HSE_PRODUCED_WATER_MANAGEMENT_NEW, HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW, HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW,
     HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW, HSE_WASTE_MANAGEMENT_SYSTEM,
     HSE_ENVIRONMENTAL_MANAGEMENT_SYSTEM,
     HSE_MANAGEMENT_POSITION,HSE_OCCUPATIONAL_HEALTH_MANAGEMENT,
     HSE_SAFETY_CULTURE_TRAINING} from '../models/step5_hse.model';
import {HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_PLANNED_AND_ACTUAL ,HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_QUESTION, HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_MOU,
      HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_SCHOLASHIP_SCHEME, PICTURE_UPLOAD_COMMUNITY_DEVELOPMENT_PROJECT, HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Training_Skill_Acquisition
      ,HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Scholarship,HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW
    } from 'src/app/models/step5_sdcp.model';
import { Observable, pipe } from 'rxjs';
import { GEOPHYSICAL_ACTIVITIES_ACQUISITION, GEOPHYSICAL_ACTIVITIES_PROCESSING } from '../models/step1-geophysical.model';
import { DRILLING_EACH_WELL_COST, DRILLING_EACH_WELL_COST_PROPOSED } from '../models/step1-drilling.model';
import { budgetActualExpenditure, developmentDrillingActivities, exploratoryActivities, facilitiesDevelopmentProject, productionCost } from '../models/step3-budget-performance.model';
import { budgetProposal, capexOpex } from '../models/step3-budget-proposal.model';
import { facilitiesProjectPerformance, newTechnologyAndConformityAssessment, oilAndGasFacilityMaintenanceProject } from '../models/step3-budget-facility-maintenance.model';
import { INITIAL_WELL_COMPLETION_JOB1, WORKOVERS_RECOMPLETION_JOB1 } from '../models/step2-initial';
import { LEGAL_ARBITRATION, LEGAL_LITIGATION, NIGERIA_CONTENT_QUESTION, NIGERIA_CONTENT_Training, NIGERIA_CONTENT_Upload_Succession_Plan, STRATEGIC_PLANS_ON_COMPANY_BASES } from '../models/step4-NCQ.model';
import { FIELD_DEVELOPMENT_PLAN, FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE, GAS_PRODUCTION_ACTIVITY, OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED, OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity, OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION, OIL_CONDENSATE_PRODUCTION_ACTIVITy, POST_RESERVES_REPLACEMENT_RATIO, RESERVES_UPDATES_DEPLETION_RATE, RESERVES_UPDATES_LIFE_INDEX, RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION, RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition, RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE, RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection, RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE } from '../models/step2-FIPR.model';
import { Royalty } from '../models/step1-royalty.model';

@Injectable({
  providedIn: 'root'
})
export class WorkProgramService {
  private num  = 2;

  constructor( private http: HttpClient, private gen: GenericService) { }

getConcessionHeld(id, year){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_concession_held`, {params:{mycompanyId: id, myyear: year}} )
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getConcessionField(concessionName, companyId){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_concessions_fields`, {params:{concessionID: concessionName, companyID:companyId }} )
  .pipe(retry(this.num),
  map((response) => {
    return response;
  })
  )
}
getApplications(){
  return this.http.get<any>(`${environment.apiUrl}/application/all-applications`)
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
getApplication(id){
  debugger;
  return this.http.get<any>(`${environment.apiUrl}/application/viewapplication`, {params:{appID: id}} )
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
getAppsOnMyDesk(){
  debugger;
  return this.http.get<any>(`${environment.apiUrl}/application/getappsonmydesk` )
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getCompletedSteps(concessionName){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/getcompletedpages`, {params:{omlname: concessionName}} )
  .pipe(retry(this.num),
  map((response) => {
    return response;
  })
  )
}

getWPYearList(){
    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_wpyear_list`)
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  getFormOne(omlName, fieldName, year){
    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_form_one_concession`, {params:{omlName: omlName, fieldName: fieldName, myyear: year}} )
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  getFormOneGeoPhysical(omlName, fieldName, year){
    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_form_one_geophysical`, {params:{omlName: omlName, fieldName: fieldName, myyear: year}} )
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  getDrilling(omlName, fieldName, year){
    if (!fieldName) {
      fieldName = '0';
    }
    return this.http.get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_ONE_DRILLING`, {params:{omlName: omlName, fieldName: fieldName, myyear: year}} )
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  getFormThreeBudget(omlName, year, fieldName){

    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_form_three_budget_performance`, {params:{omlName: omlName, fieldName: fieldName, year: year}} )
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }
  getFormThreeBudget_2(omlName, year, fieldName){

    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_form_three_budget_proposal_in_naira_dollar`, {params:{omlName: omlName, fieldName: fieldName, year: year}} )
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  getFormThreeBudget_3(omlName, year, fieldName){

    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_form_three_oil_gas_facility_maintenance`, {params:{omlName: omlName, fieldName: fieldName, year: year}} )
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  getFormFiveHSE(omlName, year, fieldName){

    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_form_five_hse`, {params:{omlName: omlName, fieldName: fieldName, year: year}} )
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }
  getFormFiveSCDP(omlName, year, fieldName){
    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_form_five_sdcp`, {params:{omlName: omlName, fieldName: fieldName, year: year}} )
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  concessionSituation(conbody: CONCESSION_SITUATION, year: string, omlName: string){
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_concession_situation`, conbody, {params: {year: year, omlName: omlName}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }


  saveQuarterAcquisition(conbody: GEOPHYSICAL_ACTIVITIES_ACQUISITION, year: string, omlName: string) {
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_geophysical_activities_acquisition`, conbody, {params: {year: year, omlName: omlName}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }


  saveQuarterProcessing(conbody: GEOPHYSICAL_ACTIVITIES_PROCESSING, year: string, omlName: string){
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_geophysical_activities_processing`, conbody, {params: {year: year, omlName: omlName}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  saveCategoryQuarter(conbody: FormData, year: string, omlName: string, fieldName : string){
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_drilling_operations_categories_of_well`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }
  saveCostProposedQuarter(conbody: DRILLING_EACH_WELL_COST_PROPOSED, year: string, omlName: string){
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_drilling_each_well_cost_proposed`, conbody, {params: {omlName: omlName, year: year}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }
//#region Step 3
getBudgetActualExpenditure(omlName, year){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_budget_actual_expenditure`, {params:{omlName: omlName, year: year}} )
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getBudgetExploratory(omlName, year){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_budget_performance_exploratory_activity`, {params:{omlName: omlName, year: year}} )
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getBudgetDevelopmentDrilling(omlName, year){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_budget_performance_development_drilling_activity`, {params:{omlName: omlName, year: year}} )
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
getBudgetFacilitiesDevelopment(omlName, year){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_budget_performance_facilities_development_project`, {params:{omlName: omlName, year: year}} )
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getWorkover(year: string, omlName: string, fieldName: string) {
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_TWO_WORKOVERS_RECOMPLETION_JOB`, {params: {year: year, omlName: omlName, fieldName: fieldName}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

saveWorkover(conbody: WORKOVERS_RECOMPLETION_JOB1, year: string, omlName: string, fieldName: string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_WORKOVERS_RECOMPLETION_JOB`, conbody, {params: {omlName: omlName, fieldName: fieldName,  year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}


getFDP(year: string, omlName: string, fieldName: string) {
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_TWO_FDP_UNITISATION`, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getGasProduction(year: string, omlName: string, fieldName: string) {
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_TWO_GAS_PRODUCTION`, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

saveGasProduction(conbody: GAS_PRODUCTION_ACTIVITY, year: string, omlName: string, fieldName: string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_GAS_PRODUCTION_ACTIVITY`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getOilProduction(year: string, omlName: string, fieldName: string) {
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_TWO_OIL_PRODUCTION`, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

saveOilProduction(conbody: OIL_CONDENSATE_PRODUCTION_ACTIVITy, year: string, omlName: string, fieldName: string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_OIL_CONDENSATE_PRODUCTION_ACTIVITY`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

saveMonthlyActivity(conbody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity, year: string, omlName: string, fieldName: string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_OIL_CONDENSATE_PRODUCTION_ACTIVITIES_MONTHLY_ACTIVITY`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

saveProposedActivity(conbody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED, year: string, omlName: string, fieldName: string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_OIL_CONDENSATE_PRODUCTION_ACTIVITIES_MONTHLY_ACTIVITIES_PROPOSED`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

saveFiveYearForecast(conbody: FormData, year: string, omlName: string, fieldName : string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

saveFDP(conbody: FIELD_DEVELOPMENT_PLAN, year: string, omlName: string, fieldName: string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_FIELD_DEVELOPMENT_PLAN`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

// getReservesUpdate(year: string, omlName: string, fieldName: string) {
//   return this.http.get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_TWO_RESERVES`, {params: {omlName: omlName, fieldName: fieldName, year: year}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }

// saveReserveUpdatePreceeding(conbody: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE, year: string, omlName: string, fieldName: string){
//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE_PRECEEDING`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }

saveReserveUpdateCurrent(conbody: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE, year: string, omlName: string, fieldName: string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE_CURRENT`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_Budget(budget: budgetActualExpenditure,  year: string, omlName: string, fieldName: string, id, actionToDo){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_budget_actual_expenditure`, budget, {params: {year: year, omlName: omlName, fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_Exploratory(budget: exploratoryActivities,  year: string, omlName: string, fieldName: string, id, actionToDo){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_budget_performance_exploratory_activity`, budget, {params: {year: year, omlName: omlName, fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_Development(budget: developmentDrillingActivities,  year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_budget_performance_development_drilling_activity`, budget, {params: {year: year, omlName: omlName, fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_Facility(budget: facilitiesDevelopmentProject,  year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_budget_performance_facilities_development_project`, budget, {params: {year: year, omlName: omlName, fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_Production(budget: productionCost,  year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_budget_performance_production_cost`, budget, {params: {year: year, omlName: omlName, fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_BudgetProposal(budget: budgetProposal,  year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_budget_proposal_in_naira_and_dollar_component`, budget, {params: {year: year, omlName: omlName, fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_Opex(budget: capexOpex,  year: string, omlName: string, fieldName: string, id, actionToDo){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_budget_capex_opex`, budget, {params: {year: year, omlName: omlName, fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_OilGas(budget: oilAndGasFacilityMaintenanceProject,  year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_oil_and_gas_facility_maintenance_project`, budget, {params: {year: year, omlName: omlName, fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_Technology(budget: newTechnologyAndConformityAssessment,  year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_oil_condensate_production_activities_new_technology_conformity_assessment`, budget, {params: {year: year, omlName: omlName, fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_FacilityProject(budget: facilitiesProjectPerformance,  year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_facilities_project_performance`, budget, {params: {year: year, omlName: omlName, fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
//#endregion

//Step 5 linking
getFormFive_HSE(omlName, year, fieldName){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_form_five_hse`, {params:{omlName: omlName, fieldName: fieldName, year: year}} )
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_TechnicalSafety(conbody: HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_technical_safety_control_studies_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, actionToDo, id }})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_SafetyStudies(conbody: HSE_SAFETY_STUDIES_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_safety_studies_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, actionToDo, id }})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_SafetyStudies_2(conbody: FormData, year: string, omlName: string, fieldName: string, actionToDo, id){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_safety_studies_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, actionToDo, id }})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_Management(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_management_position`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, actionToDo, id }})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_SafetyCulture(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_safety_culture_training`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id: id, actionToDo: actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}


post_HSE_Occupational(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_occupational_health_management`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_QualityControl(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_quality_control`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_ClimateChange(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_climate_change_and_air_quality`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_Management_Position(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_management_position`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_InspectionMaintenance(conbody: HSE_INSPECTION_AND_MAINTENANCE_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_inspection_and_maintenance_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_AssetRegister_PRE(conbody: HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_asset_register_template_prescriptive_equipment_inspection_strategy_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}


post_HSE_AssetRegister_RBI(conbody: HSE_ASSET_REGISTER_TEMPLATE_RBI_EQUIPMENT_INSPECTION_STRATEGY_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_asset_register_template_rbi_equipment_inspection_strategy_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_OilSpill(conbody: HSE_OIL_SPILL_REPORTING_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_oil_spill_reporting_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_Causes_Of_Spill(conbody: HSE_CAUSES_OF_SPILL, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_causes_of_spill`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName,id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}



post_HSE_Accident_Incidence(conbody: HSE_ACCIDENT_INCIDENCE_MODEL, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_accident_incidence`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}


post_HSE_OSP_Registrations(conbody: HSE_OSP_REGISTRATIONS_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_osp_registrations_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_Community(conbody: HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_community_disturbances_and_oil_spill_cost_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_Fatality(conbody: HSE_FATALITY, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_fatality`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_DesignSafety(conbody: HSE_DESIGNS_SAFETY, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_designs_safety`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_Environmental_Studies_New_Updated(conbody: HSE_ENVIRONMENTAL_STUDIES_NEW_UPDATED, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_environmental_studies_new_updated`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_Environmental_Studies_Updated(conbody: HSE_ENVIRONMENTAL_STUDIES_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_environmental_studies_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_Waste_Management(conbody: HSE_WASTE_MANAGEMENT_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_waste_management_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_Waste_ManagementFacility(conbody: HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_waste_management_type_of_facility_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_Waste_Management_Files(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_waste_management_system`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_Water_Management_New_Updated(conbody: HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_produced_water_management_new_updated`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_Water_Management(conbody: HSE_PRODUCED_WATER_MANAGEMENT_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_produced_water_management_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_Environmental_Compliance(conbody: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_environmental_compliance_monitoring_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_Environmental_Chemical_Compliance(conbody: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_environmental_compliance_monitoring_chemical_usage_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_HSE_Environmental_Studies_Strategic_Plan(conbody: HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_environmental_studies_five_year_strategic_plan_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_HSE_EMS_Files(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_environmental_studies_new_updated`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

//SCDP
post_SDCP_CSR(conbody: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_PLANNED_AND_ACTUAL, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_planned_and_actual`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_SDCP_Question(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_question`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_SDCP_MOU(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_mou`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_SDCP_Capital(conbody: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_csr_new`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_SDCP_Scholarship(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_scholaship_scheme`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_SDCP_Scholarship_CSR(conbody: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Scholarship, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_csr_new_scholarship`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_SDCP_Training_Skills_CSR(conbody: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Training_Skill_Acquisition, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_csr_new_training_skill_acquisition`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_SDCP_Training_Details_CSR(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){

  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_hse_sustainable_development_community_project_program_training_scheme`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_SDCP_Pictures(conbody: FormData, year: string, omlName: string, fieldName: string, id, actionToDo){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_picture_upload_community_development_project`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName, id, actionToDo}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

post_WorkProgram(year: string, omlName: string, fieldName){
debugger;
  return this.http.post<any>(`${environment.apiUrl}/application/submitapplication`, null, {params: {year: year, omlName: omlName, fieldName: fieldName}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}
post_WorkProgramINT(data: any,year: string, concessionID, fieldID){
  debugger;
    return this.http.post<any>(`${environment.apiUrl}/application/submitapplication`, data, {params: {year: year, concessionID: concessionID, fieldID: fieldID}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }
saveWellCostQuarter(conbody: DRILLING_EACH_WELL_COST, year: string, omlName: string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_drilling_each_well_cost`, conbody, {params: {omlName: omlName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getInitialWellCompletion(year: string, omlName: string, fieldName: string) {
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_TWO_INITIAL_WELL_COMPLETION_JOB`, {params: {year: year, omlName: omlName, fieldName: fieldName}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

saveInitialWellCompletion(conbody: INITIAL_WELL_COMPLETION_JOB1, year: string, omlName: string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_INITIAL_WELL_COMPLETION_JOB`, conbody, {params: {year: year, omlName: omlName}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}


saveNigeriaContentQuestion(conbody: NIGERIA_CONTENT_QUESTION, year: string, omlName: string){
return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_nigeria_content_question`, conbody, {params: {year: year, omlName: omlName}})
.pipe(retry(this.num),
map((response) => {
  return response
})
)
}

saveNigeriaContenttraining(conbody: NIGERIA_CONTENT_Training, year: string, omlName: string){
return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_nigeria_content_training`, conbody, {params: {year: year, omlName: omlName}})
.pipe(retry(this.num),
map((response) => {
  return response
})
)
}


saveNigeriaUploadSuccessionPlan(conbody: NIGERIA_CONTENT_Upload_Succession_Plan, year: string, omlName: string){
return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_nigeria_upload_succession_plan`, conbody, {params: {year: year, omlName: omlName}})
.pipe(retry(this.num),
map((response) => {
  return response
})
)
}

getNigeriaContentQuestion(year: string, omlName: string) {
return this.http.get<any>(`${environment.apiUrl}/workprogramme/NIGERIA_CONTENT_QUESTION`, {params: {year: year, omlName: omlName}})
.pipe(retry(this.num),
map((response) => {
  return response
})
)
}


// getNigeriaContentTraining(year: string, omlName: string) {
// return this.http.get<any>(`${environment.apiUrl}/workprogramme/NIGERIA_CONTENT_Training`, {params: {year: year, omlName: omlName}})
// .pipe(retry(this.num),
// map((response) => {
//   return response
// })
// )
// }

getNigeriaUpload(year: string, omlName: string) {
return this.http.get<any>(`${environment.apiUrl}/workprogramme/NIGERIA_CONTENT_Upload_Succession_Plan`, {params: {year: year, omlName: omlName}})
.pipe(retry(this.num),
map((response) => {
  return response
})
)
}

getStrategicPlansOnCompanyBases(year: string, omlName: string){
return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_strategic_plans_on_company_bases`, {params: {year: year, omlName: omlName}})
.pipe(retry(this.num),
map((response) => {
  return response
})
)
}

saveStrategicPlansOnCompanyBases(conbody: STRATEGIC_PLANS_ON_COMPANY_BASES, year: string, omlName: string, id, actionToDo){
return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_strategic_plans_on_company_bases`, conbody, {params: {year: year, omlName: omlName, id, actionToDo}})
.pipe(retry(this.num),
map((response) => {
  return response
})
)
}



// saveLegalLitigation(conbody: LEGAL_LITIGATION, year: string, omlName: string) {
//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_legal_litigation`, conbody, {params: {year: year, omlName: omlName}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }

// saveArbitration(conbody: LEGAL_ARBITRATION, year: string, omlName: string) {
//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_legal_arbitration`, conbody, {params: {year: year, omlName: omlName}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }

getLegalLitigation(year: string, omlName: string) {
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/get_form_four_legal_proceedings`, {params: {year: year, omlName: omlName}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

// getNigeriaContent(year: string, omlName: string){
//   return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_nigeria_content_training`, {params: {year: year, omlName: omlName}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }

// saveNigeriaContent(conbody: NIGERIA_CONTENT_Training, year: string, omlName: string, id, actionToDo){
//   return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_nigeria_content_training`, conbody, {params: {year: year, omlName: omlName, id, actionToDo}})
//   .pipe(retry(this.num),
//   map((response) => {
//     return response
//   })
//   )
// }

getSeismicActivities(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/report/GET_SEISMIC_DATA_REPORT`, {params: {year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getSeismicActivitiesReportText(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/report/EXECUTIVE_SUMMARY_REPORT2`, {params: {year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getExplorationWells(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/report/Get_Exploration_Report`, {params: {year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getAppraisalWells(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/report/Get_Appraisal_Report`, {params: {year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getDevelopmentWells(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/report/Get_Development_Report`, {params: {year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getReservesUpdatestWells(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/report/Get_Reserves_Updates_Report`, {params: {year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getCrudeOilProduction(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/report/Get_Crude_Oil_Production_Report`, {params: {year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

GetGasProductionReport(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/report/Get_Gas_Production_Report`, {params: {year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}

getOilProductionText(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/report/Get_Crude_Oil_Production_Report_Content`, {params: {year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
}


getNigeriaContentTraining(year: string, omlName: string, fieldName: string) {
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_FOUR_NIGERIA_CONTENT`, {params: {omlName: omlName, fieldName:fieldName, year:year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
  }

  // getNigeriaUpload(year: string, omlName: string, fieldName: string,) {
  // return this.http.get<any>(`${environment.apiUrl}/workprogramme/NIGERIA_CONTENT_Upload_Succession_Plan`, {params: {omlName: omlName, fieldName:fieldName, year:year}})
  // .pipe(retry(this.num),
  // map((response) => {
  //   return response
  // })
  // )
  // }

  getStrategicPlans(year: string, fieldName: string, omlName: string){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_FOUR_STRATEGIC_PLANS`, {params: {omlName: omlName, fieldName:fieldName, year:year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
  }

  saveStrategicPlans(conbody: STRATEGIC_PLANS_ON_COMPANY_BASES, year: string, fieldName: string, omlName: string){
  return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_STRATEGIC_PLANS_ON_COMPANY_BASES`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
  .pipe(retry(this.num),
  map((response) => {
    return response
  })
  )
  }



  saveLegalLitigation(conbody: LEGAL_LITIGATION, year: string, omlName: string, fieldName: string) {
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/POST_LEGAL_LITIGATION`, conbody, {params: {omlName: omlName, fieldName: fieldName, year: year}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  saveArbitration(conbody: LEGAL_ARBITRATION, year: string, omlName: string) {
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_legal_arbitration`, conbody, {params: {year: year, omlName: omlName}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  getlegalLitigation(year: string, fieldName: string, omlName: string) {
    return this.http.get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_FOUR_LEGAL_PROCEEDINGS`, {params: {omlName: omlName, fieldName: fieldName, year: year}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  getNigeriaContent(year: string, omlName: string, fieldName: string){
    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_nigeria_content_training`, {params: { omlName: omlName, fieldName:fieldName, year: year}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  saveNigeriaContent(conbody: NIGERIA_CONTENT_Training, year: string, omlName: string, id, actionToDo){
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_nigeria_content_training`, conbody, {params: {year: year, omlName: omlName, id, actionToDo}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  saveAddStaffDisposition(conbody: NIGERIA_CONTENT_Training, year: string, omlName: string, fieldName: string){
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_nigeria_content_training`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  saveRoyalty(conbody: any, year: string, omlName: string, fieldName: string){
    debugger;
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_royalty`, conbody, {params: {year: year, omlName: omlName, fieldName: fieldName}})
    .pipe(retry(this.num),
    map((response) => {
      debugger;
      return response
    })
    )
  }

  getRoyalty( omlName: string, year: string,){
    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_royalty`, {params: { myyear: year, omlName: omlName, }})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

    getAccidentStatistics(year: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/report/Get_Accident_Statistics_Report`, {
        params: { year: year },
      })
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

    getReservesUpdate(year: string, omlName: string, fieldName: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/workprogramme/GET_FORM_TWO_RESERVES`, {
        params: { omlName: omlName, fieldName: fieldName, year: year },
      })
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  saveReserveUpdatePreceeding(
    conbody: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE,
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE_PRECEEDING`,
        conbody,
        { params: { omlName: omlName, fieldName: fieldName, year: year } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  saveReserveUpdateFiveYearPorjection(
    conbody: RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection,
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_FIVEYEARS_PROJECTION`,
        conbody,
        { params: { omlName: omlName, fieldName: fieldName, year: year } }
      )
      .pipe(
        retry(this.num),
        map((res) => res)
      );
  }

  saveReserveUpdateOilCondensateCompanyAnnualProduction(
    conbody: RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION,
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_COMPANY_ANNUAL_PRODUCTION`,
        conbody,
        {
          params: {
            omlName: omlName,
            fieldName: fieldName,
            year: year,
          },
        }
      )
      .pipe(
        retry(this.num),
        map((res) => res)
      );
  }

  saveUpdateOilCondensateReservesAddition(
    conbody: RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition,
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_RESERVES_Addition`,
        conbody,
        {
          params: {
            omlName: omlName,
            fieldName: fieldName,
            year: year,
          },
        }
      )
      .pipe(
        retry(this.num),
        map((res) => res)
      );
  }

  saveUpdateOilCondensateReservesDecline(
    conbody: RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE,
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_OIL_CONDENSATE_RESERVES_DECLINE`,
        conbody,
        {
          params: { omlName: omlName, fieldName: fieldName, year: year },
        }
      )
      .pipe(
        retry(this.num),
        map((res) => res)
      );
  }

  saveReserveReplacementRatio(
    conbody: POST_RESERVES_REPLACEMENT_RATIO,
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/POST_RESERVES_REPLACEMENT_RATIO`,
        conbody,
        {
          params: { omlName: omlName, fieldName: fieldName, year: year },
        }
      )
      .pipe(
        retry(this.num),
        map((res) => res)
      );
  }

  getReserveUpdateDepletionRate(
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/Report/RESERVES_UPDATES_DEPLETION_RATE`,
        {
          params: { omlName: omlName, fieldName: fieldName, myyear: year },
        }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  saveReserveUpdateDepletionRate(
    conbody: RESERVES_UPDATES_DEPLETION_RATE,
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_DEPLETION_RATE`,
        conbody,
        {
          params: { omlName: omlName, fieldName: fieldName, year: year },
        }
      )
      .pipe(
        retry(this.num),
        map((res) => res)
      );
  }

  saveReserveUpdateLifeIndex(
    conbody: RESERVES_UPDATES_LIFE_INDEX,
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/POST_RESERVES_UPDATES_LIFE_INDEX`,
        conbody,
        {
          params: { omlName: omlName, fieldName: fieldName, year: year },
        }
      )
      .pipe(
        retry(this.num),
        map((res) => res)
      );
  }

  saveFieldDevelopmentExpectedReserves(
    conbody: FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE,
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/POST_FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE`,
        conbody,
        {
          params: { omlName: omlName, fieldName: fieldName, year: year },
        }
      )
      .pipe(
        retry(this.num),
        map((res) => res)
      );}


  saveUnitization(
    conbody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION,
    year: string,
    omlName: string,
    fieldName: string
  ) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/POST_OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION`,
        conbody,
        {
          params: { omlName: omlName, fieldName: fieldName, year: year },
        }
      )
      .pipe(
        retry(this.num),
        map((res) => res)
      );
  }

    deleteNigeriaContentTraining(id: any) {
    return this.http
      .delete<any>(
        `${environment.apiUrl}/workprogramme/delete-nigeria-content-training?id=${id}`
      )
      .pipe(retry(this.num));
  }


}

