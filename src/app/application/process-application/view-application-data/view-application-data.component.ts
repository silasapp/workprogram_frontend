import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';

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

  hhaimColDef = [
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

interface IDrillEachCost {
  id: number;
  companY_ID: string;
  companyName: string;
  companyNumber: number;
  companyemail: string;
  consession_Type: string;
  created_by: string;
  date_Created: string;
  date_Updated: string;
  field_ID: number;
  omL_ID: string;
  omL_Name: string;
  quater: string;
  surface_cordinates_for_each_well_in_degrees: string;
  updated_by: string;
  well_cost: string;
  well_name: string;
  year_of_WP: string;
}

interface IDrillEachCostProposed {
  id: number;
  companY_ID: string;
  companyName: string;
  companyNumber: number;
  companyemail: string;
  consession_Type: string;
  created_by: string;
  date_Created: string;
  date_Updated: string;
  field_ID: string;
  omL_ID: string;
  omL_Name: string;
  quater: string;
  surface_cordinates_for_each_well_in_degrees: string;
  updated_by: string;
  well_cost: string;
  well_name: string;
  year_of_WP: string;
}

interface IDrillOperationCategoriesWell {
  actual_No_Drilled_in_Current_Year: string;
  actual_Proposed: string;
  actual_wells_name: string;
  actual_year: string;
  any_New_Discoveries: string;
  basin: string;
  category: string;
  comments: string;
  companY_ID: string;
  companyName: string;
  companyNumber: number;
  companyemail: string;
  consession_Type: string;
  contract_Type: string;
  core_Cost_USD: string;
  core_Depth_Interval: string;
  cored: string;
  created_by: string;
  date_Created: string;
  date_Updated: string;
  depth_refrence: string;
  fieldDiscoveryUploadFilePath: string;
  field_ID: string;
  hydrocarbonCountUploadFilePath: string;
  hydrocarbon_Counts: string;
  id: number;
  location_name: string;
  measured_depth: string;
  no_of_wells_cored: number;
  number_of_Days_to_Total_Depth: string;
  omL_ID: string;
  omL_Name: string;
  processing_Fees_Paid: string;
  propose_well_names: string;
  proposed_No_Drilled: string;
  proposed_cost_per_well: string;
  proposed_year: string;
  quater: string;
  rig_Name: string;
  rig_type: string;
  spud_date: string;
  state_the_field_where_Discovery_was_made: string;
  surface_cordinates_for_each_well_in_degrees: string;
  target_reservoir: string;
  terrain: string;
  terrain_Drill: string;
  true_vertical_depth: string;
  updated_by: string;
  water_depth: string;
  wellName: string;
  well_Status_and_Depth: string;
  well_cost: string;
  well_name: string;
  well_trajectory: string;
  well_type: string;
  year_of_WP: string;
}

interface IGeoActivitiesAcquisition {
  id: number;
  actual_year: string;
  actual_year_aquired_data: string;
  budeget_Allocation: string;
  budeget_Allocation_NGN: string;
  budeget_Allocation_USD: string;
  companY_ID: string;
  companyName: string;
  companyNumber: number;
  companyemail: string;
  consession_Type: string;
  contract_Type: string;
  created_by: string;
  date_Created: string;
  date_Updated: string;
  field_ID: string;
  gas_Sales_Royalty_Payment: string;
  gas_flare_Royalty_payment: string;
  geo_Activity_Timeline: string;
  geo_Completion_Status: string;
  geo_Record_Length_of_Data: string;
  geo_acquired_geophysical_data: string;
  geo_area_of_coverage: string;
  geo_method_of_acquisition: string;
  geo_type_of_data_acquired: string;
  geophysical_ActivitiesId: number;
  name_of_Contractor: string;
  no_of_Folds: string;
  omL_ID: string;
  omL_Name: string;
  proposed_year: string;
  proposed_year_data: string;
  quantum: string;
  quantum_Approved: string;
  quantum_Planned: string;
  quantum_carry_forward: string;
  quater: string;
  remarks: string;
  terrain: string;
  updated_by: string;
  year_of_WP: string;
}

interface IGeoActivitiesProcessing {
  id: number;
  actual_year: string;
  actual_year_aquired_data: string;
  budeget_Allocation: string;
  budeget_Allocation_NGN: string;
  budeget_Allocation_USD: string;
  companY_ID: string;
  companyName: string;
  companyNumber: number;
  companyemail: string;
  consession_Type: string;
  contract_Type: string;
  created_by: string;
  date_Created: string;
  date_Updated: string;
  field_ID: string;
  geo_Activity_Timeline: string;
  geo_Any_Ongoing_Processing_Project: string;
  geo_Completion_Status: string;
  geo_Quantum_of_Data: string;
  geo_Quantum_of_Data_carry_over: string;
  geo_Type_of_Data_being_Processed: string;
  geophysical_Activities_ProcessingId: number;
  interpreted_Actual: string;
  interpreted_Proposed: string;
  name_of_Contractor: string;
  no_of_Folds: string;
  omL_ID: string;
  omL_Name: string;
  processed_Actual: string;
  processed_Proposed: string;
  proposed_year: string;
  proposed_year_data: string;
  quantum_Approved: string;
  quantum_Planned: string;
  quater: string;
  remarks: string;
  reprocessed_Actual: string;
  reprocessed_Proposed: string;
  terrain: string;
  updated_by: string;
  year_of_WP: string;
}

interface IHseAccidentIncidences {
  id: number;
  actuaL_year: string;
  companY_ID: string;
  companyName: string;
  companyNumber: number;
  companyemail: string;
  consession_Type: string;
  contract_Type: string;
  created_by: string;
  date_Created: string;
  date_Updated: string;
  field_ID: string;
  if_YES_were_they_reported: string;
  omL_ID: string;
  omL_Name: string;
  proposeD_year: string;
  terrain: string;
  updated_by: string;
  uploadIncidentStatisticsFilename: string;
  uploadIncidentStatisticsPath: string;
  was_there_any_accident_incidence: string;
  year_of_WP: string;
}

interface IHseAccidentIncidenceType {
  id: number;
  actuaL_year: string;
  cause: string;
  companY_ID: string;
  companyName: string;
  companyNumber: string;
  companyemail: string;
  consequence: string;
  consession_Type: string;
  contract_Type: string;
  created_by: string;
  date_: string;
  date_Created: string;
  date_Updated: string;
  field_ID: string;
  frequency: string;
  investigation: string;
  lesson_Learnt: string;
  location: string;
  omL_ID: string;
  omL_Name: string;
  proposeD_year: string;
  terrain: string;
  type_of_Accident_Incidence: string;
  updated_by: string;
  year_of_WP: string;
}

interface IHseAccidentModel {
  id: number;
  cause: string;
  consequence: string;
  date_: string;
  frequency: string;
  if_YES_were_they_reported: string;
  investigation: string;
  lesson_Learnt: string;
  location: string;
  type_of_Accident_Incidence: string;
  was_there_any_accident_incidence: string;
}

interface IHseAssetRegister {
  companY_ID: string;
  companyName: string;
  companyNumber: number;
  companyemail: string;
  condition_of_Equipment: string;
  consession_Type: string;
  contract_Type: string;
  created_by: string;
  date_Created: string;
  date_Updated: string;
  equipment_Inspected_as_and_when_due: string;
  equipment_Installation_date: string;
  equipment_description: string;
  equipment_manufacturer: string;
  equipment_serial_number: string;
  equipment_tag_number: string;
  equipment_type: string;
  facility: string;
  field_ID: string;
  function_Test_Result: string;
  id: number;
  inspection_Report_Review: string;
  last_Inspection_Type_Performed: string;
  last_inspection_date: string;
  next_Inspection_Date: string;
  omL_ID: string;
  omL_Name: string;
  proposed_Inspection_Type: string;
  state_reason: string;
  terrain: string;
  updated_by: string;
  year_of_WP: string;
}
