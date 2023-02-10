import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW,
  HSE_SAFETY_STUDIES_NEW,
  HSE_MANAGEMENT_POSITION,
  HSE_SAFETY_CULTURE_TRAINING,
  HSE_OCCUPATIONAL_HEALTH_MANAGEMENT,
  HSE_QUALITY_CONTROL,
  HSE_CLIMATE_CHANGE_AND_AIR_QUALITY,
  HSE_INSPECTION_AND_MAINTENANCE_NEW,
  HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW,
  HSE_ASSET_REGISTER_TEMPLATE_RBI_EQUIPMENT_INSPECTION_STRATEGY_NEW,
  HSE_OIL_SPILL_REPORTING_NEW,
  HSE_CAUSES_OF_SPILL,
  HSE_ACCIDENT_INCIDENCE_MODEL,
  HSE_OPERATIONS_SAFETY_CASE,
  HSE_OSP_REGISTRATIONS_NEW,
  HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW,
  HSE_FATALITY,
  HSE_DESIGNS_SAFETY,
  HSE_ENVIRONMENTAL_STUDIES_NEW_UPDATED,
  HSE_ENVIRONMENTAL_STUDIES_NEW,
  HSE_WASTE_MANAGEMENT_NEW,
  HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW,
  HSE_WASTE_MANAGEMENT_SYSTEM,
  HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED,
  HSE_PRODUCED_WATER_MANAGEMENT_NEW,
  HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW,
  HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW,
  HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW,
  HSE_ENVIRONMENTAL_MANAGEMENT_SYSTEM,
  environmentManagmentPlan,
  HSE_REMEDIATION_FUND,
  HSE_EFFLUENT_COMPLIANCE_MONITORING,
  HSE_POINT_SOURCE_REGISTRATION,
  HSE_GHG_MANAGEMENT_PLAN,
  HSE_HOST_COMMUNITIES_DEVELOPMENT,
  HSE_WASTE_MANAGEMENT_DISCHARGE_ZONE,
} from 'src/app/models/step5_hse.model';
import { ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import {
  IGeoActivitiesProcessing,
  IGeoActivitiesAcquisition,
  IDrillOperationCategoriesWell,
  IDrillEachCostProposed,
  IDrillEachCost,
  IHseAccidentIncidences,
  IHseAccidentIncidenceType,
  IHseAccidentModel,
  IHseAssetRegister,
  IHseAssetRegisterRBI,
  ILegalArbitration,
  ILegalLitigation,
  IClimateChange,
} from './interfaces';

@Component({
  selector: 'app-view-application-data',
  templateUrl: './view-application-data.component.html',
  styleUrls: ['./view-application-data.component.scss'],
})
export class ViewApplicationDataComponent implements OnInit {
  public sbuReport;
  public appId: number;

  //workprogram
  public geoActivitiesProcessing: IGeoActivitiesProcessing[] = [];
  public geoActivitiesAcquisitions: IGeoActivitiesAcquisition[] = [];
  public drillOperationCategoriesWells: IDrillOperationCategoriesWell[] = [];
  public drillEachCostProposeds: IDrillEachCostProposed[] = [];
  public drillEachCosts: IDrillEachCost[] = [];

  //hse
  public hseAccidentIncidences: IHseAccidentIncidences[] = [];
  public hseAccidentIncidenceTypes: IHseAccidentIncidenceType[] = [];
  public hseAccidentModels: IHseAccidentModel[] = [];
  public hseAssetRegisters: IHseAssetRegister[] = [];
  public hseAssetRegisterRBIs: IHseAssetRegisterRBI[] = [];
  public hseClimateChanges: IClimateChange[] = [];

  public hseTechnicals: HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW[] = [];
  public hseSafetyStudies: HSE_SAFETY_STUDIES_NEW[] = [];
  public hseManagementPositions: HSE_MANAGEMENT_POSITION[] = [];
  public hseSafetyCultureTrainings: HSE_SAFETY_CULTURE_TRAINING[] = [];
  public occupationHealthManagements: HSE_OCCUPATIONAL_HEALTH_MANAGEMENT[] = [];
  public qualityControlDocuments: HSE_QUALITY_CONTROL[] = [];
  public inspectionMaintenances: HSE_INSPECTION_AND_MAINTENANCE_NEW[] = [];
  public oilSpillReportings: HSE_OIL_SPILL_REPORTING_NEW[] = [];
  public operationsSafetyCases: HSE_OPERATIONS_SAFETY_CASE[] = [];
  public ospRegulations: HSE_OSP_REGISTRATIONS_NEW[] = [];
  public communityDisturbances: HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW[] =
    [];
  public fatalitiesCasualties: HSE_FATALITY[] = [];
  public lossPreventionStudies: HSE_DESIGNS_SAFETY[] = [];
  public environmentalStudiesUpdatedList: HSE_ENVIRONMENTAL_STUDIES_NEW_UPDATED[] =
    [];
  public environmentalStudies: HSE_ENVIRONMENTAL_STUDIES_NEW[] = [];
  public wasteManagements: HSE_WASTE_MANAGEMENT_NEW[] = [];
  public wasterManagementFacilities: HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW[] =
    [];
  public wasterManagementFiles: HSE_WASTE_MANAGEMENT_SYSTEM[] = [];
  public producedWaterManagementUpdatedList: HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED[] =
    [];
  public producedWaterManagements: HSE_PRODUCED_WATER_MANAGEMENT_NEW[] = [];
  public environmentalComplianceMonitoring: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW[] =
    [];
  public environmentalComplianceChemicals: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW[] =
    [];
  public environmentalStudiesFiveYearsSPs: HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW[] =
    [];
  public environmentalManagementSystems: HSE_ENVIRONMENTAL_MANAGEMENT_SYSTEM[] =
    [];

  public environmentalManagementPlans: environmentManagmentPlan[] = [];

  public remediationFunds: HSE_REMEDIATION_FUND[] = [];

  public effluentMonitoringCompliances: HSE_EFFLUENT_COMPLIANCE_MONITORING[] =
    [];

  public pointSourcePermits: HSE_POINT_SOURCE_REGISTRATION[] = [];

  public GHGManagementPlans: HSE_GHG_MANAGEMENT_PLAN[] = [];

  public HostCommunitiesDevelopments: HSE_HOST_COMMUNITIES_DEVELOPMENT[] = [];

  public wasteManagementDZs: HSE_WASTE_MANAGEMENT_DISCHARGE_ZONE[] = [];
  //#endregion

  //legal
  public legalArbitrations: ILegalArbitration[] = [];
  public legalLitigations: ILegalLitigation[] = [];

  //#region workprogram
  hhaiColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'companY_ID',
      header: 'Company ID',
    },
    {
      columnDef: 'companyName',
      header: 'Company Name',
    },
    {
      columnDef: 'companyemail',
      header: 'Company Email',
    },
    {
      columnDef: 'consession_Type',
      header: 'Concession Type',
    },
    {
      columnDef: 'omL_Name',
      header: 'OML Name',
    },
    {
      columnDef: 'quater',
      header: 'Quarter',
    },
    {
      columnDef: 'was_there_any_accident_incidence',
      header: 'Was There Any Accident Incidence',
    },
    {
      columnDef: 'uploadIncidentStatisticsPath',
      header: 'Uploaded Incident Statistics File',
    },
    {
      columnDef: 'proposeD_year',
      header: 'Proposed Year',
    },
    {
      columnDef: 'actuaL_year',
      header: 'Actual Year',
    },
  ];

  hdecColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'companY_ID',
      header: 'Company ID',
    },
    {
      columnDef: 'companyName',
      header: 'Company Name',
    },
    {
      columnDef: 'companyemail',
      header: 'Company Email',
    },
    {
      columnDef: 'consession_Type',
      header: 'Concession Type',
    },
    {
      columnDef: 'omL_Name',
      header: 'OML Name',
    },
    {
      columnDef: 'quater',
      header: 'Quarter',
    },
    {
      columnDef: 'surface_cordinates_for_each_well_in_degrees',
      header: 'Surface Coordinates For Each Well in degrees',
    },
    {
      columnDef: 'well_cost',
      header: 'Well Cost',
    },
    {
      columnDef: 'well_name',
      header: 'Well Name',
    },
  ];

  hdecpColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'companY_ID',
      header: 'Company ID',
    },
    {
      columnDef: 'companyName',
      header: 'Company Name',
    },
    {
      columnDef: 'companyemail',
      header: 'Company Email',
    },
    {
      columnDef: 'consession_Type',
      header: 'Concession Type',
    },
    {
      columnDef: 'omL_Name',
      header: 'OML Name',
    },
    {
      columnDef: 'quater',
      header: 'Quarter',
    },
    {
      columnDef: 'surface_cordinates_for_each_well_in_degrees',
      header: 'Surface Coordinates For Each Well in degrees',
    },
    {
      columnDef: 'well_cost',
      header: 'Well Cost',
    },
    {
      columnDef: 'well_name',
      header: 'Well Name',
    },
  ];

  hdocpwColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'companY_ID',
      header: 'Company ID',
    },
    {
      columnDef: 'companyName',
      header: 'Company Name',
    },
    {
      columnDef: 'companyemail',
      header: 'Company Email',
    },
    {
      columnDef: 'consession_Type',
      header: 'Concession Type',
    },
    {
      columnDef: 'omL_Name',
      header: 'OML Name',
    },
    {
      columnDef: 'quater',
      header: 'Quarter',
    },
    {
      columnDef: 'number_of_Days_to_Total_Depth',
      header: 'Number of Days to Total Depth',
    },
    {
      columnDef: 'processing_Fees_Paid',
      header: 'Processing Fees Paid',
    },
    {
      columnDef: 'no_of_wells_cored',
      header: 'Number of Wells Cored',
    },
    {
      columnDef: 'propose_well_names',
      header: 'Proposed Well Names',
    },
    {
      columnDef: 'proposed_No_Drilled',
      header: 'Proposed No. of Drilled Wells',
    },
    {
      columnDef: 'proposed_cost_per_well',
      header: 'Proposed Cost Per Well',
    },

    {
      columnDef: 'proposed_year',
      header: 'Proposed Year',
    },
    {
      columnDef: 'rig_Name',
      header: 'Rig Name',
    },
    {
      columnDef: 'rig_type',
      header: 'Rig Type',
    },
    {
      columnDef: 'spud_date',
      header: 'Spud Date',
    },
    {
      columnDef: 'state_the_field_where_Discovery_was_made',
      header: 'State The Field Where Discovery Was Made',
    },
    {
      columnDef: 'surface_cordinates_for_each_well_in_degrees',
      header: 'Surface Coordinates For Each Well in degrees',
    },
    {
      columnDef: 'target_reservoir',
      header: 'Target Reservoir',
    },
    {
      columnDef: 'terrain',
      header: 'Terrain',
    },
    {
      columnDef: 'terrain_Drill',
      header: 'Terrain Drilling',
    },
    {
      columnDef: 'true_vertical_depth',
      header: 'True Vertical Depth',
    },
    {
      columnDef: 'wellName',
      header: 'Well Name',
    },
    {
      columnDef: 'well_Status_and_Depth',
      header: 'Well Status And Depth',
    },

    {
      columnDef: 'well_trajectory',
      header: 'Well Trajectory',
    },
    {
      columnDef: 'well_type',
      header: 'Well Type',
    },
  ];

  hgaaColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'companY_ID',
      header: 'Company ID',
    },
    {
      columnDef: 'companyName',
      header: 'Company Name',
    },
    {
      columnDef: 'companyemail',
      header: 'Company Email',
    },
    {
      columnDef: 'consession_Type',
      header: 'Concession Type',
    },
    {
      columnDef: 'omL_Name',
      header: 'OML Name',
    },
    {
      columnDef: 'quater',
      header: 'Quarter',
    },
    {
      columnDef: 'budeget_Allocation_USD',
      header: 'Budget Allocation(USD)',
    },
    {
      columnDef: 'gas_Sales_Royalty_Payment',
      header: 'Gas Sales Royalty Payment',
    },
    {
      columnDef: 'gas_flare_Royalty_payment',
      header: 'Gas Flare Royalty Payment',
    },
    {
      columnDef: 'geo_Activity_Timeline',
      header: 'Geological Activity Timeline',
    },
    {
      columnDef: 'geo_Completion_Status',
      header: 'Geological Completion Status',
    },

    {
      columnDef: 'geo_Record_Length_of_Data',
      header: 'Geological Record Length of Data',
    },
    {
      columnDef: 'geo_acquired_geophysical_data',
      header: 'Geological Acquired Geophysical Data',
    },
    {
      columnDef: 'geo_area_of_coverage',
      header: 'Geological Area of Coverage',
    },
    {
      columnDef: 'geo_method_of_acquisition',
      header: 'Geological Method of Acquisition',
    },
    {
      columnDef: 'geo_type_of_data_acquired',
      header: 'Geological Type of Data Acquired',
    },
    // {
    //   columnDef: 'geophysical_ActivitiesId',
    //   header: 'Geophyscial Activities ID',
    // },
    {
      columnDef: 'name_of_Contractor',
      header: 'Name of Contractor',
    },
    {
      columnDef: 'no_of_Folds',
      header: 'No. of Folds',
    },
    {
      columnDef: 'proposed_year',
      header: 'Proposed Year',
    },
    {
      columnDef: 'proposed_year_data',
      header: 'Proposed Year Data',
    },
    {
      columnDef: 'quantum',
      header: 'Quantum',
    },
    {
      columnDef: 'quantum_Approved',
      header: 'Quantum Approved',
    },

    {
      columnDef: 'quantum_Planned',
      header: 'Quantum Planned',
    },
    {
      columnDef: 'quantum_carry_forward',
      header: 'Quantum Carry Form',
    },

    {
      columnDef: 'remarks',
      header: 'Remarks',
    },
    {
      columnDef: 'terrain',
      header: 'Terrain',
    },
  ];

  hgapColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'companY_ID',
      header: 'Company ID',
    },
    {
      columnDef: 'companyName',
      header: 'Company Name',
    },
    {
      columnDef: 'companyemail',
      header: 'Company Email',
    },
    {
      columnDef: 'consession_Type',
      header: 'Concession Type',
    },
    {
      columnDef: 'omL_Name',
      header: 'OML Name',
    },
    {
      columnDef: 'quater',
      header: 'Quarter',
    },
    {
      columnDef: 'budeget_Allocation_USD',
      header: 'Budget Allocation(USD)',
    },
    {
      columnDef: 'gas_Sales_Royalty_Payment',
      header: 'Gas Sales Royalty Payment',
    },
    {
      columnDef: 'gas_flare_Royalty_payment',
      header: 'Gas Flare Royalty Payment',
    },
    {
      columnDef: 'geo_Activity_Timeline',
      header: 'Geological Activity Timeline',
    },
    {
      columnDef: 'geo_Completion_Status',
      header: 'Geological Completion Status',
    },

    {
      columnDef: 'geo_Record_Length_of_Data',
      header: 'Geological Record Length of Data',
    },
    {
      columnDef: 'geo_acquired_geophysical_data',
      header: 'Geological Acquired Geophysical Data',
    },
    {
      columnDef: 'geo_area_of_coverage',
      header: 'Geological Area of Coverage',
    },
    {
      columnDef: 'geo_method_of_acquisition',
      header: 'Geological Method of Acquisition',
    },
    {
      columnDef: 'geo_type_of_data_acquired',
      header: 'Geological Type of Data Acquired',
    },
    // {
    //   columnDef: 'geophysical_ActivitiesId',
    //   header: 'Geophyscial Activities ID',
    // },
    {
      columnDef: 'name_of_Contractor',
      header: 'Name of Contractor',
    },
    {
      columnDef: 'no_of_Folds',
      header: 'No. of Folds',
    },
    {
      columnDef: 'proposed_year',
      header: 'Proposed Year',
    },
    {
      columnDef: 'proposed_year_data',
      header: 'Proposed Year Data',
    },
    {
      columnDef: 'quantum',
      header: 'Quantum',
    },
    {
      columnDef: 'quantum_Approved',
      header: 'Quantum Approved',
    },

    {
      columnDef: 'quantum_Planned',
      header: 'Quantum Planned',
    },
    {
      columnDef: 'quantum_carry_forward',
      header: 'Quantum Carry Form',
    },

    {
      columnDef: 'remarks',
      header: 'Remarks',
    },
    {
      columnDef: 'terrain',
      header: 'Terrain',
    },
  ];

  //#region hse
  htsColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    // {
    //   columnDef: 'facility',
    //   header: 'Facility',
    // },
    {
      columnDef: 'type_of_facility',
      header: 'Type of Facility',
    },
    {
      columnDef: 'number_of_facilities',
      header: 'Number of Facility',
    },
    {
      columnDef: 'study_type',
      header: 'Study Type',
    },
    {
      columnDef: 'facility_location',
      header: 'Facility Location',
    },
    {
      columnDef: 'remarks',
      header: 'Remarks',
    },
  ];

  hssColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'did_you_carry_out_safety_studies',
      header: 'Did You Carry Out Safety Studies',
    },
    {
      columnDef: 'state_Project_Name_for_which_studies_was_carried_out',
      header: 'State Project Name For Which Studies Was Carried Out',
    },
    {
      columnDef: 'list_the_studies',
      header: 'List The Studies',
    },
    {
      columnDef: 'list_identified_Major_Accident_Hazards_for_the_study',
      header: 'List Identified Major Accident Hazards For The Study(s)',
    },
    {
      columnDef: 'doyouhaveSMSinPlace',
      header: 'Do You Have a Safety Management System',
    },
    {
      columnDef: 'smsFileUploadPath',
      header: 'Upload Safety Management Document',
    },
  ];

  hmpColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'organogramrFilePath',
      header: 'CURRENT ORGANOGRAM',
    },
    {
      columnDef: 'promotionLetterFilePath',
      header: 'HSE MANAGER APPOINTMENT OR PROMOTION LETTER',
    },
  ];

  hsctColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'areThereTrainingPlansForHSE',
      header: 'Are there Training Plans for HSE Personnel?',
    },
    {
      columnDef: 'evidenceOfTrainingPlanPath',
      header: 'Upload Evidence of Training Plan',
    },
    {
      columnDef: 'remark',
      header: 'Remark',
    },
    {
      columnDef: 'safetyCurrentYearFilePath',
      header: 'Accident Statistics for the year',
    },
    {
      columnDef: 'safetyLast2YearsFilePath',
      header: 'Accident Statistics for the last 2 years',
    },
  ];

  hrfColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'areThereEvidentOfSampling',
      header: 'Do you have Evidence of Sampling Certificate?',
    },
    {
      columnDef: 'evidenceOfSamplingPath',
      header: 'Evidence of Payment of Sampling Certificate',
    },
    {
      columnDef: 'reasonForNoEvidenceSampling',
      header: 'Remark',
    },
  ];

  hghgColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'doYouHaveGHG',
      header: 'Do you have GHG Management Plan Approval?',
    },
    {
      columnDef: 'ghgApprovalPath',
      header: 'Upload GHG Approval Certificate',
    },
    {
      columnDef: 'reasonForNoGHG',
      header: 'Reason for no GHG',
    },
    {
      columnDef: 'doYouHaveLDRCertificate',
      header: 'Do you have Leak Detection and Repairs Certificate?',
    },
    {
      columnDef: 'ldrCertificatePath',
      header: 'Upload Evidence LDR Certificate',
    },
    {
      columnDef: 'reasonForNoLDR',
      header: 'Reason for no LDR',
    },
  ];

  hhcdColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'doYouHaveEvidenceOfReg',
      header: 'Do you have Evidence of Registration of Trust Fund?',
    },
    {
      columnDef: 'doYouHaveEvidenceOfPay',
      header:
        'Do you have Evidence of 3% Payment to the Trust Fund by the Settlor?',
    },
    {
      columnDef: 'evidenceOfRegTrustFundPath',
      header: 'Evidence of Trust Fund Registration',
    },
    {
      columnDef: 'evidenceOfPayTrustFundPath',
      header: 'Evidence of Trust Fund Payment',
    },
    {
      columnDef: 'uploadCommDevPlanApprovalPath',
      header: 'Evidence of Community Development Plan Approval',
    },
    {
      columnDef: 'reasonForNoEvidenceOfRegTF',
      header: 'Reason for no Evidence of Trust Fund Registration',
    },
    {
      columnDef: 'reasonForNoEvidenceOfPayTF',
      header: 'Reason for no Evidence of Trust Fund Payment',
    },
  ];

  hwmdzColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'wasterContractorNames',
      header: "Waste Contractor's Names",
    },
    {
      columnDef: 'wasteServicePermitPath',
      header: "Waste Contractor's Service Permit",
    },
    {
      columnDef: 'produceWaterManagementPlan',
      header: 'What type of Produced Water Management Plan do you have?',
    },
    {
      columnDef: 'evidenceOfReInjectionPermitFilename',
      header: 'Upload Evidence of Re-injection Permit',
    },
    {
      columnDef: 'reasonForNoEvidenceOfReInjection',
      header: 'Reaons For No Evidence of Re-Injection Permit',
    },
    {
      columnDef: 'doYouHavePreviousYearWasteInventoryReport',
      header: 'Do you have the previous year Waste Inventory Report?',
    },

    {
      columnDef: 'evidenceOfEWDPPath',
      header: 'Upload Evidence of EWDP Permit',
    },
    {
      columnDef: 'reasonForNoEvidenceOfEWDP',
      header: 'Reason For No Evidence of EWDP',
    },
  ];

  hpspColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'safetyCurrentYearFilename',
      header: 'Accident Statistics for the year',
    },
    {
      columnDef: 'evidenceOfRegTrustFundPath',
      header: 'Upload Evidence of Trust Fund Registration',
    },
    ,
    {
      columnDef: 'reasonForNoEvidenceOfRegTF',
      header: 'Remark',
    },
    {
      columnDef: 'doYouHaveEvidenceOfPay',
      header:
        'Do you have Evidence of 3% Payment to the Trust Fund by the Settlor?',
    },
    {
      columnDef: 'evidenceOfPayTrustFundPath',
      header: 'Upload Evidence of Payment',
    },
    {
      columnDef: 'reasonForNoEvidenceOfPayTF',
      header: 'Remark',
    },
  ];

  hemcColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'safetyCurrentYearFilename',
      header: 'Accident Statistics for the year',
    },
    {
      columnDef: 'safetyLast2YearsFilename',
      header: 'Accident Statistics for the last 2 years',
    },
  ];

  hohmColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'doYouHaveAnOhm',
      header: 'Do you have an OHM plan?',
    },
    {
      columnDef: 'wasOhmPolicyCommunicatedToStaff',
      header: 'Was OHM Policy Communicated to Staff?',
    },
    {
      columnDef: 'ohMplanFilePath',
      header: 'Evidence of submission of OHM plan',
    },
    {
      columnDef: 'ohMplanCommunicationFilePath',
      header: 'Evidence of communication of OHM plan/policies',
    },
    {
      columnDef: 'reasonForNoOhm',
      header: 'Reason for no OHM',
    },
    {
      columnDef: 'reasonWhyOhmWasNotCommunicatedToStaff',
      header: 'Reason why OHM was not communicated to Staffs',
    },
  ];

  hqcdColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'doyouhaveQualityControl',
      header: 'Do you have Certificates of Sampling (COS)',
    },
    {
      columnDef: 'qualityControlFilePath',
      header: 'Certificates of Sampling (COS) issued in the year',
    },
  ];

  hccaColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'doyouhaveGHG',
      header: 'Do you have GHG monitoring document for the year',
    },
    {
      columnDef: 'ghgFilename',
      header: 'GHG monitoring document for the year',
    },
  ];

  himColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'name_of_facility',
      header: 'Name of Facility',
    },
    {
      columnDef: 'was_the_inspection_and_maintenemce',
      header:
        'Was Inspection and Maintenance of each of your facility carried out?',
    },
    {
      columnDef: 'type_of_Inspection_and_Maintenance',
      header: 'Type of Inspection Maintenance',
    },
    {
      columnDef: 'when_was_it_carried_out',
      header: 'Date of Last Inspection / Maintenance',
    },
    {
      columnDef: 'if_RBI_was_approval_granted',
      header: 'If RBI , Was Approval Granted ?',
    },
    {
      columnDef: 'if_No_Give_reasonS',
      header: 'If NO , Give Reason',
    },
  ];

  harColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'facility',
      header: 'Facility	',
    },
    {
      columnDef: 'equipment_type',
      header: '	Equipment Type',
    },
    {
      columnDef: 'equipment_description',
      header: 'Equipment Description',
    },
    // {
    //   columnDef: 'equipment_serial_number',
    //   header: 'Equipment Serial Number',
    // },
    // {
    //   columnDef: 'equipment_tag_number',
    //   header: 'Equipment Tag Number',
    // },
    // {
    //   columnDef: 'equipment_manufacturer',
    //   header: 'Equipment Manufacturer',
    // },
    {
      columnDef: 'equipment_Installation_date',
      header: 'Equipment Installation Date',
    },
    {
      columnDef: 'last_inspection_date',
      header: 'Last Inspection Date',
    },
    {
      columnDef: 'last_Inspection_Type_Performed',
      header: 'Last Inspection Type Performed',
    },
    {
      columnDef: 'next_Inspection_Date',
      header: 'Next Inspection Date',
    },

    {
      columnDef: 'proposed_Inspection_Type',
      header: 'Proposed Inspection Type',
    },
    // {
    //   columnDef: 'equipment_Inspected_as_and_when_due',
    //   header: 'Equipment Inspected as and when due',
    // },
    {
      columnDef: 'state_reason',
      header: 'State Reason',
    },
    {
      columnDef: 'condition_of_Equipment',
      header: 'Condition of Equipment (External)',
    },
    {
      columnDef: 'function_Test_Result',
      header: 'Function – Test Result',
    },
    {
      columnDef: 'inspection_Report_Review',
      header: 'Inspection Report Review',
    },
  ];

  harrbiColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'facility',
      header: 'Facility	',
    },
    {
      columnDef: 'equipment_type',
      header: '	Equipment Type',
    },
    {
      columnDef: 'equipment_description',
      header: 'Equipment Description',
    },
    // {
    //   columnDef: 'equipment_serial_number',
    //   header: 'Equipment Serial Number',
    // },
    // {
    //   columnDef: 'equipment_tag_number',
    //   header: 'Equipment Tag Number',
    // },
    // {
    //   columnDef: 'equipment_manufacturer',
    //   header: 'Equipment Manufacturer',
    // },
    {
      columnDef: 'equipment_Installation_date',
      header: 'Equipment Installation Date',
    },
    {
      columnDef: 'last_inspection_date',
      header: 'Last Inspection Date',
    },
    {
      columnDef: 'last_Inspection_Type_Performed',
      header: 'Last Inspection Type Performed',
    },
    {
      columnDef: 'likelihood_of_Failure',
      header: 'Likelihood of Failure',
    },
    {
      columnDef: 'consequence_of_Failure',
      header: 'Consequence of Failure',
    },
    {
      columnDef: 'maximum_Inspection_Interval',
      header: 'Maximum Inspection Interval',
    },

    {
      columnDef: 'next_Inspection_Date',
      header: 'Next Inspection Date',
    },
    {
      columnDef: 'rbI_Assessment_Date',
      header: 'RBI Assessment Date',
    },

    {
      columnDef: 'proposed_Inspection_Type',
      header: 'Proposed Inspection Type',
    },
    {
      columnDef: 'equipment_Inspected_as_and_when_due',
      header: 'Equipment Inspected as and when due',
    },
    {
      columnDef: 'state_reason',
      header: 'State Reason',
    },
    {
      columnDef: 'condition_of_Equipment',
      header: 'Condition of Equipment (External)',
    },
    {
      columnDef: 'function_Test_Result',
      header: 'Function – Test Result',
    },
    {
      columnDef: 'inspection_Report_Review',
      header: 'Inspection Report Review',
    },
  ];

  hosrColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'incident_Oil_Spill_Ref_No',
      header: 'Incident Oil Spill Ref No',
    },
    {
      columnDef: 'facility_Equipment',
      header: 'Facility Equipment',
    },
    {
      columnDef: 'location',
      header: 'Location',
    },
    {
      columnDef: 'lga',
      header: 'LGA',
    },
    {
      columnDef: 'state_',
      header: 'State',
    },
    {
      columnDef: 'date_of_Spill',
      header: 'Date of Spill',
    },
    {
      columnDef: 'type_of_operation_at_spill_site',
      header: 'Type of operation at spill site',
    },
    {
      columnDef: 'cause_of_spill',
      header: 'Cause of spill',
    },
    {
      columnDef: 'volume_of_spill_bbls',
      header: 'Volume of spill(bbls)',
    },
    {
      columnDef: 'volume_recovered_bbls',
      header: 'Volume Recovered (bbls)',
    },
  ];

  hcosColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'no_of_spills_reported',
      header: 'No. Of Spills Reported',
    },
    {
      columnDef: 'total_Quantity_Spilled',
      header: 'Total Quantity Spilled',
    },
    {
      columnDef: 'total_Quantity_Recovered',
      header: 'Total Quantity Recovered',
    },
    {
      columnDef: 'corrosion',
      header: 'Corrosion',
    },
    {
      columnDef: 'equipment_Failure',
      header: 'Equipment Failure',
    },
    {
      columnDef: 'erossion_waves_sand',
      header: 'Erosion/Waves/Sand',
    },
    {
      columnDef: 'human_Error',
      header: 'Human Error',
    },
    {
      columnDef: 'mystery',
      header: 'Mystery',
    },
    {
      columnDef: 'operational_Maintenance_Error',
      header: 'Operational/Maintenance Error',
    },
    {
      columnDef: 'sabotage',
      header: 'Sabotage',
    },
    {
      columnDef: 'ytbd',
      header: 'YTBD',
    },
  ];

  hairColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'type_of_Accident_Incidence',
      header: 'TYPE OF ACCIDENT / INCIDENT',
    },
    {
      columnDef: 'location',
      header: 'LOCATION',
    },
    {
      columnDef: 'investigation',
      header: 'INVESTIGATION',
    },
    {
      columnDef: 'date_',
      header: 'DATE',
    },
    {
      columnDef: 'cause',
      header: 'CAUSE',
    },
    {
      columnDef: 'frequency',
      header: 'FREQUENCY',
    },
    {
      columnDef: 'consequence',
      header: 'CONSEQUENCE',
    },
    {
      columnDef: 'lesson_Learnt',
      header: 'LESSON LEARNT',
    },
  ];

  hoscColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'name_Of_Facility',
      header: 'NAME OF FACILITY',
    },
    {
      columnDef: 'number_of_Facilities',
      header: 'NUMBER OF FACILITIES',
    },
    {
      columnDef: 'location_of_Facility',
      header: 'LOCATION OF FACILITY',
    },
    {
      columnDef: 'type_of_Facility',
      header: 'TYPE OF FACILITY',
    },
    {
      columnDef: 'does_the_Facility_Have_a_Valid_Safety_Case',
      header: 'DOES THE FACILITY HAVE A VALID SAFETY CASE',
    },
    {
      columnDef: 'evidence_of_Operations_Safety_Case_Approval',
      header: 'EVIDENCE OF OPERATIONS SAFETY CASE APPROVAL',
    },
    {
      columnDef: 'reason_If_No_Evidence',
      header: 'REASON IF NO EVIDENCE',
    },
  ];

  hempColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'areThereEMP',
      header: 'Do you have EMP',
    },
    {
      columnDef: 'facilityType',
      header: 'Type of Facilities',
    },
    {
      columnDef: 'facilityLocation',
      header: 'Facility Location',
    },
    {
      columnDef: 'remarkIfNoEMP',
      header: 'Remark',
    },
  ];

  hosprColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'valueS_',
      header: 'CATEGORIES',
    },
    {
      columnDef: 'descriptioN_',
      header: 'VALUES / DESCRIPTION',
    },
  ];

  hcdColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'oil_spill_reported',
      header: 'WAS ALL SPILL REPORTED AT AGREED TIMELINE',
    },
    {
      columnDef:
        'was_there_any_Community_Related_Disturbances_within_your_operational_area',
      header:
        'WAS THERE ANY COMMUNITY RELATED DISTURBANCES WITHIN YOUR OPERATIONAL AREA',
    },
    {
      columnDef:
        'if_YES_Give_details_on_Community_Related_Disturbances_within_your_operational_area',
      header:
        'IF YES, GIVE DETAILS ON COMMUNITY RELATED DISTURBANCES WITHIN YOUR OPERATIONAL AREA',
    },
    {
      columnDef: 'was_any_Oil_Spill_recorded_within_your_operational_area',
      header: 'WAS ANY OIL SPILL RECORDED WITHIN YOUR OPERATIONAL AREA',
    },
  ];

  hfcColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'type_of_incidence',
      header: 'TYPE OF INCIDENCE',
    },
    {
      columnDef: 'fatalities_Type',
      header: 'CATEGORY',
    },
    {
      columnDef: 'current_year_DATA',
      header: 'ACTUAL VALUE',
    },
    // {
    //   columnDef: 'proposed_year_DATA',
    //   header: 'PROPOSED VALUE',
    // },
  ];

  hlpsColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'designS_SAFETY_Type',
      header: 'DESIGNS SAFETY TYPE',
    },
    {
      columnDef: 'designS_SAFETY_Current_year',
      header: 'DESIGNS SAFETY (Current Year)',
    },
    {
      columnDef: 'designS_SAFETY_Proposed_year',
      header: 'DESIGNS SAFETY (Proposed Year)',
    },
  ];

  hesColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'field_name',
      header: 'Field Name',
    },
    {
      columnDef: 'type_of_study',
      header: 'Type of Study',
    },
    {
      columnDef: 'study_title',
      header: 'Study Title',
    },
    {
      columnDef: 'current_study_status',
      header: 'Current Study Status',
    },
    {
      columnDef: 'dpR_approval_Status',
      header: 'NUPRC Approval Status',
    },
  ];

  hesnColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'any_Environmental_Studies',
      header: 'Any Environmental Studies',
    },
    {
      columnDef: 'if_YES_state_Project_Name',
      header: 'Select Project Name',
    },
    {
      columnDef: 'if_Ongoing',
      header: 'If Ongoing( Select NA if Not)',
    },
    {
      columnDef: 'status_',
      header: 'Status',
    },
  ];

  hwmColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'do_you_have_Waste_Management_facilities',
      header: 'Do you have Waste Management facilities',
    },
    {
      columnDef: 'if_YES_is_the_facility_registered',
      header: 'If YES, is the facility registered',
    },
    {
      columnDef: 'if_NO_give_reasons_for_not_being_registered',
      header: 'If NO, give reasons for not being registered',
    },
  ];

  hwmfColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'type_of_Facility',
      header: 'Type of Facility',
    },
    {
      columnDef: 'location',
      header: 'Location',
    },
    {
      columnDef: 'approved_or_Not_Approve',
      header: 'Approval Status',
    },
  ];

  hwmsColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'wasteManagementPlanFilename',
      header: 'Waste Management Plan',
    },
    {
      columnDef: 'decomCertificateFilename',
      header: 'Decommissioning Certificates issued in the year',
    },
  ];

  hpwmColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'fielD_NAME',
      header: 'Field Name',
    },
    // {
    //   columnDef: 'concession',
    //   header: 'Concession',
    // },
    {
      columnDef: 'facilities',
      header: 'Facilities',
    },
    {
      columnDef: 'deptH_AND_DISTANCE_FROM_SHORELINE',
      header: 'Depth and Distance from Shoreline',
    },
    {
      columnDef: 'produced_water_volumes',
      header: 'Produced Water Volumes',
    },
    {
      columnDef: 'disposal_philosophy',
      header: 'Disposal Philosophy',
    },
    {
      columnDef: 'dpR_APPROVAL_STATUS',
      header: 'NUPRC Approval Status',
    },
  ];

  hpwmnColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'within_which_zone_are_you_operating',
      header: 'Within which zone are you operating',
    },
    {
      columnDef: 'how_do_you_handle_your_produced_water',
      header: 'How do you handle your produced water	',
    },
    {
      columnDef: 'export_to_Terminal_with_fluid',
      header: 'Export to Terminal with fluid (wet crude',
    },
  ];

  hpecmColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'are_you_a_Producing_or_Non_Producing_Company',
      header: 'Are you a Producing or Non-Producing Company',
    },
    {
      columnDef: 'if_YES_have_you_registered_your_Point_Sources',
      header: 'If YES, have you registered your Point Sources',
    },
    {
      columnDef: 'if_YES_have_you_registered_your_Point_Sources',
      header: 'If NO, give reasons for not registering your Point Sources',
    },
    {
      columnDef: 'have_you_submitted_your_Environmental_Compliance_Report',
      header:
        'If YES (Producing Company), have you submitted your Environmental Compliance Report',
    },
    {
      columnDef: 'if_NO_Give_reasons_for_non_SUBMISSION',
      header: 'If NO, Give reasons for non-submission',
    },
    {
      columnDef:
        'have_you_submitted_your_Chemical_Usage_Inventorization_Report',
      header:
        'For non-submission	Have you submitted your Chemical Usage Inventorization Report',
    },
    {
      columnDef: 'if_NO_Give_reasons_for_non_submission_2',
      header: 'If NO, Give reasons for non-submission',
    },
  ];

  hpecmnColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'name_of_Chemical',
      header: 'Name of Chemical',
    },
    {
      columnDef: 'dpR_Approved',
      header: 'NUPRC Approved',
    },
  ];

  hes5yspColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'yeaR_',
      header: 'YEAR',
    },
    {
      columnDef: 'type_of_Study_IA_or_EES',
      header: 'TYPE OF STUDY (IA OR EES)',
    },
  ];

  hemsColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'emsFilePath',
      header: 'Evidence of Submission of Environmental Management System (EMS)',
    },
    {
      columnDef: 'auditFilePath',
      header: 'Evidence of all audits done in the year',
    },
  ];

  //#endregion

  //#region legal
  hlaColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'companY_ID',
      header: 'Company ID',
    },
    {
      columnDef: 'companyName',
      header: 'Company Name',
    },
    {
      columnDef: 'companyemail',
      header: 'Company Email',
    },
    {
      columnDef: 'consession_Type',
      header: 'Concession Type',
    },
    {
      columnDef: 'omL_Name',
      header: 'OML Name',
    },
    {
      columnDef: 'anyLitigation',
      header: 'Any Litigation?',
    },
    {
      columnDef: 'any_orders_made_so_far_by_the_court',
      header: 'Any Orders Made So Far By The Court',
    },
    {
      columnDef: 'jurisdiction',
      header: 'Jurisdiction',
    },
    {
      columnDef: 'name_of_Court',
      header: 'Name of Court',
    },
    {
      columnDef: 'names_of_Parties',
      header: 'Names of Parties',
    },
    {
      columnDef: 'potential_outcome',
      header: 'Potential Outcome',
    },
    {
      columnDef: 'summary_of_the_case',
      header: 'Summary Of The Case',
    },
    {
      columnDef: 'terrain',
      header: 'Terrain',
    },
  ];

  hllColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'companY_ID',
      header: 'Company ID',
    },
    {
      columnDef: 'companyName',
      header: 'Company Name',
    },
    {
      columnDef: 'companyemail',
      header: 'Company Email',
    },
    {
      columnDef: 'consession_Type',
      header: 'Concession Type',
    },
    {
      columnDef: 'omL_Name',
      header: 'OML Name',
    },
    {
      columnDef: 'anyLitigation',
      header: 'Any Litigation?',
    },
    {
      columnDef: 'any_orders_made_so_far_by_the_court',
      header: 'Any Orders Made So Far By The Court',
    },
    {
      columnDef: 'jurisdiction',
      header: 'Jurisdiction',
    },
    {
      columnDef: 'name_of_Court',
      header: 'Name of Court',
    },
    {
      columnDef: 'case_Number',
      header: 'Case Number',
    },
    {
      columnDef: 'names_of_Parties',
      header: 'Names of Parties',
    },
    {
      columnDef: 'potential_outcome',
      header: 'Potential Outcome',
    },
    {
      columnDef: 'summary_of_the_case',
      header: 'Summary Of The Case',
    },
    {
      columnDef: 'terrain',
      header: 'Terrain',
    },
  ];

  // hpecmColDef = [
  //   {
  //     columnDef: 'year_of_WP',
  //     header: 'Work Programme Year',
  //   },
  //   {
  //     columnDef: 'are_you_a_Producing_or_Non_Producing_Company',
  //     header: 'Are you a Producing or Non-Producing Company',
  //   },
  //   {
  //     columnDef: 'if_YES_have_you_registered_your_Point_Sources',
  //     header: 'If YES, have you registered your Point Sources',
  //   },
  //   {
  //     columnDef: 'if_YES_have_you_registered_your_Point_Sources',
  //     header: 'If NO, give reasons for not registering your Point Sources',
  //   },
  //   {
  //     columnDef: 'have_you_submitted_your_Environmental_Compliance_Report',
  //     header:
  //       'If YES (Producing Company), have you submitted your Environmental Compliance Report',
  //   },
  //   {
  //     columnDef: 'if_NO_Give_reasons_for_non_SUBMISSION',
  //     header: 'If NO, Give reasons for non-submission',
  //   },
  //   {
  //     columnDef:
  //       'have_you_submitted_your_Chemical_Usage_Inventorization_Report',
  //     header:
  //       'For non-submission	Have you submitted your Chemical Usage Inventorization Report',
  //   },
  //   {
  //     columnDef: 'if_NO_Give_reasons_for_non_submission_2',
  //     header: 'If NO, Give reasons for non-submission',
  //   },
  // ];
  //#endregion

  constructor(
    private adminService: AdminService,
    private cd: ChangeDetectorRef,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.appId = param['id'];
      this.getSBUReport(this.appId);
    });
  }

  getSBUReport(appId) {
    this.modalService.logCover('loading...', true);
    this.adminService.getSBUReport(appId).subscribe({
      next: (res) => {
        if (res.drillEachCost) this.drillEachCosts.push(res.drillEachCost);

        if (res.drillEachCostProposed)
          this.drillEachCostProposeds.push(res.drillEachCostProposed);

        if (res.drillOperationCategoriesWells)
          this.drillOperationCategoriesWells.push(
            res.drillOperationCategoriesWell
          );

        if (res.legalArbitration)
          this.legalArbitrations.push(res.legalArbitration);

        if (res.legalLitigation)
          this.legalLitigations.push(res.legalLitigation);

        if (res.geoActivitiesAcquisition)
          this.geoActivitiesAcquisitions.push(res.geoActivitiesAcquisition);

        if (res.hseAccidentIncidence)
          this.hseAccidentIncidences.push(res.hseAccidentIncidence);

        if (res.hseAccidentIncidenceType)
          this.hseAccidentIncidenceTypes.push(res.hseAccidentIncidenceType);

        if (res.hseAccidentModel)
          this.hseAccidentModels.push(res.hseAccidentModel);

        if (res.hseAssetRegister)
          this.hseAssetRegisters.push(res.hseAssetRegister);

        if (res.hseAssetRegisterRBI)
          this.hseAssetRegisterRBIs.push(res.hseAssetRegisterRBI);

        if (res.hseClimateChange) {
          this.hseClimateChanges.push(res.hseClimateChange);
        }

        if (res?.hseTechnicalSafety) {
          this.hseTechnicals.push(res.hseTechnicalSafety);
        }

        if (res?.hseSafetyStudies) {
          this.hseSafetyStudies.push(res.hseSafetyStudies);
        }

        if (res?.hseManagementPosition) {
          this.hseManagementPositions.push(res.hseManagementPosition);
        }

        if (res?.hseSafetyCulture) {
          this.hseSafetyCultureTrainings.push(res.hseSafetyCulture);
        }

        if (res?.hseOccupationalHealth) {
          this.occupationHealthManagements.push(res.hseOccupationalHealth);
        }

        if (res?.hseQualityControl) {
          this.qualityControlDocuments.push(res.hseQualityControl);
        }

        if (res?.hseInspectionMaintenance) {
          this.inspectionMaintenances.push(
            res.hseInspectionMaintenanceFacility
          );
        }

        if (res?.hseOilSpill) {
          this.oilSpillReportings.push(res.hseOilSpill);
        }

        if (res?.hseospRegistrations) {
          this.ospRegulations.push(res.hseospRegistrations);
        }

        if (res?.hseCommunityDisturbance) {
          this.communityDisturbances.push(res.hseCommunityDisturbance);
        }

        if (res?.hseFatality) {
          this.fatalitiesCasualties.push(res.hseFatality);
        }

        if (res?.hseEnvironmentalStudiesUpdated) {
          this.environmentalStudiesUpdatedList.push(
            res.hseEnvironmentalStudiesUpdated
          );
        }

        if (res?.hseEnvironmentalStudies) {
          this.environmentalStudies.push(res.hseEnvironmentalStudies);
        }

        if (res?.hseWasteManagement) {
          this.wasteManagements.push(res.hseWasteManagement);
        }

        if (res?.hseWasteManagementType) {
          this.wasterManagementFacilities.push(res.hseWasteManagementType);
        }

        if (res?.hseWasteManagementSystems) {
          this.wasterManagementFiles.push(res.hseWasteManagementSystems);
        }

        if (res?.hseProducedWaterMgtUpdated) {
          this.producedWaterManagementUpdatedList.push(
            res.hseProducedWaterMgtUpdated
          );
        }

        if (res?.hseProducedWaterMgt) {
          this.producedWaterManagements.push(res.hseProducedWaterMgt);
        }

        if (res?.hseEnvironmentalCompliance) {
          this.environmentalComplianceMonitoring.push(
            res.hseEnvironmentalCompliance
          );
        }

        if (res?.hseEnvironmentalComplianceChemical) {
          this.environmentalComplianceChemicals.push(
            res.hseEnvironmentalComplianceChemical
          );
        }

        if (res?.hseEnvironmentalFiveYears) {
          this.environmentalStudiesFiveYearsSPs.push(
            res.hseEnvironmentalFiveYears
          );
        }

        if (res?.hseEnvironmentalManagementSystems) {
          this.environmentalManagementSystems.push(
            res.hseEnvironmentalManagementSystems
          );
        }

        if (res?.hseOperationSafetyCases) {
          this.operationsSafetyCases.push(res.hseOperationSafetyCases);
        }

        if (res?.hseEnvironmentalManagementPlans) {
          this.environmentalManagementPlans.push(
            res.hseEnvironmentalManagementPlans
          );
        }

        if (res?.hseEnfluenceConliences) {
          this.effluentMonitoringCompliances.push(res.hseEnfluenceConliences);
        }

        if (res?.hseghgPlans) {
          this.GHGManagementPlans.push(res.hseghgPlans);
        }

        if (res?.hseHostCommunities) {
          this.HostCommunitiesDevelopments.push(res.hseHostCommunities);
        }

        this.modalService.togCover();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.modalService.logNotice(error.message, 'Error', 'error');
        this.cd.markForCheck();
      },
    });
  }
}
