import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import {
  HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW,
  HSE_SAFETY_STUDIES_NEW,
  HSE_MANAGEMENT_POSITION,
  HSE_SAFETY_CULTURE_TRAINING,
  HSE_QUALITY_CONTROL,
  HSE_CLIMATE_CHANGE_AND_AIR_QUALITY,
  HSE_INSPECTION_AND_MAINTENANCE_NEW,
  HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW,
  HSE_ASSET_REGISTER_TEMPLATE_RBI_EQUIPMENT_INSPECTION_STRATEGY_NEW,
  HSE_OIL_SPILL_REPORTING_NEW,
  HSE_CAUSES_OF_SPILL,
  HSE_ACCIDENT_INCIDENCE_MODEL,
  HSE_ACCIDENT_INCIDENCE_REPORTING_NEW,
  HSE_OSP_REGISTRATIONS_NEW,
  HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW,
  HSE_DESIGNS_SAFETY,
  HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW,
  HSE_ENVIRONMENTAL_MANAGEMENT_SYSTEM,
  HSE_ENVIRONMENTAL_STUDIES_NEW,
  HSE_ENVIRONMENTAL_STUDIES_NEW_UPDATED,
  HSE_FATALITY,
  HSE_PRODUCED_WATER_MANAGEMENT_NEW,
  HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW,
  HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED,
  HSE_WASTE_MANAGEMENT_NEW,
  HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW,
  HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW,
  HSE_WASTE_MANAGEMENT_SYSTEM,
  HSE_OCCUPATIONAL_HEALTH_MANAGEMENT,
} from 'src/app/models/step5_hse.model';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './hse.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPHseComponent implements OnInit {
  //#region  form bodies declaration
  technicalBody: HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW =
    {} as HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW;
  safetyBody: HSE_SAFETY_STUDIES_NEW = {} as HSE_SAFETY_STUDIES_NEW;
  qualityControlBody: HSE_QUALITY_CONTROL = {} as HSE_QUALITY_CONTROL;
  mgtPositionBody: HSE_MANAGEMENT_POSITION = {} as HSE_MANAGEMENT_POSITION;
  safetyCultureBody: HSE_SAFETY_CULTURE_TRAINING =
    {} as HSE_SAFETY_CULTURE_TRAINING;
  occupationalBody: HSE_OCCUPATIONAL_HEALTH_MANAGEMENT =
    {} as HSE_OCCUPATIONAL_HEALTH_MANAGEMENT;
  climateChangeBody: HSE_CLIMATE_CHANGE_AND_AIR_QUALITY =
    {} as HSE_CLIMATE_CHANGE_AND_AIR_QUALITY;
  inspectionMaintenanceBody: HSE_INSPECTION_AND_MAINTENANCE_NEW =
    {} as HSE_INSPECTION_AND_MAINTENANCE_NEW;
  asset_PRE_Body: HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW =
    {} as HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW;
  asset_RBI_Body: HSE_ASSET_REGISTER_TEMPLATE_RBI_EQUIPMENT_INSPECTION_STRATEGY_NEW =
    {} as HSE_ASSET_REGISTER_TEMPLATE_RBI_EQUIPMENT_INSPECTION_STRATEGY_NEW;
  oilSpill_Body: HSE_OIL_SPILL_REPORTING_NEW =
    {} as HSE_OIL_SPILL_REPORTING_NEW;
  causesOfSpill_Body: HSE_CAUSES_OF_SPILL = {} as HSE_CAUSES_OF_SPILL;
  accident_Body: HSE_ACCIDENT_INCIDENCE_MODEL =
    {} as HSE_ACCIDENT_INCIDENCE_MODEL;
  osp_Reg_Body: HSE_OSP_REGISTRATIONS_NEW = {} as HSE_OSP_REGISTRATIONS_NEW;
  community_Body: HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW =
    {} as HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW;
  environmental_studies_Body: HSE_ENVIRONMENTAL_STUDIES_NEW =
    {} as HSE_ENVIRONMENTAL_STUDIES_NEW;
  environmental_studies_updated_Body: HSE_ENVIRONMENTAL_STUDIES_NEW_UPDATED =
    {} as HSE_ENVIRONMENTAL_STUDIES_NEW_UPDATED;
  environmental_studies_fiveyrs_Body: HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW =
    {} as HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW;
  waste_Management_Body: HSE_WASTE_MANAGEMENT_NEW =
    {} as HSE_WASTE_MANAGEMENT_NEW;
  waste_ManagementFacility_Body: HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW =
    {} as HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW;
  waste_ManagementFiles_Body: HSE_WASTE_MANAGEMENT_SYSTEM =
    {} as HSE_WASTE_MANAGEMENT_SYSTEM;

  water_Management_Body: HSE_PRODUCED_WATER_MANAGEMENT_NEW =
    {} as HSE_PRODUCED_WATER_MANAGEMENT_NEW;
  water_Management_Updated_Body: HSE_PRODUCED_WATER_MANAGEMENT_NEW =
    {} as HSE_PRODUCED_WATER_MANAGEMENT_NEW;
  water_Management_Updated_New_Body: HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED =
    {} as HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED;
  environmentalCompliance_Body: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW =
    {} as HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW;
  fatality_Body: HSE_FATALITY = {} as HSE_FATALITY;
  designSafety_Body: HSE_DESIGNS_SAFETY = {} as HSE_DESIGNS_SAFETY;
  environmentalComplianceChemical_Body: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW =
    {} as HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW;
  eMS_Files_Body: HSE_ENVIRONMENTAL_MANAGEMENT_SYSTEM =
    {} as HSE_ENVIRONMENTAL_MANAGEMENT_SYSTEM;
  //#endregion

  //#region  documnent objects declaration
  mediatype = 'doc';

  SMSFile?: File = null;
  SMSNewName: string;
  SMSNameDoc: string;

  PromotionFile?: File = null;
  PromotionNewName: string;
  PromotionNameDoc: string;

  OrganogramFile?: File = null;
  OrganogramNewName: string;
  OrganogramNameDoc: string;

  StatisticsFile?: File = null;
  StatisticsNewName: string;
  StatisticsNameDoc: string;

  Statistics_2File?: File = null;
  Statistics_2NewName: string;
  Statistics_2NameDoc: string;

  OHMFile?: File = null;
  OHMNewName: string;
  OHMNameDoc: string;

  OHMFile_2?: File = null;
  OHMNewName_2: string;
  OHMNameDoc_2: string;

  COSFile?: File = null;
  COSNewName: string;
  COSNameDoc: string;

  GHGFile?: File = null;
  GHGNewName: string;
  GHGNameDoc: string;

  WM_Plan_File?: File = null;
  WM_Plan_NewName: string;
  WM_Plan_NameDoc: string;

  WM_Cert_File?: File = null;
  WM_Cert_NewName: string;
  WM_Cert_NameDoc: string;

  EMSFile?: File = null;
  EMSNewName: string;
  EMSNameDoc: string;

  AuditsFile?: File = null;
  AuditsNewName: string;
  AuditsNameDoc: string;
  //#endregion

  //#region form groups declaration
  TechnicalSafetyForm: FormGroup;
  SafetyStudyForm: FormGroup;
  QualityControlForm: FormGroup;
  ManagementPositionForm: FormGroup;
  SafetyCultureTrainingForm: FormGroup;
  OccupationalForm: FormGroup;
  ClimateChangeForm: FormGroup;
  InspectionMaintenanceForm: FormGroup;
  AssetRegister_Pre_Form: FormGroup;
  AssetRegister_RBI_Form: FormGroup;
  OilSpill_Form: FormGroup;
  CausesOfSpill_Form: FormGroup;
  Accident_Incidence_Form: FormGroup;
  OSP_Registration_Form: FormGroup;
  Community_Disturbances_Form: FormGroup;
  Environmental_Studies_Form: FormGroup;
  Environmental_Studies_Updated_Form: FormGroup;
  Environmental_Studies_FiveYrs_Form: FormGroup;
  Waste_Management_Form: FormGroup;
  Waste_Management_Facility_Form: FormGroup;
  Waste_Management_Files_Form: FormGroup;
  Water_Management_Form: FormGroup;
  Water_Management_Updated_Form: FormGroup;
  Water_Management_Updated_New_Form: FormGroup;
  EnvironmentalCompliance_Form: FormGroup;
  Fatality_Form: FormGroup;
  DesignSafety_Form: FormGroup;
  EnvironmentalCompliance_Chemical_Form: FormGroup;
  EMS_Files_Form: FormGroup;
  //#endregion

  //#region Column header definitions
  htsColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'facility',
      header: 'Facility',
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
      columnDef: 'OHMplanFilePath',
      header: 'Evidence of submission of OHM plan',
    },
    {
      columnDef: 'OHMplanCommunicationFilePath',
      header: 'Evidence of communication of OHM plan/policies',
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
    {
      columnDef: 'equipment_serial_number',
      header: 'Equipment Serial Number',
    },
    {
      columnDef: 'equipment_tag_number',
      header: 'Equipment Tag Number',
    },
    {
      columnDef: 'equipment_manufacturer',
      header: 'Equipment Manufacturer',
    },
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
    {
      columnDef: 'equipment_serial_number',
      header: 'Equipment Serial Number',
    },
    {
      columnDef: 'equipment_tag_number',
      header: 'Equipment Tag Number',
    },
    {
      columnDef: 'equipment_manufacturer',
      header: 'Equipment Manufacturer',
    },
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
    {
      columnDef: 'proposed_year_DATA',
      header: 'PROPOSED VALUE',
    },
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
      header: 'Approved / Not Approved',
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
      columnDef: 'yeaR_',
      header: 'Evidence of Submission of Environmental Management System (EMS)',
    },
    {
      columnDef: 'type_of_Study_IA_or_EES',
      header: 'Evidence of all audits done in the year',
    },
  ];
  //#endregion

  //#region lists declarations
  hseTechnicals: HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW[] = [];
  hseSafetyStudies: HSE_SAFETY_STUDIES_NEW[] = [];
  hseManagementPositions: HSE_MANAGEMENT_POSITION[] = [];
  hseSafetyCultureTrainings: HSE_SAFETY_CULTURE_TRAINING[] = [];
  occupationHealthManagements: HSE_OCCUPATIONAL_HEALTH_MANAGEMENT[] = [];
  qualityControlDocuments: HSE_QUALITY_CONTROL[] = [];
  climateChanges: HSE_CLIMATE_CHANGE_AND_AIR_QUALITY[] = [];
  inspectionMaintenances: HSE_INSPECTION_AND_MAINTENANCE_NEW[] = [];
  assetRegisterTemplates: HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW[] =
    [];
  assetRegisterTemplateRBIs: HSE_ASSET_REGISTER_TEMPLATE_RBI_EQUIPMENT_INSPECTION_STRATEGY_NEW[] =
    [];
  oilSpillReportings: HSE_OIL_SPILL_REPORTING_NEW[] = [];
  causeOfSpills: HSE_CAUSES_OF_SPILL[] = [];
  accidentIncidentReportings: HSE_ACCIDENT_INCIDENCE_MODEL[] = [];
  ospRegulations: HSE_OSP_REGISTRATIONS_NEW[] = [];
  communityDisturbances: HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW[] =
    [];
  fatalitiesCasualties: HSE_FATALITY[] = [];
  lossPreventionStudies: HSE_DESIGNS_SAFETY[] = [];
  environmentalStudiesUpdatedList: HSE_ENVIRONMENTAL_STUDIES_NEW_UPDATED[] = [];
  environmentalStudies: HSE_ENVIRONMENTAL_STUDIES_NEW[] = [];
  wasteManagements: HSE_WASTE_MANAGEMENT_NEW[] = [];
  wasterManagementFacilities: HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW[] = [];
  wasterManagementFiles: HSE_WASTE_MANAGEMENT_SYSTEM[] = [];
  producedWaterManagementUpdatedList: HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED[] =
    [];
  producedWaterManagements: HSE_PRODUCED_WATER_MANAGEMENT_NEW[] = [];
  environmentalComplianceMonitoring: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW[] =
    [];
  environmentalComplianceChemicals: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW[] =
    [];
  environmentalStudiesFiveYearsSPs: HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW[] =
    [];
  environmentalManagementSystems: HSE_ENVIRONMENTAL_MANAGEMENT_SYSTEM[] = [];
  //#endregion

  genk: GenericService;
  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.getHSE();
    });
    this.cd.markForCheck();
  }
  ngOnInit(): void {
    this.genk.activeStep = 'STEP5';
    this.TechnicalSafetyForm = new FormGroup(
      {
        facility: new FormControl(this.technicalBody.facility, [
          Validators.required,
        ]),
        facility_location: new FormControl(
          this.technicalBody.facility_location,
          [Validators.required]
        ),
        study_type: new FormControl(this.technicalBody.study_type, [
          Validators.required,
        ]),
        remarks: new FormControl(this.technicalBody.remarks, [
          Validators.required,
        ]),
      },
      {}
    );

    this.SafetyStudyForm = new FormGroup(
      {
        did_you_carry_out_safety_studies: new FormControl(
          this.safetyBody.did_you_carry_out_safety_studies,
          [Validators.required]
        ),
        doyouhaveSMSinPlace: new FormControl(
          this.safetyBody.doyouhaveSMSinPlace,
          [Validators.required]
        ),
        state_Project_Name_for_which_studies_was_carried_out: new FormControl(
          this.safetyBody.state_Project_Name_for_which_studies_was_carried_out,
          [Validators.required]
        ),
        list_identified_Major_Accident_Hazards_for_the_study: new FormControl(
          this.safetyBody.list_identified_Major_Accident_Hazards_for_the_study,
          [Validators.required]
        ),
        list_the_Safeguards_based_on_the_identified_Major_Accident_Hazards:
          new FormControl(
            this.safetyBody.list_the_Safeguards_based_on_the_identified_Major_Accident_Hazards,
            [Validators.required]
          ),
        list_the_studies: new FormControl(this.safetyBody.list_the_studies, [
          Validators.required,
        ]),
        sMSFileUploadPath: new FormControl(this.safetyBody.sMSFileUploadPath, [
          Validators.required,
        ]),
      },
      {}
    );
    this.SafetyCultureTrainingForm = new FormGroup(
      {
        safetyCurrentYearFilename: new FormControl(
          this.safetyCultureBody.safetyCurrentYearFilename,
          [Validators.required]
        ),
        safetyLast2YearsFilename: new FormControl(
          this.safetyCultureBody.safetyLast2YearsFilename,
          [Validators.required]
        ),
        safetyLast2YearsFilePath: new FormControl(
          this.safetyCultureBody.safetyLast2YearsFilePath,
          [Validators.required]
        ),
        safetyCurrentYearFilePath: new FormControl(
          this.safetyCultureBody.safetyCurrentYearFilePath,
          [Validators.required]
        ),
      },
      {}
    );

    this.QualityControlForm = new FormGroup(
      {
        doyouhaveQualityControl: new FormControl(
          this.qualityControlBody.doyouhaveQualityControl,
          [Validators.required]
        ),
        qualityControlFilePath: new FormControl(
          this.qualityControlBody.qualityControlFilePath,
          [Validators.required]
        ),
      },
      {}
    );

    this.ManagementPositionForm = new FormGroup(
      {
        organogramrFilePath: new FormControl(
          this.mgtPositionBody.organogramrFilePath,
          [Validators.required]
        ),
        promotionLetterFilePath: new FormControl(
          this.mgtPositionBody.promotionLetterFilePath,
          [Validators.required]
        ),
      },
      {}
    );

    this.OccupationalForm = new FormGroup(
      {
        OHMplanFilePath: new FormControl(
          this.occupationalBody.OHMplanFilePath,
          [Validators.required]
        ),
        OHMplanCommunicationFilePath: new FormControl(
          this.occupationalBody.OHMplanCommunicationFilePath,
          [Validators.required]
        ),
      },
      {}
    );

    this.ClimateChangeForm = new FormGroup(
      {
        doyouhaveGHG: new FormControl(this.climateChangeBody.doyouhaveGHG, [
          Validators.required,
        ]),
        gHGFilePath: new FormControl(this.climateChangeBody.gHGFilePath, [
          Validators.required,
        ]),
      },
      {}
    );

    this.InspectionMaintenanceForm = new FormGroup(
      {
        name_of_facility: new FormControl(
          this.inspectionMaintenanceBody.name_of_facility,
          [Validators.required]
        ),
        facility_Type: new FormControl(
          this.inspectionMaintenanceBody.facility_Type,
          [Validators.required]
        ),
        type_of_Inspection_and_Maintenance: new FormControl(
          this.inspectionMaintenanceBody.type_of_Inspection_and_Maintenance,
          [Validators.required]
        ),
        was_the_inspection_and_maintenemce: new FormControl(
          this.inspectionMaintenanceBody.was_the_inspection_and_maintenemce,
          [Validators.required]
        ),
        is_the_inspection_philosophy_Prescriptive_or_RBI_for_each_facility:
          new FormControl(
            this.inspectionMaintenanceBody.is_the_inspection_philosophy_Prescriptive_or_RBI_for_each_facility,
            [Validators.required]
          ),
        if_RBI_was_approval_granted: new FormControl(
          this.inspectionMaintenanceBody.if_RBI_was_approval_granted,
          [Validators.required]
        ),
        if_No_Give_reasonS: new FormControl(
          this.inspectionMaintenanceBody.if_No_Give_reasonS,
          [Validators.required]
        ),
        when_was_it_carried_out: new FormControl(
          this.inspectionMaintenanceBody.when_was_it_carried_out,
          [Validators.required]
        ),
      },
      {}
    );

    this.AssetRegister_Pre_Form = new FormGroup(
      {
        condition_of_Equipment: new FormControl(
          this.asset_PRE_Body.condition_of_Equipment,
          [Validators.required]
        ),
        equipment_Inspected_as_and_when_due: new FormControl(
          this.asset_PRE_Body.equipment_Inspected_as_and_when_due,
          [Validators.required]
        ),
        equipment_Installation_date: new FormControl(
          this.asset_PRE_Body.equipment_Installation_date,
          [Validators.required]
        ),
        equipment_description: new FormControl(
          this.asset_PRE_Body.equipment_description,
          [Validators.required]
        ),
        equipment_manufacturer: new FormControl(
          this.asset_PRE_Body.equipment_manufacturer,
          [Validators.required]
        ),
        equipment_serial_number: new FormControl(
          this.asset_PRE_Body.equipment_serial_number,
          [Validators.required]
        ),
        equipment_tag_number: new FormControl(
          this.asset_PRE_Body.equipment_tag_number,
          [Validators.required]
        ),
        equipment_type: new FormControl(this.asset_PRE_Body.equipment_type, [
          Validators.required,
        ]),
        facility: new FormControl(this.asset_PRE_Body.facility, [
          Validators.required,
        ]),
        function_Test_Result: new FormControl(
          this.asset_PRE_Body.function_Test_Result,
          [Validators.required]
        ),
        inspection_Report_Review: new FormControl(
          this.asset_PRE_Body.inspection_Report_Review,
          [Validators.required]
        ),
        last_Inspection_Type_Performed: new FormControl(
          this.asset_PRE_Body.last_Inspection_Type_Performed,
          [Validators.required]
        ),
        last_inspection_date: new FormControl(
          this.asset_PRE_Body.last_inspection_date,
          [Validators.required]
        ),
        next_Inspection_Date: new FormControl(
          this.asset_PRE_Body.next_Inspection_Date,
          [Validators.required]
        ),
        proposed_Inspection_Type: new FormControl(
          this.asset_PRE_Body.proposed_Inspection_Type,
          [Validators.required]
        ),
        state_reason: new FormControl(this.asset_PRE_Body.state_reason, [
          Validators.required,
        ]),
      },
      {}
    );

    this.AssetRegister_RBI_Form = new FormGroup(
      {
        facility: new FormControl(this.asset_RBI_Body.facility, [
          Validators.required,
        ]),
        equipment_Inspected_as_and_when_due: new FormControl(
          this.asset_RBI_Body.equipment_type,
          [Validators.required]
        ),
        equipment_Installation_date: new FormControl(
          this.asset_RBI_Body.equipment_Installation_date,
          [Validators.required]
        ),
        equipment_description: new FormControl(
          this.asset_RBI_Body.equipment_description,
          [Validators.required]
        ),
        equipment_manufacturer: new FormControl(
          this.asset_RBI_Body.equipment_manufacturer,
          [Validators.required]
        ),
        equipment_serial_number: new FormControl(
          this.asset_RBI_Body.equipment_serial_number,
          [Validators.required]
        ),
        equipment_tag_number: new FormControl(
          this.asset_RBI_Body.equipment_tag_number,
          [Validators.required]
        ),
        equipment_type: new FormControl(this.asset_RBI_Body.equipment_type, [
          Validators.required,
        ]),
        function_Test_Result: new FormControl(
          this.asset_RBI_Body.function_Test_Result,
          [Validators.required]
        ),
        inspection_Report_Review: new FormControl(
          this.asset_RBI_Body.inspection_Report_Review,
          [Validators.required]
        ),
        last_Inspection_Type_Performed: new FormControl(
          this.asset_RBI_Body.last_Inspection_Type_Performed,
          [Validators.required]
        ),
        last_inspection_date: new FormControl(
          this.asset_RBI_Body.last_inspection_date,
          [Validators.required]
        ),
        next_Inspection_Date: new FormControl(
          this.asset_RBI_Body.next_Inspection_Date,
          [Validators.required]
        ),
        proposed_Inspection_Type: new FormControl(
          this.asset_RBI_Body.proposed_Inspection_Type,
          [Validators.required]
        ),
        state_reason: new FormControl(this.asset_RBI_Body.state_reason, [
          Validators.required,
        ]),
        likelihood_of_Failure: new FormControl(
          this.asset_RBI_Body.likelihood_of_Failure,
          [Validators.required]
        ),
        consequence_of_Failure: new FormControl(
          this.asset_RBI_Body.consequence_of_Failure,
          [Validators.required]
        ),
        maximum_Inspection_numbererval: new FormControl(
          this.asset_RBI_Body.maximum_Inspection_Interval,
          [Validators.required]
        ),
        rBI_Assessment_Date: new FormControl(
          this.asset_RBI_Body.rbI_Assessment_Date,
          [Validators.required]
        ),
        condition_of_equipment: new FormControl(
          this.asset_RBI_Body.condition_of_Equipment,
          [Validators.required]
        ),
      },
      {}
    );

    this.OilSpill_Form = new FormGroup(
      {
        incident_Oil_Spill_Ref_No: new FormControl(
          this.oilSpill_Body.incident_Oil_Spill_Ref_No,
          [Validators.required]
        ),
        facility_Equipment: new FormControl(
          this.oilSpill_Body.facility_Equipment,
          [Validators.required]
        ),
        lga: new FormControl(this.oilSpill_Body.lga, [Validators.required]),
        state_: new FormControl(this.oilSpill_Body.state_, [
          Validators.required,
        ]),
        location: new FormControl(this.oilSpill_Body.location, [
          Validators.required,
        ]),
        date_of_Spill: new FormControl(this.oilSpill_Body.date_of_Spill, [
          Validators.required,
        ]),
        type_of_operation_at_spill_site: new FormControl(
          this.oilSpill_Body.type_of_operation_at_spill_site,
          [Validators.required]
        ),
        cause_of_spill: new FormControl(this.oilSpill_Body.cause_of_spill, [
          Validators.required,
        ]),
        volume_of_spill_bbls: new FormControl(
          this.oilSpill_Body.volume_of_spill_bbls,
          [Validators.required]
        ),
        volume_recovered_bbls: new FormControl(
          this.oilSpill_Body.volume_recovered_bbls,
          [Validators.required]
        ),
      },
      {}
    );

    this.CausesOfSpill_Form = new FormGroup(
      {
        no_of_spills_reported: new FormControl(
          this.causesOfSpill_Body.no_of_spills_reported,
          [Validators.required]
        ),
        total_Quantity_Spilled: new FormControl(
          this.causesOfSpill_Body.total_Quantity_Spilled,
          [Validators.required]
        ),
        total_Quantity_Recovered: new FormControl(
          this.causesOfSpill_Body.total_Quantity_Recovered,
          [Validators.required]
        ),
        corrosion: new FormControl(this.causesOfSpill_Body.corrosion, [
          Validators.required,
        ]),
        equipment_Failure: new FormControl(
          this.causesOfSpill_Body.equipment_Failure,
          [Validators.required]
        ),
        erossion_waves_sand: new FormControl(
          this.causesOfSpill_Body.erossion_waves_sand,
          [Validators.required]
        ),
        human_Error: new FormControl(this.causesOfSpill_Body.human_Error, [
          Validators.required,
        ]),
        mystery: new FormControl(this.causesOfSpill_Body.mystery, [
          Validators.required,
        ]),
        operational_Maintenance_Error: new FormControl(
          this.causesOfSpill_Body.operational_Maintenance_Error,
          [Validators.required]
        ),
        sabotage: new FormControl(this.causesOfSpill_Body.sabotage, [
          Validators.required,
        ]),
        ytbd: new FormControl(this.causesOfSpill_Body.ytbd, [
          Validators.required,
        ]),
      },
      {}
    );

    this.Accident_Incidence_Form = new FormGroup(
      {
        was_there_any_accident_incidence: new FormControl(
          this.accident_Body.was_there_any_accident_incidence,
          [Validators.required]
        ),
        if_YES_were_they_reported: new FormControl(
          this.accident_Body.if_YES_were_they_reported,
          [Validators.required]
        ),
        type_of_Accident_Incidence: new FormControl(
          this.accident_Body.if_YES_were_they_reported,
          [Validators.required]
        ),
        location: new FormControl(this.accident_Body.location, [
          Validators.required,
        ]),
        investigation: new FormControl(this.accident_Body.investigation, [
          Validators.required,
        ]),
        date_: new FormControl(this.accident_Body.date_, [Validators.required]),
        cause: new FormControl(this.accident_Body.cause, [Validators.required]),
        consequence: new FormControl(this.accident_Body.consequence, [
          Validators.required,
        ]),
        lesson_Learnt: new FormControl(this.accident_Body.lesson_Learnt, [
          Validators.required,
        ]),
        frequency: new FormControl(this.accident_Body.frequency, [
          Validators.required,
        ]),
      },
      {}
    );

    this.OSP_Registration_Form = new FormGroup(
      {
        dESCRIPTION_: new FormControl(this.osp_Reg_Body.dESCRIPTION_, [
          Validators.required,
        ]),
        vALUES_: new FormControl(this.osp_Reg_Body.vALUES_, [
          Validators.required,
        ]),
      },
      {}
    );

    this.Community_Disturbances_Form = new FormGroup(
      {
        was_there_any_Community_Related_Disturbances_within_your_operational_area:
          new FormControl(
            this.community_Body.was_there_any_Community_Related_Disturbances_within_your_operational_area,
            [Validators.required]
          ),
        if_YES_Give_details_on_Community_Related_Disturbances_within_your_operational_area:
          new FormControl(
            this.community_Body.if_YES_Give_details_on_Community_Related_Disturbances_within_your_operational_area,
            [Validators.required]
          ),
        was_any_Oil_Spill_recorded_within_your_operational_area:
          new FormControl(
            this.community_Body.was_any_Oil_Spill_recorded_within_your_operational_area,
            [Validators.required]
          ),
        possible_causes: new FormControl(this.community_Body.possible_causes, [
          Validators.required,
        ]),
        effect_on_your_operations: new FormControl(
          this.community_Body.effect_on_your_operations,
          [Validators.required]
        ),
        cost_involved: new FormControl(this.community_Body.cost_involved, [
          Validators.required,
        ]),
        total_days_lost: new FormControl(this.community_Body.total_days_lost, [
          Validators.required,
        ]),
        no_of_casual_Fatality: new FormControl(
          this.community_Body.no_of_casual_Fatality,
          [Validators.required]
        ),
        action_Plan_for_: new FormControl(
          this.community_Body.action_Plan_for_,
          [Validators.required]
        ),
        oil_spill_reported: new FormControl(
          this.community_Body.oil_spill_reported,
          [Validators.required]
        ),
      },
      {}
    );

    this.Environmental_Studies_Form = new FormGroup(
      {
        any_Environmental_Studies: new FormControl(
          this.environmental_studies_Body.any_Environmental_Studies,
          [Validators.required]
        ),
        if_YES_state_Project_Name: new FormControl(
          this.environmental_studies_Body.if_YES_state_Project_Name,
          [Validators.required]
        ),
        status_: new FormControl(this.environmental_studies_Body.status_, [
          Validators.required,
        ]),
        if_Ongoing: new FormControl(
          this.environmental_studies_Body.if_Ongoing,
          [Validators.required]
        ),
      },
      {}
    );

    this.Environmental_Studies_Updated_Form = new FormGroup(
      {
        current_study_status: new FormControl(
          this.environmental_studies_updated_Body.current_study_status,
          [Validators.required]
        ),
        dPR_approval_Status: new FormControl(
          this.environmental_studies_updated_Body.dPR_approval_Status,
          [Validators.required]
        ),
        field_name: new FormControl(
          this.environmental_studies_updated_Body.field_name,
          [Validators.required]
        ),
        study_title: new FormControl(
          this.environmental_studies_updated_Body.study_title,
          [Validators.required]
        ),
        type_of_study: new FormControl(
          this.environmental_studies_updated_Body.type_of_study,
          [Validators.required]
        ),
      },
      {}
    );
    this.Environmental_Studies_FiveYrs_Form = new FormGroup(
      {
        yEAR_: new FormControl(this.environmental_studies_fiveyrs_Body.yEAR_, [
          Validators.required,
        ]),
        type_of_Study_IA_or_EES: new FormControl(
          this.environmental_studies_fiveyrs_Body.type_of_Study_IA_or_EES,
          [Validators.required]
        ),
      },
      {}
    );

    this.Waste_Management_Form = new FormGroup(
      {
        do_you_have_Waste_Management_facilities: new FormControl(
          this.waste_Management_Body.do_you_have_Waste_Management_facilities,
          [Validators.required]
        ),
        if_YES_is_the_facility_registered: new FormControl(
          this.waste_Management_Body.if_YES_is_the_facility_registered,
          [Validators.required]
        ),
        if_NO_give_reasons_for_not_being_registered: new FormControl(
          this.waste_Management_Body.if_NO_give_reasons_for_not_being_registered,
          [Validators.required]
        ),
      },
      {}
    );

    this.Waste_Management_Facility_Form = new FormGroup(
      {
        type_of_Facility: new FormControl(
          this.waste_ManagementFacility_Body.type_of_Facility,
          [Validators.required]
        ),
        lOCATION: new FormControl(this.waste_ManagementFacility_Body.lOCATION, [
          Validators.required,
        ]),
        approved_or_Not_Approve: new FormControl(
          this.waste_ManagementFacility_Body.approved_or_Not_Approve,
          [Validators.required]
        ),
      },
      {}
    );

    this.Waste_Management_Files_Form = new FormGroup(
      {
        decomCertificateFilePath: new FormControl(
          this.waste_ManagementFiles_Body.decomCertificateFilePath,
          [Validators.required]
        ),
        wasteManagementPlanFilePath: new FormControl(
          this.waste_ManagementFiles_Body.wasteManagementPlanFilePath,
          [Validators.required]
        ),
      },
      {}
    );

    this.Water_Management_Updated_New_Form = new FormGroup(
      {
        fIELD_NAME: new FormControl(
          this.water_Management_Updated_New_Body.fIELD_NAME,
          [Validators.required]
        ),
        facilities: new FormControl(
          this.water_Management_Updated_New_Body.facilities,
          [Validators.required]
        ),
        dEPTH_AND_DISTANCE_FROM_SHORELINE: new FormControl(
          this.water_Management_Updated_New_Body.dEPTH_AND_DISTANCE_FROM_SHORELINE,
          [Validators.required]
        ),
        produced_water_volumes: new FormControl(
          this.water_Management_Updated_New_Body.produced_water_volumes,
          [Validators.required]
        ),
        disposal_philosophy: new FormControl(
          this.water_Management_Updated_New_Body.disposal_philosophy,
          [Validators.required]
        ),
        dPR_APPROVAL_STATUS: new FormControl(
          this.water_Management_Updated_New_Body.dPR_APPROVAL_STATUS,
          [Validators.required]
        ),
      },
      {}
    );
    this.Water_Management_Form = new FormGroup(
      {
        export_to_Terminal_with_fluid: new FormControl(
          this.water_Management_Body.export_to_Terminal_with_fluid,
          [Validators.required]
        ),
        how_do_you_handle_your_produced_water: new FormControl(
          this.water_Management_Body.how_do_you_handle_your_produced_water,
          [Validators.required]
        ),
        within_which_zone_are_you_operating: new FormControl(
          this.water_Management_Body.within_which_zone_are_you_operating,
          [Validators.required]
        ),
      },
      {}
    );
    this.EnvironmentalCompliance_Form = new FormGroup(
      {
        are_you_a_Producing_or_Non_Producing_Company: new FormControl(
          this.environmentalCompliance_Body.are_you_a_Producing_or_Non_Producing_Company,
          [Validators.required]
        ),
        if_YES_have_you_registered_your_Point_Sources: new FormControl(
          this.environmentalCompliance_Body.if_YES_have_you_registered_your_Point_Sources,
          [Validators.required]
        ),
        if_NO_give_reasons_for_not_registering_your_Point_Sources:
          new FormControl(
            this.environmentalCompliance_Body.if_NO_give_reasons_for_not_registering_your_Point_Sources,
            [Validators.required]
          ),
        have_you_submitted_your_Environmental_Compliance_Report:
          new FormControl(
            this.environmentalCompliance_Body.have_you_submitted_your_Environmental_Compliance_Report,
            [Validators.required]
          ),
        if_NO_Give_reasons_for_non_SUBMISSION: new FormControl(
          this.environmentalCompliance_Body.if_NO_Give_reasons_for_non_SUBMISSION,
          [Validators.required]
        ),
        have_you_submitted_your_Chemical_Usage_Inventorization_Report:
          new FormControl(
            this.environmentalCompliance_Body.have_you_submitted_your_Chemical_Usage_Inventorization_Report,
            [Validators.required]
          ),
        if_NO_Give_reasons_for_non_submission_2: new FormControl(
          this.environmentalCompliance_Body.if_NO_Give_reasons_for_non_submission_2,
          [Validators.required]
        ),
      },
      {}
    );

    this.Fatality_Form = new FormGroup(
      {
        current_year_DATA: new FormControl(
          this.fatality_Body.current_year_DATA,
          [Validators.required]
        ),
        proposed_year_DATA: new FormControl(
          this.fatality_Body.proposed_year_DATA,
          [Validators.required]
        ),
        fatalities_Type: new FormControl(this.fatality_Body.fatalities_Type, [
          Validators.required,
        ]),
        type_of_incidence: new FormControl(
          this.fatality_Body.type_of_incidence,
          [Validators.required]
        ),
      },
      {}
    );

    this.DesignSafety_Form = new FormGroup(
      {
        dESIGNS_SAFETY_Current_year: new FormControl(
          this.designSafety_Body.dESIGNS_SAFETY_Current_year,
          [Validators.required]
        ),
        dESIGNS_SAFETY_Proposed_year: new FormControl(
          this.designSafety_Body.dESIGNS_SAFETY_Proposed_year,
          [Validators.required]
        ),
        dESIGNS_SAFETY_Type: new FormControl(
          this.designSafety_Body.dESIGNS_SAFETY_Type,
          [Validators.required]
        ),
      },
      {}
    );

    this.EnvironmentalCompliance_Chemical_Form = new FormGroup(
      {
        name_of_Chemical: new FormControl(
          this.environmentalComplianceChemical_Body.name_of_Chemical,
          [Validators.required]
        ),
        dPR_Approved: new FormControl(
          this.environmentalComplianceChemical_Body.dPR_Approved,
          [Validators.required]
        ),
      },
      {}
    );

    this.EMS_Files_Form = new FormGroup(
      {
        eMSFilePath: new FormControl(this.eMS_Files_Body.eMSFilePath, [
          Validators.required,
        ]),
        aUDITFilePath: new FormControl(this.eMS_Files_Body.aUDITFilePath, [
          Validators.required,
        ]),
      },
      {}
    );

    this.getHSE();
  }

  HSE_TechnicalSubmit() {
    // let technicalInfo = {} as HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW;
    // this.technicalBody.companyNumber = 0;
    // this.technicalBody.id = 0;
    // this.technicalBody.year_of_WP = this.genk.wpYear;
    // this.technicalBody.oML_Name = this.genk.OmlName;

    this.workprogram
      .post_HSE_TechnicalSafety(
        this.technicalBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe((res) => {
        if (res.statusCode === 200) {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        }
      });
  }

  HSE_SafetySubmit() {
    const formDataToSubmit: FormData = new FormData();
    this.safetyBody.id = 0;
    for (const key in this.safetyBody) {
      if (this.safetyBody[key]) {
        formDataToSubmit.append(key.toString(), this.safetyBody[key]);
      }
    }
    if (this.SMSFile) {
      formDataToSubmit.append(this.SMSNameDoc, this.SMSFile, this.SMSNewName);
    }

    this.workprogram
      .post_HSE_SafetyStudies_2(
        formDataToSubmit,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice(
            'Form was submitted successfully!',
            res.message,
            'success'
          );

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error, 'error');
        },
      });
  }

  Hse_Management_Position_Submit() {
    const formDataToSubmit: FormData = new FormData();

    if (this.PromotionFile)
      formDataToSubmit.append(
        this.OrganogramNameDoc,
        this.OrganogramFile,
        this.PromotionNewName
      );

    if (this.PromotionFile)
      formDataToSubmit.append(
        this.OrganogramNameDoc,
        this.OrganogramFile,
        this.PromotionNewName
      );

    this.workprogram
      .post_HSE_Management_Position(
        formDataToSubmit,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice(
            'Form was submitted successfully!.',
            res.message,
            'success'
          );

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error, 'error');
        },
      });
  }

  Hse_Safety_Culture_Submit() {
    const formDat: FormData = new FormData();

    if (this.StatisticsFile) {
      formDat.append(
        this.StatisticsNameDoc,
        this.StatisticsFile,
        this.StatisticsNewName
      );
    }
    if (this.Statistics_2File) {
      formDat.append(
        this.Statistics_2NameDoc,
        this.Statistics_2File,
        this.Statistics_2NewName
      );
    }

    this.workprogram
      .post_HSE_SafetyCulture(
        formDat,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice(
            'Form was submitted successfully!',
            res.message,
            'success'
          );

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error, 'error');
        },
      });
  }

  Hse_Occupational_Submit() {
    const formDat: FormData = new FormData();
    this.occupationalBody.id = 0;
    for (const key in this.occupationalBody) {
      if (this.occupationalBody[key]) {
        formDat.append(key.toString(), this.occupationalBody[key]);
      }
    }
    if (this.OHMFile) {
      formDat.append(this.OHMNameDoc, this.OHMFile, this.OHMNewName);
    }
    if (this.OHMFile_2) {
      formDat.append(this.OHMNameDoc_2, this.OHMFile_2, this.OHMNewName_2);
    }
    this.workprogram
      .post_HSE_Occupational(
        formDat,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_QualityControl_Submit() {
    const formDataToSubmit: FormData = new FormData();
    // this.qualityControlBody.id = 0;
    for (const key in this.qualityControlBody) {
      if (this.qualityControlBody[key]) {
        formDataToSubmit.append(key.toString(), this.qualityControlBody[key]);
      }
    }
    // if (this.COSFile) {
    //   formDataToSubmit.append(this.OHMNameDoc, this.OHMFile, this.OHMNewName);
    // }
    if (this.COSFile) {
      formDataToSubmit.append(this.COSNameDoc, this.COSFile, this.COSNewName);
    }
    this.workprogram
      .post_HSE_QualityControl(
        formDataToSubmit,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Climate_Submit() {
    const formDataToSubmit: FormData = new FormData();
    // this.climateChangeBody.id = 0;
    for (const key in this.climateChangeBody) {
      if (this.climateChangeBody[key]) {
        formDataToSubmit.append(key.toString(), this.climateChangeBody[key]);
      }
    }
    if (this.GHGFile) {
      formDataToSubmit.append(this.GHGNameDoc, this.GHGFile, this.GHGNewName);
    }
    this.workprogram
      .post_HSE_ClimateChange(
        formDataToSubmit,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_InspectionMaintenance_Submit() {
    this.workprogram
      .post_HSE_InspectionMaintenance(
        this.inspectionMaintenanceBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_AssetRegister_PRE_Submit() {
    this.workprogram
      .post_HSE_AssetRegister_PRE(
        this.asset_PRE_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_AssetRegister_RBI_Submit() {
    this.workprogram
      .post_HSE_AssetRegister_RBI(
        this.asset_RBI_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_OilSpill_Submit() {
    this.workprogram
      .post_HSE_OilSpill(
        this.oilSpill_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_CausesOfSpill_Submit() {
    this.workprogram
      .post_HSE_Causes_Of_Spill(
        this.causesOfSpill_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Accident_Incidence_Submit() {
    this.workprogram
      .post_HSE_Accident_Incidence(
        this.accident_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_OSP_Registration_Submit() {
    this.workprogram
      .post_HSE_OSP_Registrations(
        this.osp_Reg_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Community_Submit() {
    this.workprogram
      .post_HSE_Community(
        this.community_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Fatality_Submit() {
    this.workprogram
      .post_HSE_Fatality(
        this.fatality_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_DesignSafety_Submit() {
    this.workprogram
      .post_HSE_DesignSafety(
        this.designSafety_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Environmental_Studies_Updated_Submit() {
    this.workprogram
      .post_HSE_Environmental_Studies_New_Updated(
        this.environmental_studies_updated_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Environmental_Studies_Submit() {
    this.workprogram
      .post_HSE_Environmental_Studies_Updated(
        this.environmental_studies_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Waste_Management_Submit() {
    this.workprogram
      .post_HSE_Waste_Management(
        this.waste_Management_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Waste_Management_Facility_Submit() {
    this.workprogram
      .post_HSE_Waste_ManagementFacility(
        this.waste_ManagementFacility_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Waste_Management_Files_Submit() {
    const formDat: FormData = new FormData();
    this.waste_ManagementFiles_Body.id = 0;
    for (const key in this.waste_ManagementFiles_Body) {
      if (this.waste_ManagementFiles_Body[key]) {
        formDat.append(key.toString(), this.waste_ManagementFiles_Body[key]);
      }
    }
    if (this.WM_Plan_File) {
      formDat.append(
        this.WM_Plan_NameDoc,
        this.WM_Plan_File,
        this.WM_Plan_NewName
      );
    }
    if (this.WM_Cert_File) {
      formDat.append(
        this.WM_Cert_NameDoc,
        this.WM_Cert_File,
        this.WM_Cert_NewName
      );
    }
    this.workprogram
      .post_HSE_Waste_Management_Files(
        formDat,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Water_Management_Updated_New_Submit() {
    this.workprogram
      .post_HSE_Water_Management_New_Updated(
        this.water_Management_Updated_New_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Water_Management_Submit() {
    this.workprogram
      .post_HSE_Water_Management(
        this.water_Management_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Environmental_Compliance_Submit() {
    this.workprogram
      .post_HSE_Environmental_Compliance(
        this.environmentalCompliance_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Environmental_Compliance_Chemical_Submit() {
    this.workprogram
      .post_HSE_Environmental_Chemical_Compliance(
        this.environmentalComplianceChemical_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_Environmental_Studies_Strategic_Plan_Submit() {
    this.workprogram
      .post_HSE_Environmental_Studies_Strategic_Plan(
        this.environmental_studies_fiveyrs_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  HSE_EMS_Files_Submit() {
    const formDat: FormData = new FormData();
    // this.eMS_Files_Body.id = 0;
    // for (const key in this.eMS_Files_Body) {
    //   if (this.eMS_Files_Body[key]) {
    //     formDat.append(key.toString(), this.eMS_Files_Body[key]);
    //   }
    // }
    if (this.EMSFile) {
      formDat.append('EMSFilePath', this.EMSFile, this.EMSNewName);
    }
    if (this.AuditsFile) {
      formDat.append('AUDITFilePath', this.AuditsFile, this.AuditsNewName);
    }
    this.workprogram
      .post_HSE_EMS_Files(
        formDat,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  //#region Documents Upload Section
  saveSMSDoc(DeFile: any) {
    this.SMSFile = <File>DeFile.target.files[0];
    if (!this.SMSFile) {
      return;
    }
    if (this.SMSFile.size < 1 || this.SMSFile.size > 1024 * 1024 * 50) {
      this.SafetyStudyForm.controls['sMSFileUploadPath'].setErrors({
        incorrect: true,
      });
      this.SMSFile = null;
      return;
    } else {
      this.SafetyStudyForm.controls['sMSFileUploadPath'].setErrors(null);
    }
    this.SMSNewName = this.gen.getExpDoc(this.SMSFile.name, this.SMSFile.type);
    this.SMSNameDoc = this.gen.trimDocName(this.SMSFile.name);
    let dockind = this.gen.getExt(this.SMSFile.name);
  }

  savePromotionDoc(DeFile: any) {
    this.PromotionFile = <File>DeFile.target.files[0];
    if (!this.PromotionFile) {
      return;
    }

    if (
      this.PromotionFile.size < 1 ||
      this.PromotionFile.size > 1024 * 1024 * 50
    ) {
      this.ManagementPositionForm.controls['promotionLetterFilePath'].setErrors(
        { incorrect: true }
      );
      this.PromotionFile = null;
      return;
    } else {
      this.ManagementPositionForm.controls['promotionLetterFilePath'].setErrors(
        null
      );
    }

    this.PromotionNewName = this.gen.getExpDoc(
      this.PromotionFile.name,
      this.PromotionFile.type
    );

    this.PromotionNameDoc = this.gen.trimDocName(this.PromotionFile.name);
    let dockind = this.gen.getExt(this.PromotionFile.name);
  }

  saveOrganogramDoc(DeFile: any) {
    this.OrganogramFile = <File>DeFile.target.files[0];
    if (!this.OrganogramFile) {
      return;
    }
    if (
      this.OrganogramFile.size < 1 ||
      this.OrganogramFile.size > 1024 * 1024 * 50
    ) {
      this.ManagementPositionForm.controls['organogramrFilePath'].setErrors({
        incorrect: true,
      });
      this.OrganogramFile = null;
      return;
    } else {
      this.ManagementPositionForm.controls['organogramrFilePath'].setErrors(
        null
      );
    }
    this.OrganogramNewName = this.gen.getExpDoc(
      this.OrganogramFile.name,
      this.OrganogramFile.type
    );
    this.OrganogramNameDoc = this.gen.trimDocName(this.OrganogramFile.name);
    let dockind = this.gen.getExt(this.OrganogramFile.name);
  }

  saveStatisticsDoc(DeFile: any) {
    this.StatisticsFile = <File>DeFile.target.files[0];
    if (!this.StatisticsFile) {
      return;
    }
    if (
      this.StatisticsFile.size < 1 ||
      this.StatisticsFile.size > 1024 * 1024 * 50
    ) {
      this.SafetyCultureTrainingForm.controls[
        'safetyCurrentYearFilename'
      ].setErrors({ incorrect: true });
      this.StatisticsFile = null;
      return;
    } else {
      this.SafetyCultureTrainingForm.controls[
        'safetyCurrentYearFilename'
      ].setErrors(null);
    }
    this.StatisticsNewName = this.gen.getExpDoc(
      this.StatisticsFile.name,
      this.StatisticsFile.type
    );
    this.StatisticsNameDoc = this.gen.trimDocName(this.StatisticsFile.name);
    let dockind = this.gen.getExt(this.StatisticsFile.name);
  }

  saveStatisticsDoc_2(DeFile: any) {
    this.Statistics_2File = <File>DeFile.target.files[0];
    if (!this.Statistics_2File) {
      return;
    }
    if (
      this.Statistics_2File.size < 1 ||
      this.Statistics_2File.size > 1024 * 1024 * 50
    ) {
      this.SafetyCultureTrainingForm.controls[
        'safetyLast2YearsFilename'
      ].setErrors({ incorrect: true });
      this.Statistics_2File = null;
      return;
    } else {
      this.SafetyCultureTrainingForm.controls[
        'safetyLast2YearsFilename'
      ].setErrors(null);
    }
    this.Statistics_2NewName = this.gen.getExpDoc(
      this.Statistics_2File.name,
      this.Statistics_2File.type
    );
    this.Statistics_2NameDoc = this.gen.trimDocName(this.Statistics_2File.name);
    let dockind = this.gen.getExt(this.Statistics_2File.name);
  }
  saveOHMDoc(DeFile: any) {
    this.OHMFile = <File>DeFile.target.files[0];
    if (!this.OHMFile) {
      return;
    }
    if (this.OHMFile.size < 1 || this.OHMFile.size > 1024 * 1024 * 50) {
      this.OccupationalForm.controls['OHMplanFilePath'].setErrors({
        incorrect: true,
      });
      this.OHMFile = null;
      return;
    } else {
      this.OccupationalForm.controls['OHMplanFilePath'].setErrors(null);
    }
    this.OHMNewName = this.gen.getExpDoc(this.OHMFile.name, this.OHMFile.type);
    this.OHMNameDoc = this.gen.trimDocName(this.OHMFile.name);
    let dockind = this.gen.getExt(this.OHMFile.name);
  }
  saveOHMDoc_2(DeFile: any) {
    this.OHMFile_2 = <File>DeFile.target.files[0];
    if (!this.OHMFile_2) {
      return;
    }
    if (this.OHMFile_2.size < 1 || this.OHMFile_2.size > 1024 * 1024 * 50) {
      this.OccupationalForm.controls['OHMplanCommunicationFilePath'].setErrors({
        incorrect: true,
      });
      this.OHMFile_2 = null;
      return;
    } else {
      this.OccupationalForm.controls['OHMplanCommunicationFilePath'].setErrors(
        null
      );
    }
    this.OHMNewName_2 = this.gen.getExpDoc(
      this.OHMFile_2.name,
      this.OHMFile_2.type
    );
    this.OHMNameDoc_2 = this.gen.trimDocName(this.OHMFile_2.name);
    let dockind = this.gen.getExt(this.OHMFile_2.name);
  }

  saveCOSDoc(DeFile: any) {
    this.COSFile = <File>DeFile.target.files[0];
    if (!this.COSFile) {
      return;
    }
    if (this.COSFile.size < 1 || this.COSFile.size > 1024 * 1024 * 50) {
      this.QualityControlForm.controls['qualityControlFilePath'].setErrors({
        incorrect: true,
      });
      this.COSFile = null;
      return;
    } else {
      this.QualityControlForm.controls['qualityControlFilePath'].setErrors(
        null
      );
    }
    this.COSNewName = this.gen.getExpDoc(this.COSFile.name, this.COSFile.type);
    this.COSNameDoc = this.gen.trimDocName(this.COSFile.name);
    let dockind = this.gen.getExt(this.COSFile.name);
  }

  saveGHGDoc(DeFile: any) {
    this.GHGFile = <File>DeFile.target.files[0];
    if (!this.GHGFile) {
      return;
    }
    if (this.GHGFile.size < 1 || this.GHGFile.size > 1024 * 1024 * 50) {
      this.QualityControlForm.controls['gHGFilePath'].setErrors({
        incorrect: true,
      });
      this.GHGFile = null;
      return;
    } else {
      this.QualityControlForm.controls['gHGFilePath'].setErrors(null);
    }
    this.GHGNewName = this.gen.getExpDoc(this.GHGFile.name, this.GHGFile.type);
    this.GHGNameDoc = this.gen.trimDocName(this.GHGFile.name);
    let dockind = this.gen.getExt(this.GHGFile.name);
  }

  saveWM_Plan_Doc(DeFile: any) {
    this.WM_Plan_File = <File>DeFile.target.files[0];
    if (!this.WM_Plan_File) {
      return;
    }
    if (
      this.WM_Plan_File.size < 1 ||
      this.WM_Plan_File.size > 1024 * 1024 * 50
    ) {
      this.Waste_Management_Files_Form.controls['WM_Plan_File'].setErrors({
        incorrect: true,
      });
      this.WM_Plan_File = null;
      return;
    } else {
      this.Waste_Management_Files_Form.controls['WM_Plan_File'].setErrors(null);
    }
    this.WM_Plan_NewName = this.gen.getExpDoc(
      this.WM_Plan_File.name,
      this.WM_Plan_File.type
    );
    this.WM_Plan_NameDoc = this.gen.trimDocName(this.WM_Plan_File.name);
    let dockind = this.gen.getExt(this.WM_Plan_File.name);
  }

  saveWM_Cert_Doc(DeFile: any) {
    this.WM_Cert_File = <File>DeFile.target.files[0];
    if (!this.WM_Cert_File) {
      return;
    }
    if (
      this.WM_Cert_File.size < 1 ||
      this.WM_Cert_File.size > 1024 * 1024 * 50
    ) {
      this.Waste_Management_Files_Form.controls['WM_Cert_File'].setErrors({
        incorrect: true,
      });
      this.WM_Cert_File = null;
      return;
    } else {
      this.Waste_Management_Files_Form.controls['WM_Cert_File'].setErrors(null);
    }
    this.WM_Cert_NewName = this.gen.getExpDoc(
      this.WM_Cert_File.name,
      this.WM_Cert_File.type
    );
    this.WM_Cert_NameDoc = this.gen.trimDocName(this.WM_Cert_File.name);
    let dockind = this.gen.getExt(this.WM_Cert_File.name);
  }

  saveEMSDoc(DeFile: any) {
    this.EMSFile = <File>DeFile.target.files[0];
    if (!this.EMSFile) {
      return;
    }
    if (this.EMSFile.size < 1 || this.EMSFile.size > 1024 * 1024 * 50) {
      this.Waste_Management_Files_Form.controls['EMSFile'].setErrors({
        incorrect: true,
      });
      this.EMSFile = null;
      return;
    } else {
      this.Waste_Management_Files_Form.controls['EMSFile'].setErrors(null);
    }
    this.EMSNewName = this.gen.getExpDoc(this.EMSFile.name, this.EMSFile.type);
    this.EMSNameDoc = this.gen.trimDocName(this.EMSFile.name);
    let dockind = this.gen.getExt(this.EMSFile.name);
  }

  saveAuditsDoc(DeFile: any) {
    this.AuditsFile = <File>DeFile.target.files[0];
    if (!this.AuditsFile) {
      return;
    }
    if (this.AuditsFile.size < 1 || this.AuditsFile.size > 1024 * 1024 * 50) {
      this.Waste_Management_Files_Form.controls['AuditsFile'].setErrors({
        incorrect: true,
      });
      this.AuditsFile = null;
      return;
    } else {
      this.Waste_Management_Files_Form.controls['AuditsFile'].setErrors(null);
    }
    this.AuditsNewName = this.gen.getExpDoc(
      this.AuditsFile.name,
      this.AuditsFile.type
    );
    this.AuditsNameDoc = this.gen.trimDocName(this.AuditsFile.name);
    let dockind = this.gen.getExt(this.AuditsFile.name);
  }
  //#endregion

  getHSE() {
    this.workprogram
      .getFormFiveHSE(this.genk.OmlName, this.genk.wpYear, this.genk.fieldName)
      .subscribe((res) => {
        let eMS_Files_Info = this
          .eMS_Files_Body as HSE_ENVIRONMENTAL_MANAGEMENT_SYSTEM;

        if (res.hseTechnicalSafety) {
          this.hseTechnicals = res.hseTechnicalSafety;
        }

        if (res.hseSafetyStudies) {
          this.hseSafetyStudies = res.hseSafetyStudies;
        }

        if (res.hseManagementPosition) {
          this.hseManagementPositions = res.hseManagementPosition;
        }

        if (res.hseSafetyCulture) {
          this.hseSafetyCultureTrainings = res.hseSafetyCulture;
        }

        if (res.hseOccupationalHealth) {
          this.occupationHealthManagements = res.hseOccupationalHealth;
        }

        if (res.hseQualityControl) {
          this.qualityControlDocuments = res.hseQualityControl;
        }

        if (res.hseClimateChange) {
          this.climateChanges = res.hseClimateChange;
        }

        if (res.hseInspectionMaintenance) {
          this.inspectionMaintenances = res.hseInspectionMaintenanceFacility;
        }

        if (res.hseAssetRegister) {
          this.assetRegisterTemplates = res.hseAssetRegister;
        }

        if (res.hseAssetRegisterRBI) {
          this.assetRegisterTemplateRBIs = res.hseAssetRegisterRBI;
        }

        if (res.hseOilSpill) {
          this.oilSpillReportings = res.hseOilSpill;
        }

        if (res.hseCausesOfSpill) {
          this.causeOfSpills = res.hseCausesOfSpill;
        }

        if (res.hseAccidentIncidenceType) {
          this.accidentIncidentReportings = res.hseAccidentIncidenceType;
        }

        if (res.hseospRegistrations) {
          this.ospRegulations = res.hseospRegistrations;
        }

        if (res.hseCommunityDisturbance) {
          this.communityDisturbances = res.hseCommunityDisturbance;
        }

        if (res.hseFatality) {
          this.fatalitiesCasualties = res.hseFatality;
        }

        if (res.hseDesignSafety) {
          this.lossPreventionStudies = res.hseDesignSafety;
        }

        if (res.hseEnvironmentalStudiesUpdated) {
          this.environmentalStudiesUpdatedList =
            res.hseEnvironmentalStudiesUpdated;
        }

        if (res.hseEnvironmentalStudies) {
          this.environmentalStudies = res.hseEnvironmentalStudies;
        }

        if (res.hseWasteManagement) {
          this.wasteManagements = res.hseWasteManagement;
        }

        if (res.hseWasteManagementType) {
          this.wasterManagementFacilities = res.hseWasteManagementType;
        }

        if (res.hseWasteManagementSystems) {
          this.wasterManagementFiles = res.hseWasteManagementSystems;
        }

        if (res.hseProducedWaterMgtUpdated) {
          this.producedWaterManagementUpdatedList =
            res.hseProducedWaterMgtUpdated;
        }

        if (res.hseProducedWaterMgt) {
          this.producedWaterManagements = res.hseProducedWaterMgt;
        }

        if (res.hseEnvironmentalCompliance) {
          this.environmentalComplianceMonitoring =
            res.hseEnvironmentalCompliance;
        }

        if (res.hseEnvironmentalComplianceChemical) {
          this.environmentalComplianceChemicals =
            res.hseEnvironmentalComplianceChemical;
        }

        if (res.hseEnvironmentalFiveYears) {
          this.environmentalStudiesFiveYearsSPs = res.hseEnvironmentalFiveYears;
        }

        if (res.hseEnvironmentalManagementSystems) {
          this.environmentalManagementSystems =
            res.hseEnvironmentalManagementSystems;
        }

        this.cd.markForCheck();
      });
  }

  filter(data) {
    const resultArray = Object.keys(data).map((index) => {
      let person = data[index];
      return person;
    });
    resultArray.forEach((element) => {
      delete element['companY_ID'];
      delete element['companyNumber'];
      delete element['companyName'];
      delete element['companyemail'];
      delete element['consession_Type'];
      delete element['contract_Type'];
      delete element['created_by'];
      delete element['date_Updated'];
      delete element['omL_ID'];
      delete element['omL_Name'];
      delete element['terrain'];
      delete element['updated_by'];
      delete element['year_of_WP'];
    });
    return resultArray;
  }

  Delete_HSE_Technical(row) {
    this.workprogram
      .post_HSE_TechnicalSafety(
        {} as HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_HSE_SafetyStudies(row: HSE_SAFETY_STUDIES_NEW) {
    this.workprogram
      .post_HSE_SafetyStudies(
        {} as HSE_SAFETY_STUDIES_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice(
            'Form submission was successful!',
            res.message,
            'success'
          );

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error, 'error');
        },
      });
  }

  Delete_HSE_Management(row: HSE_MANAGEMENT_POSITION) {
    this.workprogram
      .post_HSE_Management(
        {} as HSE_MANAGEMENT_POSITION,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error, 'error');
        },
      });
  }

  Delete_HSE_SafetyCulture(row: HSE_SAFETY_CULTURE_TRAINING) {
    this.workprogram
      .post_HSE_SafetyCulture(
        {} as HSE_SAFETY_CULTURE_TRAINING,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
      });
  }

  Delete_HSE_Occupational(row: HSE_OCCUPATIONAL_HEALTH_MANAGEMENT) {
    this.workprogram
      .post_HSE_Occupational(
        {} as HSE_OCCUPATIONAL_HEALTH_MANAGEMENT,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error, 'error');
        },
      });
  }

  Delete_HSE_Quality(row: HSE_QUALITY_CONTROL) {
    this.workprogram
      .post_HSE_QualityControl(
        {} as HSE_QUALITY_CONTROL,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_HSE_Climate(row: HSE_CLIMATE_CHANGE_AND_AIR_QUALITY) {
    this.workprogram
      .post_HSE_ClimateChange(
        {} as HSE_CLIMATE_CHANGE_AND_AIR_QUALITY,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_HSE_IM(row: HSE_INSPECTION_AND_MAINTENANCE_NEW) {
    this.workprogram
      .post_HSE_InspectionMaintenance(
        {} as HSE_INSPECTION_AND_MAINTENANCE_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_AssetRegister_PRE(
    row: HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW
  ) {
    this.workprogram
      .post_HSE_AssetRegister_PRE(
        {} as HSE_ASSET_REGISTER_TEMPLATE_PRESCRIPTIVE_EQUIPMENT_INSPECTION_STRATEGY_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_AssetRegister_RBI(event) {
    this.workprogram
      .post_HSE_AssetRegister_RBI(
        null,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        event.target.value,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
      });
  }

  Delete_OilSpill(row: HSE_OIL_SPILL_REPORTING_NEW) {
    this.workprogram
      .post_HSE_OilSpill(
        {} as HSE_OIL_SPILL_REPORTING_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_CausesOfSpill(event) {
    this.workprogram
      .post_HSE_Causes_Of_Spill(
        {} as HSE_CAUSES_OF_SPILL,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        event.target.value,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_AccidentIncidence(row: HSE_ACCIDENT_INCIDENCE_MODEL) {
    this.workprogram
      .post_HSE_Accident_Incidence(
        {} as HSE_ACCIDENT_INCIDENCE_MODEL,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_OSP(row: HSE_OSP_REGISTRATIONS_NEW) {
    this.workprogram
      .post_HSE_OSP_Registrations(
        {} as HSE_OSP_REGISTRATIONS_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_CommunityDisturbance(
    row: HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW
  ) {
    this.workprogram
      .post_HSE_Community(
        {} as HSE_COMMUNITY_DISTURBANCES_AND_OIL_SPILL_COST_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_Fatality(row: HSE_FATALITY) {
    this.workprogram
      .post_HSE_Fatality(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_DesignSafety(row: HSE_DESIGNS_SAFETY) {
    this.workprogram
      .post_HSE_DesignSafety(
        {} as HSE_DESIGNS_SAFETY,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_ESU(row: HSE_ENVIRONMENTAL_STUDIES_NEW) {
    this.workprogram
      .post_HSE_Environmental_Studies_Updated(
        {} as HSE_ENVIRONMENTAL_STUDIES_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_ES(row: HSE_ENVIRONMENTAL_STUDIES_NEW) {
    this.workprogram
      .post_HSE_Environmental_Studies_Updated(
        {} as HSE_ENVIRONMENTAL_STUDIES_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_Waste_Management(row: HSE_WASTE_MANAGEMENT_NEW) {
    this.workprogram
      .post_HSE_Waste_Management(
        {} as HSE_WASTE_MANAGEMENT_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_Waste_Management_Facility(
    row: HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW
  ) {
    this.workprogram
      .post_HSE_Waste_ManagementFacility(
        {} as HSE_WASTE_MANAGEMENT_TYPE_OF_FACILITY_NEW,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_Waste_Management_Files(row: HSE_WASTE_MANAGEMENT_SYSTEM) {
    this.workprogram
      .post_HSE_Waste_Management_Files(
        {} as FormData,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'success');
        },
      });
  }

  Delete_Water_Management_Updated(
    row: HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED
  ) {
    this.workprogram
      .post_HSE_Water_Management_New_Updated(
        {} as HSE_PRODUCED_WATER_MANAGEMENT_NEW_UPDATED,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_Water_Management(row: HSE_PRODUCED_WATER_MANAGEMENT_NEW) {
    this.workprogram
      .post_HSE_Water_Management(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_EC(row: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_NEW) {
    this.workprogram
      .post_HSE_Environmental_Compliance(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_EC_C(row: HSE_ENVIRONMENTAL_COMPLIANCE_MONITORING_CHEMICAL_USAGE_NEW) {
    this.workprogram
      .post_HSE_Environmental_Chemical_Compliance(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_ESS_Plan(row: HSE_ENVIRONMENTAL_STUDIES_FIVE_YEAR_STRATEGIC_PLAN_NEW) {
    this.workprogram
      .post_HSE_Environmental_Studies_Strategic_Plan(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_EMS_Files(row: HSE_ENVIRONMENTAL_MANAGEMENT_SYSTEM) {
    this.workprogram
      .post_HSE_EMS_Files(
        {} as FormData,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getHSE();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }
}
