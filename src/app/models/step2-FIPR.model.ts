import { formatNumFromStr } from '../helpers/formatters';

export class FIELD_DEVELOPMENT_PLAN {
  public id: number = 0;
  public omL_ID: string = '';
  public omL_Name: string = '';
  public companyName: string = '';
  public companyemail: string = '';
  public year_of_WP: string = '';
  public status: string = '';
  public list_all_the_field_with_FDP: string = '';
  public which_fields_do_you_plan_to_submit_an_FDP: string = '';
  public number_of_wells_proposed_in_the_FDP: string = '';
  public processing_Fees_paid: string = '';
  public actual_year: string = '';
  public proposed_year: string = '';
  public created_by: string = '';
  public updated_by: string = '';
  public date_Created: string = '';
  public date_Updated: string = '';
  public consession_Type: string = '';
  public terrain: string = '';
  public contract_Type: string = '';
  public how_many_fields_in_concession: string = '';
  public uploaded_approved_FDP_Document: string = '';
  public are_they_oil_or_gas_wells: string = '';
  public fdpDocumentFilename: string = '';
  public companY_ID: string = '';
  public companyNumber: number;
  public how_many_fields_have_FDP: string = '';
  public how_many_fields_have_approved_FDP: string = '';
  private proposed_number_of_wells_from_approved_FDP?: string = '';
  private no_of_wells_drilled_in_current_year?: string = '';
  private noof_Producing_Fields?: string = '';

  public get _proposed_number_of_wells_from_approved_FDP() {
    return formatNumFromStr(this.proposed_number_of_wells_from_approved_FDP);
  }

  public set _proposed_number_of_wells_from_approved_FDP(
    proposed_number_of_wells_from_approved_FDP: string
  ) {
    this.proposed_number_of_wells_from_approved_FDP =
      proposed_number_of_wells_from_approved_FDP?.replace(/,/g, '');
  }

  public get _no_of_wells_drilled_in_current_year() {
    return formatNumFromStr(this.no_of_wells_drilled_in_current_year);
  }

  public set _no_of_wells_drilled_in_current_year(
    no_of_wells_drilled_in_current_year: string
  ) {
    this.no_of_wells_drilled_in_current_year =
      no_of_wells_drilled_in_current_year?.replace(/,/g, '');
  }

  public get _noof_Producing_Fields() {
    return formatNumFromStr(this.noof_Producing_Fields);
  }

  public set _noof_Producing_Fields(noof_Producing_Fields: string) {
    this.noof_Producing_Fields = noof_Producing_Fields?.replace(/,/g, '');
  }

  constructor(model?: FIELD_DEVELOPMENT_PLAN) {
    if (!model) return;

    this.id = model.id;
    this.omL_ID = model.omL_ID;
    this.omL_Name = model.omL_Name;
    this.companyName = model.companyName;
    this.companyemail = model.companyemail;
    this.year_of_WP = model.year_of_WP;
    this.how_many_fields_have_FDP = model.how_many_fields_have_FDP;
    this.status = model.status;
    this.list_all_the_field_with_FDP = model.list_all_the_field_with_FDP;
    this.which_fields_do_you_plan_to_submit_an_FDP =
      model.which_fields_do_you_plan_to_submit_an_FDP;
    this.how_many_fields_have_approved_FDP =
      model.how_many_fields_have_approved_FDP;
    this.number_of_wells_proposed_in_the_FDP =
      model.number_of_wells_proposed_in_the_FDP;
    this.no_of_wells_drilled_in_current_year =
      model.no_of_wells_drilled_in_current_year;
    this.proposed_number_of_wells_from_approved_FDP =
      model.proposed_number_of_wells_from_approved_FDP;
    this.processing_Fees_paid = model.processing_Fees_paid;
    this.actual_year = model.actual_year;
    this.proposed_year = model.proposed_year;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.consession_Type = model.consession_Type;
    this.terrain = model.terrain;
    this.contract_Type = model.contract_Type;
    this.how_many_fields_in_concession = model.how_many_fields_in_concession;
    this.noof_Producing_Fields = model.noof_Producing_Fields;
    this.uploaded_approved_FDP_Document = model.uploaded_approved_FDP_Document;
    this.are_they_oil_or_gas_wells = model.are_they_oil_or_gas_wells;
    this.fdpDocumentFilename = model.fdpDocumentFilename;
    this.companY_ID = model.companY_ID;
    this.companyNumber = model.companyNumber;
  }
}

export class FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE {
  public id: number;
  public omL_ID: string = '';
  public omL_Name: string = '';
  public companyName: string = '';
  public companyemail: string = '';
  public year_of_WP: string = '';
  public proposed_Development_well_name: string = '';
  public field_Name: string = '';
  public created_by: string = '';
  public updated_by: string = '';
  public date_Created: string = '';
  public date_Updated: string = '';
  public consession_Type: string = '';
  public companY_ID: string = '';
  public companyNumber: number;
  private oil?: string = '';
  private gas?: string = '';
  private condensate?: string = '';

  public set _oil(oil: string) {
    this.oil = oil?.replace(/,/g, '');
  }

  public get _oil() {
    return formatNumFromStr(this.oil);
  }

  public set _gas(gas: string) {
    this.gas = gas?.replace(/,/g, '');
  }

  public get _gas() {
    return formatNumFromStr(this.gas);
  }

  public set _condensate(condensate: string) {
    this.condensate = condensate?.replace(/,/g, '');
  }

  public get _condensate() {
    return formatNumFromStr(this.condensate);
  }

  constructor(model?: FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE) {
    if (!model) return;
    this.id = model.id;
    this.omL_ID = model.omL_ID;
    this.omL_Name = model.omL_Name;
    this.companyName = model.companyName;
    this.companyemail = model.companyemail;
    this.year_of_WP = model.year_of_WP;
    this.proposed_Development_well_name = model.proposed_Development_well_name;
    this.field_Name = model.field_Name;
    this.oil = model.oil;
    this.gas = model.gas;
    this.condensate = model.condensate;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.consession_Type = model.consession_Type;
    this.companY_ID = model.companY_ID;
    this.companyNumber = model.companyNumber;
  }
}

export class FIELD_DEVELOPMENT_FIELDS_TO_SUBMIT_FDP {
  id: number;
  omL_ID: string = '';
  omL_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  field_Name: string = '';
  development_Plan_Status: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  consession_Type: string = '';
  companY_ID: string = '';
  companyNumber: number;
}

export class FIELD_DEVELOPMENT_FIELD_AND_STATUS {
  id: number;
  omL_ID: string = '';
  omL_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  field_Name: string = '';
  development_Plan_Status: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  consession_Type: string = '';
  companY_ID: string = '';
  companyNumber: number;
}

export class WORKOVER_COMPLETION_JOBS {
  id: number;
  omL_ID: string = '';
  omL_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  current_year_Actual_Number_data: string = '';
  proposed_year_data: string = '';
  current_year_Budget_Allocation: string = '';
  remarks: string = '';
  processing_Fees_paid: string = '';
  do_you_have_approval_for_the_workover_recompletion: string = '';
  actual_year: string = '';
  proposed_year: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  budeget_Allocation_NGN: string = '';
  budeget_Allocation_USD: string = '';
  consession_Type: string = '';
  terrain: string = '';
  contract_Type: string = '';
  quater: string = '';
  oil_or_gas_wells: string = '';
  companY_ID: string = '';
  companyNumber: number;
}

export class INITIAL_WELL_COMPLETION_JOB {
  id: number;
  omL_ID: string = '';
  omL_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  do_you_have_approval_to_complete_the_well: string = '';
  current_year_Actual_Number: string = '';
  current_year_Budget_Allocation: string = '';
  proposed_year_data: string = '';
  processing_Fees_paid: string = '';
  remarks: string = '';
  actual_year: string = '';
  proposed_year: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  budeget_Allocation_NGN: string = '';
  budeget_Allocation_USD: string = '';
  consession_Type: string = '';
  contract_Type: string = '';
  terrain: string = '';
  quater: string = '';
  oil_or_gas_wells: string = '';
  actual_Completion_Date: string = '';
  proposed_Completion_Date: string = '';
  companY_ID: string = '';
  companyNumber: number;
}
export class GAS_PRODUCTION_ACTIVITY {
  id: number = 0;
  omL_ID: string = '';
  omL_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  current_Actual_Year: string = '';
  utilized: string = '';
  flared: string = '';
  forecast_: string = '';
  remarks_: string = '';
  how_many_NAG_fields_have_approved_Gas_FDP: string = '';
  gas_wells_drilled_and_planned: string = '';
  gas_production_and_flare_historical_performance: string = '';
  gas_plant_capacity: string = '';
  ongoing_and_planned_Gas_plant_projects: string = '';
  domestic_gas_obligation: string = '';
  planned_projects_for_domestic_supply: string = '';
  gas_Field_Development_Plan_Approval: string = '';
  gas_wells_drilled_and_wells_planned: string = '';
  aG_NAG_and_Condensate_in_place_volumes_and_Reserves_Reserves_for_reservoirs_and_Fields: string =
    '';
  maturation_plans_for_leads_and_prospects_leading_to_reserves_growth: string =
    '';
  current_production_status_for_all_Gas_and_condensate_Reservoirs: string = '';
  current_gas_production_utilisation_and_Flare_volumes: string = '';
  sources_of_Gas_utilisation_should_be_clearly_stated: string = '';
  gas_Production_and_flare_historical_Performance_5_years_Performance_and_Plan: string =
    '';
  substantiate_flare_reduction_methods_with_projects: string = '';
  annotate_clearly_reasons_for_increase_or_reduction_in_Gas_production_utilisation_and_flare_profiles: string =
    '';
  current_pressures_for_Gas_and_condensate_Reservoirs: string = '';
  production_forecast_for_all_Gas_and_condensate_reservoirs: string = '';
  gas_compositional_Analysis: string = '';
  feed_gas_Volumes_into_the_Processing_Facility: string = '';
  gas_Plant_Capacity_NEW: string = '';
  plant_Utilization_Capacity: string = '';
  plant_maintenance_activities: string = '';
  ongoing_and_planned_Gas_plant_projects_NEW: string = '';
  lnG_and_NGLs_Production_forecast: string = '';
  custody_Transfer_status: string = '';
  license_Renewal_Status_for_all_Gas_plants: string = '';
  pipeline_license_renewal_staus: string = '';
  domestic_Gas_Supply_DSO: string = '';
  projects_planned_for_Domestic_supply_Gas_to_power_industries_etc: string = '';
  actual_year: string = '';
  proposed_year: string = '';
  contract_Type: string = '';
  terrain: string = '';
  penaltyfeepaid: string = '';
  amount_Paid: string = '';
  consession_Type: string = '';
  proposed_production: string = '';
  proposed_utilization: string = '';
  proposed_flaring: string = '';
  gas_flare_Royalty_payment: string = '';
  gas_Sales_Royalty_Payment: string = '';
  no_of_gas_well_planned: string = '';
  no_of_gas_well_drilled: string = '';
  is_there_a_gas_plant: string = '';
  no_of_ongoing_projects: string = '';
  no_of_plannned_projects: string = '';
  is_there_a_license_to_operate_a_gas_plant: string = '';
  domestic_Gas_obligation_met: string = '';
  has_annual_NDR_subscription_fee_been_paid: string = '';
  when_was_the_date_of_your_last_NDR_submission: Date;
  upload_NDR_payment_receipt: File;
  are_you_up_to_date_with_your_NDR_data_submission: string = '';
  ndrFilename: string = '';
  number_of_gas_wells_completed: string = '';
  number_of_gas_wells_tested: string = '';
  companY_ID: string = '';
  companyNumber: number;
}

export class OIL_CONDENSATE_PRODUCTION_ACTIVITY {
  id: number;
  omL_ID: string = '';
  omL_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  current_year_Actual: string = '';
  deferment: string = '';
  forecast: string = '';
  remarks: string = '';
  cost_Barrel: string = '';
  company_Timeline: string = '';
  company_Oil: string = '';
  company_Condensate: string = '';
  company_AG: string = '';
  company_NAG: string = '';
  fiveyear_Timeline: string = '';
  fiveyear_Oil: string = '';
  fiveyear_Condensate: string = '';
  fiveyear_AG: string = '';
  fiveyear_NAG: string = '';
  did_you_carry_out_any_well_test: string = '';
  type_of_Test: string = '';
  maximum_Efficiency_Rate: string = '';
  number_of_Test_Carried_out: string = '';
  number_of_Producing_Wells: string = '';
  daily_Production_: string = '';
  is_any_of_your_field_straddling: string = '';
  how_many_fields_straddle: string = '';
  straddling_Fields_OC: string = '';
  prod_Status_OC: string = '';
  straddling_Field_OP: string = '';
  company_Name_OP: string = '';
  prod_Status_OP: string = '';
  has_DPR_been_notified: string = '';
  has_the_other_party_been_notified: string = '';
  has_the_CA_been_signed: string = '';
  committees_been_inaugurated: string = '';
  participation_been_determined: string = '';
  has_the_PUA_been_signed: string = '';
  is_there_a_Joint_Development: string = '';
  has_the_UUOA_been_signed: string = '';
  actual_year: string = '';
  proposed_year: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  total_Reconciled_National_Crude_Oil_Production: string = '';
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  oil_Royalty_Payment: string = '';
  straddle_field_producing: string = '';
  what_concession_field_straddling: string = '';
  gas_AG: string = '';
  gas_NAG: string = '';
  companY_ID: string = '';
  companyNumber: number;
  domestic_Gas_obligation_met: any;
}

export class OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION {
  id: number;
  omL_ID: string = '';
  omL_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  current_year_Actual: string = '';
  deferment: string = '';
  forecast: string = '';
  remarks: string = '';
  cost_Barrel: string = '';
  company_Timeline: string = '';
  company_Oil: string = '';
  company_Condensate: string = '';
  company_AG: string = '';
  company_NAG: string = '';
  fiveyear_Timeline: string = '';
  fiveyear_Oil: string = '';
  fiveyear_Condensate: string = '';
  fiveyear_AG: string = '';
  fiveyear_NAG: string = '';
  did_you_carry_out_any_well_test: string = '';
  type_of_Test: string = '';
  maximum_Efficiency_Rate: string = '';
  number_of_Test_Carried_out: string = '';
  number_of_Producing_Wells: string = '';
  daily_Production_: string = '';
  is_any_of_your_field_straddling: string = '';
  how_many_fields_straddle: string = '';
  straddling_Fields_OC: string = '';
  prod_Status_OC: string = '';
  straddling_Field_OP: string = '';
  company_Name_OP: string = '';
  prod_Status_OP: string = '';
  has_DPR_been_notified: string = '';
  has_the_other_party_been_notified: string = '';
  has_the_CA_been_signed: string = '';
  committees_been_inaugurated: string = '';
  participation_been_determined: string = '';
  has_the_PUA_been_signed: string = '';
  is_there_a_Joint_Development: string = '';
  has_the_UUOA_been_signed: string = '';
  actual_year: string = '';
  proposed_year: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  total_Reconciled_National_Crude_Oil_Production: string = '';
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  oil_Royalty_Payment: string = '';
  straddle_field_producing: string = '';
  what_concession_field_straddling: string = '';
  puaUploadFilePath: string = '';
  uuoaUploadFilePath: string = '';
  puaUploadFilename: string = '';
  uuoaUploadFilename: string = '';
  companY_ID: string = '';
  companyNumber: number;
  gas_AG: string;
}

export class RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE {
  public id: number;
  public omL_ID: string = '';
  public omL_Name: string = '';
  public companyName: string = '';
  public companyemail: string = '';
  public year_of_WP: string = '';
  public company_Reserves_Year: string = '';
  public flaG1: string = '';
  public flaG2: string = '';
  public created_by: string = '';
  public updated_by: string = '';
  public date_Created: string = '';
  public date_Updated: string = '';
  public consession_Type: string = '';
  public terrain: string = '';
  public contract_Type: string = '';
  public companY_ID: string = '';
  public companyNumber: number;

  private company_Reserves_Oil?: string = '';
  private company_Reserves_Condensate?: string = '';
  private company_Reserves_AG?: string = '';
  private company_Reserves_NAG?: string = '';
  private company_Reserves_AnnualOilProduction?: string = '';
  private company_Reserves_AnnualGasProduction?: string = '';
  private company_Reserves_AnnualCondensateProduction?: string = '';
  private company_Reserves_AnnualGasAGProduction?: string = '';
  private company_Reserves_AnnualGasNAGProduction?: string = '';

  public set _company_Reserves_Oil(company_Reserves_Oil: string) {
    this.company_Reserves_Oil = company_Reserves_Oil?.replace(/,/g, '');
  }

  public get _company_Reserves_Oil() {
    return formatNumFromStr(this.company_Reserves_Oil);
  }

  public set _company_Reserves_Condensate(company_Reserves_Condensate: string) {
    this.company_Reserves_Condensate = company_Reserves_Condensate?.replace(
      /,/g,
      ''
    );
  }

  public get _company_Reserves_Condensate() {
    return formatNumFromStr(this.company_Reserves_Condensate);
  }

  public set _company_Reserves_AG(company_Reserves_AG: string) {
    this.company_Reserves_AG = company_Reserves_AG?.replace(/,/g, '');
  }

  public get _company_Reserves_AG() {
    return formatNumFromStr(this.company_Reserves_AG);
  }

  public set _company_Reserves_NAG(company_Reserves_NAG: string) {
    this.company_Reserves_NAG = company_Reserves_NAG?.replace(/,/g, '');
  }

  public get _company_Reserves_NAG() {
    return formatNumFromStr(this.company_Reserves_NAG);
  }

  public set _company_Reserves_AnnualOilProduction(
    company_Reserves_AnnualOilProduction: string
  ) {
    this.company_Reserves_AnnualOilProduction =
      company_Reserves_AnnualOilProduction?.replace(/,/g, '');
  }

  public get _company_Reserves_AnnualOilProduction() {
    return formatNumFromStr(this.company_Reserves_AnnualOilProduction);
  }

  public set _company_Reserves_AnnualGasProduction(
    company_Reserves_AnnualGasProduction: string
  ) {
    this.company_Reserves_AnnualGasProduction =
      company_Reserves_AnnualGasProduction?.replace(/,/g, '');
  }

  public get _company_Reserves_AnnualGasProduction() {
    return formatNumFromStr(this.company_Reserves_AnnualGasProduction);
  }

  public set _company_Reserves_AnnualCondensateProduction(
    company_Reserves_AnnualCondensateProduction: string
  ) {
    this.company_Reserves_AnnualCondensateProduction =
      company_Reserves_AnnualCondensateProduction?.replace(/,/g, '');
  }

  public get _company_Reserves_AnnualCondensateProduction() {
    return formatNumFromStr(this.company_Reserves_AnnualCondensateProduction);
  }

  public set _company_Reserves_AnnualGasAGProduction(
    company_Reserves_AnnualGasAGProduction: string
  ) {
    this.company_Reserves_AnnualGasAGProduction =
      company_Reserves_AnnualGasAGProduction?.replace(/,/g, '');
  }

  public get _company_Reserves_AnnualGasAGProduction() {
    return formatNumFromStr(this.company_Reserves_AnnualGasAGProduction);
  }

  public set _company_Reserves_AnnualGasNAGProduction(
    company_Reserves_AnnualGasNAGProduction: string
  ) {
    this.company_Reserves_AnnualGasNAGProduction =
      company_Reserves_AnnualGasNAGProduction?.replace(/,/g, '');
  }

  public get _company_Reserves_AnnualGasNAGProduction() {
    return formatNumFromStr(this.company_Reserves_AnnualGasNAGProduction);
  }

  constructor(model?: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE) {
    if (!model) return;

    this.id = model.id;
    this.omL_ID = model.omL_ID;
    this.omL_Name = model.omL_Name;
    this.companyName = model.companyName;
    this.companyemail = model.companyemail;
    this.year_of_WP = model.year_of_WP;
    this.company_Reserves_Year = model.company_Reserves_AG;
    this.company_Reserves_Oil = model.company_Reserves_Oil;
    this.company_Reserves_Condensate = model.company_Reserves_Condensate;
    this.company_Reserves_AG = model.company_Reserves_AG;
    this.company_Reserves_NAG = model.company_Reserves_NAG;
    this.company_Reserves_AnnualOilProduction =
      model.company_Reserves_AnnualOilProduction;
    this.flaG1 = model.flaG1;
    this.flaG2 = model.flaG2;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.consession_Type = model.consession_Type;
    this.terrain = model.terrain;
    this.contract_Type = model.contract_Type;
    this.company_Reserves_AnnualGasProduction =
      model.company_Reserves_AnnualGasProduction;
    this.company_Reserves_AnnualCondensateProduction =
      model.company_Reserves_AnnualCondensateProduction;
    this.company_Reserves_AnnualGasAGProduction =
      model.company_Reserves_AnnualGasAGProduction;
    this.company_Reserves_AnnualGasNAGProduction =
      model.company_Reserves_AnnualGasNAGProduction;
    this.companY_ID = model.companY_ID;
    this.companyNumber = this.companyNumber;
  }
}

export class RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection {
  public id: number;
  public omL_ID: string = '';
  public omL_Name: string = '';
  public companyName: string = '';
  public companyemail: string = '';
  public year_of_WP: string = '';
  public fiveyear_Projection_Year: string = '';
  public created_by: string = '';
  public updated_by: string = '';
  public date_Created: string = '';
  public date_Updated: string = '';
  public terrain: string = '';
  public contract_Type: string = '';
  public consession_Type: string = '';
  public companY_ID: string = '';
  public companyNumber: number;

  public fiveyear_Projection_Oil: string = '';
  public fiveyear_Projection_Condensate: string = '';
  public fiveyear_Projection_AG: string = '';
  public fiveyear_Projection_NAG: string = '';

  public set _fiveyear_Projection_Oil(fiveyear_Projection_Oil: string) {
    this.fiveyear_Projection_Oil = fiveyear_Projection_Oil?.replace(/,/g, '');
  }

  public get _fiveyear_Projection_Oil() {
    return formatNumFromStr(this.fiveyear_Projection_Oil);
  }

  public set _fiveyear_Projection_Condensate(
    fiveyear_Projection_Condensate: string
  ) {
    this.fiveyear_Projection_Condensate =
      fiveyear_Projection_Condensate?.replace(/,/g, '');
  }

  public get _fiveyear_Projection_Condensate() {
    return formatNumFromStr(this.fiveyear_Projection_Condensate);
  }

  public set _fiveyear_Projection_AG(fiveyear_Projection_AG: string) {
    this.fiveyear_Projection_AG = fiveyear_Projection_AG?.replace(/,/g, '');
  }

  public get _fiveyear_Projection_AG() {
    return formatNumFromStr(this.fiveyear_Projection_AG);
  }

  public set _fiveyear_Projection_NAG(fiveyear_Projection_NAG: string) {
    this.fiveyear_Projection_NAG = fiveyear_Projection_NAG?.replace(/,/g, '');
  }

  public get _fiveyear_Projection_NAG() {
    return formatNumFromStr(this.fiveyear_Projection_NAG);
  }

  constructor(model?: RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection) {
    if (!model) return;

    this.id = model.id;
    this.omL_ID = model.omL_ID;
    this.omL_Name = model.omL_Name;
    this.companyName = model.companyName;
    this.companyemail = model.companyemail;
    this.year_of_WP = model.year_of_WP;
    this.fiveyear_Projection_Year = model.fiveyear_Projection_Year;
    this.fiveyear_Projection_Oil = model.fiveyear_Projection_Oil;
    this.fiveyear_Projection_Condensate = model.fiveyear_Projection_Condensate;
    this.fiveyear_Projection_AG = model.fiveyear_Projection_AG;
    this.fiveyear_Projection_NAG = model.fiveyear_Projection_NAG;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.terrain = model.terrain;
    this.contract_Type = model.contract_Type;
    this.consession_Type = model.consession_Type;
    this.companY_ID = model.companY_ID;
    this.companyNumber = model.companyNumber;
  }
}

export class RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE {
  public id: number;
  public oML_ID: string = '';
  public oML_Name: string = '';
  public companyName: string = '';
  public companyemail: string = '';
  public year_of_WP: string = '';
  public reserves_Decline_Was_there_a_decline_in_reserve: string = '';
  public reserves_Decline_Reason_for_Decline: string = '';
  public created_by: string = '';
  public updated_by: string = '';
  public date_Created: string = '';
  public date_Updated: string = '';
  public terrain: string = '';
  public consession_Type: string = '';
  public contract_Type: string = '';
  public cOMPANY_ID: string = '';
  public companyNumber: number;
  private reserves_Decline_Oil: string = '';
  private reserves_Decline_Condensate: string = '';
  private reserves_Decline_AG: string = '';
  private reserves_Decline_NAG: string = '';

  public set _reserves_Decline_Oil(reserves_Decline_Oil: string) {
    this.reserves_Decline_Oil = reserves_Decline_Oil?.replace(/,/g, '');
  }

  public get _reserves_Decline_Oil() {
    return formatNumFromStr(this.reserves_Decline_Oil);
  }

  public set _reserves_Decline_Condensate(reserves_Decline_Condensate: string) {
    this.reserves_Decline_Condensate = reserves_Decline_Condensate?.replace(
      /,/g,
      ''
    );
  }

  public get _reserves_Decline_Condensate() {
    return formatNumFromStr(this.reserves_Decline_Condensate);
  }

  public set _reserves_Decline_AG(reserves_Decline_AG: string) {
    this.reserves_Decline_AG = reserves_Decline_AG?.replace(/,/g, '');
  }

  public get _reserves_Decline_AG() {
    return formatNumFromStr(this.reserves_Decline_AG);
  }

  public set _reserves_Decline_NAG(reserves_Decline_NAG: string) {
    this.reserves_Decline_NAG = reserves_Decline_NAG?.replace(/,/g, '');
  }

  public get _reserves_Decline_NAG() {
    return formatNumFromStr(this.reserves_Decline_NAG);
  }

  constructor(model?: RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE) {
    if (!model) return;

    this.id = model.id;
    this.oML_ID = model.oML_ID;
    this.oML_Name = model.oML_Name;
    this.companyName = model.companyName;
    this.companyemail = model.companyemail;
    this.year_of_WP = model.year_of_WP;
    this.reserves_Decline_Was_there_a_decline_in_reserve =
      model.reserves_Decline_Was_there_a_decline_in_reserve;
    this.reserves_Decline_Reason_for_Decline =
      model.reserves_Decline_Reason_for_Decline;
    this.reserves_Decline_Oil = model.reserves_Decline_Oil;
    this.reserves_Decline_Condensate = model.reserves_Decline_Condensate;
    this.reserves_Decline_AG = model.reserves_Decline_AG;
    this.reserves_Decline_NAG = model.reserves_Decline_NAG;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.terrain = model.terrain;
    this.consession_Type = model.consession_Type;
    this.contract_Type = model.contract_Type;
    this.cOMPANY_ID = model.cOMPANY_ID;
    this.companyNumber = model.companyNumber;
  }
}

export class POST_RESERVES_REPLACEMENT_RATIO {
  public id: number;
  public omL_ID: string;
  public omL_Name: string;
  public companyName: string;
  public companyEmail: string;
  public year_of_WP: string;
  public created_by: string;
  public updated_by: string;
  public date_Created: string;
  public date_Updated: string;
  public contract_Type: string;
  public terrain: string;
  public consession_Type: string;
  public trend_Year: string;
  public companY_ID: string;
  public companyNumber: number;
  public field_ID: number;
  private reserveS_REPLACEMENT_RATIO_VALUE: string;

  public set _reserveS_REPLACEMENT_RATIO_VALUE(
    reserveS_REPLACEMENT_RATIO_VALUE: string
  ) {
    this.reserveS_REPLACEMENT_RATIO_VALUE =
      reserveS_REPLACEMENT_RATIO_VALUE?.replace(/,/g, '');
  }

  public get _reserveS_REPLACEMENT_RATIO_VALUE() {
    return formatNumFromStr(this.reserveS_REPLACEMENT_RATIO_VALUE);
  }

  constructor(model?: POST_RESERVES_REPLACEMENT_RATIO) {
    if (!model) return;
    this.id = model.id;
    this.omL_ID = model.omL_ID;
    this.omL_Name = model.omL_Name;
    this.companyName = model.companyName;
    this.companyEmail = model.companyEmail;
    this.year_of_WP = model.year_of_WP;
    this.reserveS_REPLACEMENT_RATIO_VALUE =
      model.reserveS_REPLACEMENT_RATIO_VALUE;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.contract_Type = model.contract_Type;
    this.terrain = model.terrain;
    this.consession_Type = model.contract_Type;
    this.trend_Year = model.trend_Year;
    this.companY_ID = model.companY_ID;
    this.companyNumber = model.companyNumber;
    this.field_ID = model.field_ID;
  }
}

export class RESERVES_UPDATES_LIFE_INDEX {
  public id: number;
  public omL_ID: string = '';
  public omL_Name: string = '';
  public CompanyName: string = '';
  public companyemail: string = '';
  public companY_ID: string = '';
  public companyNumber: number;
  public year_of_WP: string = '';
  public created_by: string = '';
  public updated_by: string = '';
  public date_Created: string = '';
  public date_Updated: string = '';
  public consession_Type: string = '';
  private oil: string = '';
  private condensate: string = '';
  private nag: string = '';
  private ag: string = '';

  public set _oil(oil: string) {
    this.oil = oil?.replace(/,/g, '');
  }

  public get _oil() {
    return formatNumFromStr(this.oil);
  }

  public set _condensate(condensate: string) {
    this.condensate = condensate?.replace(/,/g, '');
  }

  public get _condensate() {
    return formatNumFromStr(this.condensate);
  }

  public set _nag(nag: string) {
    this.nag = nag?.replace(/,/g, '');
  }

  public get _nag() {
    return formatNumFromStr(this.nag);
  }

  public set _ag(ag: string) {
    this.ag = ag?.replace(/,/g, '');
  }

  public get _ag() {
    return formatNumFromStr(this.ag);
  }

  constructor(model?: RESERVES_UPDATES_LIFE_INDEX) {
    if (!model) return;

    this.id = model.id;
    this.omL_ID = model.omL_ID;
    this.omL_Name = model.omL_Name;
    this.CompanyName = model.CompanyName;
    this.companyemail = model.companyemail;
    this.companY_ID = model.companY_ID;
    this.companyNumber = model.companyNumber;
    this.year_of_WP = model.year_of_WP;
    this.oil = model.oil;
    this.condensate = model.condensate;
    this.nag = model.nag;
    this.ag = model.ag;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.consession_Type = model.consession_Type;
  }
}

export class RESERVES_UPDATES_DEPLETION_RATE {
  public id: number;
  public omL_ID: string = '';
  public omL_Name: string = '';
  public companyName: string = '';
  public companyNumber: number;
  public companyemail: string = '';
  public companY_ID: string = '';
  public year_of_WP: string = '';
  public created_by: string = '';
  public updated_by: string = '';
  public date_Created: string = '';
  public date_Updated: string = '';
  public consession_Type: string = '';
  private oil: string = '';
  private condensate: string = '';
  private nag: string = '';
  private ag: string = '';

  public set _oil(oil: string) {
    this.oil = oil?.replace(/,/g, '');
  }

  public get _oil() {
    return formatNumFromStr(this.oil);
  }

  public set _condensate(condensate: string) {
    this.condensate = condensate?.replace(/,/g, '');
  }

  public get _condensate() {
    return formatNumFromStr(this.condensate);
  }

  public set _nag(nag: string) {
    this.nag = nag?.replace(/,/g, '');
  }

  public get _nag() {
    return formatNumFromStr(this.nag);
  }

  public set _ag(ag: string) {
    this.ag = ag?.replace(/,/g, '');
  }

  public get _ag() {
    return formatNumFromStr(this.ag);
  }

  constructor(model?: RESERVES_UPDATES_DEPLETION_RATE) {
    if (!model) return;

    this.id = model.id;
    this.omL_ID = model.omL_ID;
    this.omL_Name = model.omL_Name;
    this.companyName = model.companyName;
    this.companyemail = model.companyemail;
    this.companY_ID = model.companY_ID;
    this.companyNumber = model.companyNumber;
    this.year_of_WP = model.year_of_WP;
    this.oil = model.oil;
    this.condensate = model.condensate;
    this.nag = model.nag;
    this.ag = model.ag;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.consession_Type = model.consession_Type;
  }
}

export class RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION {
  public id: number;
  public oML_ID: string = '';
  public oML_Name: string = '';
  public companyName: string = '';
  public companyemail: string = '';
  public year_of_WP: string = '';
  public company_Annual_Year: string = '';
  public created_by: string = '';
  public updated_by: string = '';
  public date_Created: string = '';
  public date_Updated: string = '';
  public terrain: string = '';
  public contract_Type: string = '';
  public consession_Type: string = '';
  public cOMPANY_ID: string = '';
  public companyNumber: number;
  private company_Annual_Oil: string = '';
  private company_Annual_Condensate: string = '';
  private company_Annual_AG: string = '';
  private company_Annual_NAG: string = '';

  public set _company_Annual_Oil(company_Annual_Oil: string) {
    this.company_Annual_Oil = company_Annual_Oil?.replace(/,/g, '');
  }

  public get _company_Annual_Oil() {
    return formatNumFromStr(this.company_Annual_Oil);
  }

  public set _company_Annual_Condensate(company_Annual_Condensate: string) {
    this.company_Annual_Condensate = company_Annual_Condensate?.replace(
      /,/g,
      ''
    );
  }

  public get _company_Annual_Condensate() {
    return formatNumFromStr(this.company_Annual_Condensate);
  }

  public set _company_Annual_AG(company_Annual_AG: string) {
    this.company_Annual_AG = company_Annual_AG?.replace(/,/g, '');
  }

  public get _company_Annual_AG() {
    return formatNumFromStr(this.company_Annual_AG);
  }

  public set _company_Annual_NAG(company_Annual_NAG: string) {
    this.company_Annual_NAG = company_Annual_NAG?.replace(/,/g, '');
  }

  public get _company_Annual_NAG() {
    return formatNumFromStr(this.company_Annual_NAG);
  }

  constructor(
    model?: RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION
  ) {
    if (!model) return;

    this.id = model.id;
    this.oML_ID = model.oML_ID;
    this.oML_Name = model.oML_Name;
    this.companyName = model.companyName;
    this.companyemail = model.companyemail;
    this.year_of_WP = model.year_of_WP;
    this.company_Annual_Year = model.company_Annual_Year;
    this.company_Annual_Oil = model.company_Annual_Oil;
    this.company_Annual_Condensate = model.company_Annual_Condensate;
    this.company_Annual_AG = model.company_Annual_AG;
    this.company_Annual_NAG = model.company_Annual_NAG;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.terrain = model.terrain;
    this.contract_Type = model.contract_Type;
    this.consession_Type = model.consession_Type;
    this.cOMPANY_ID = model.cOMPANY_ID;
    this.companyNumber = model.companyNumber;
  }
}

export class RESERVES_UPDATES_OIL_CONDENSATE_Fiveyear_Projection {
  id: number;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  fiveyear_Projection_Year: string = '';
  fiveyear_Projection_Oil: string = '';
  fiveyear_Projection_Condensate: string = '';
  fiveyear_Projection_AG: string = '';
  fiveyear_Projection_NAG: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  terrain: string = '';
  contract_Type: string = '';
  consession_Type: string = '';
  cOMPANY_ID: string = '';
  companyNumber: number;
}

export class RESERVES_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE {
  id: number;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  company_Reserves_Year: string = '';
  company_Reserves_Oil: string = '';
  company_Reserves_Condensate: string = '';
  company_Reserves_AG: string = '';
  company_Reserves_NAG: string = '';
  company_Reserves_AnnualOilProduction: string = '';
  fLAG1: string = '';
  fLAG2: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  consession_Type: string = '';
  terrain: string = '';
  contract_Type: string = '';
  company_Reserves_AnnualGasProduction: string = '';
  company_Reserves_AnnualCondensateProduction: string = '';
  company_Reserves_AnnualGasAGProduction: string = '';
  company_Reserves_AnnualGasNAGProduction: string = '';
  cOMPANY_ID: string = '';
  companyNumber: string = '';
}

export class RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition {
  public id: number;
  public oML_ID: string;
  public oML_Name: string;
  public companyName: string;
  public companyemail: string;
  public year_of_WP: string;
  public reserves_Addition_Was_there_any_Reserve_Addition: string;
  public reserves_Addition_Reason_for_Addition: string;
  public created_by: string;
  public updated_by: string;
  public date_Created: string;
  public date_Updated: string;
  public contract_Type: string;
  public consession_Type: string;
  public terrain: string;
  public cOMPANY_ID: string;
  public companyNumber: string;
  private reserves_Addition_Oil: string;
  private reserves_Addition_Condensate: string;
  private reserves_Addition_AG: string;
  private reserves_Addition_NAG: string;

  public set _reserves_Addition_Oil(reserves_Addition_Oil: string) {
    this.reserves_Addition_Oil = reserves_Addition_Oil?.replace(/,/g, '');
  }

  public get _reserves_Addition_Oil() {
    return formatNumFromStr(this.reserves_Addition_Oil);
  }

  public set _reserves_Addition_Condensate(
    reserves_Addition_Condensate: string
  ) {
    this.reserves_Addition_Condensate = reserves_Addition_Condensate?.replace(
      /,/g,
      ''
    );
  }

  public get _reserves_Addition_Condensate() {
    return formatNumFromStr(this.reserves_Addition_Condensate);
  }

  public set _reserves_Addition_AG(reserves_Addition_AG: string) {
    this.reserves_Addition_AG = reserves_Addition_AG?.replace(/,/g, '');
  }

  public get _reserves_Addition_AG() {
    return formatNumFromStr(this.reserves_Addition_AG);
  }

  public set _reserves_Addition_NAG(reserves_Addition_NAG: string) {
    this.reserves_Addition_NAG = reserves_Addition_NAG?.replace(/,/g, '');
  }

  public get _reserves_Addition_NAG() {
    return formatNumFromStr(this.reserves_Addition_NAG);
  }

  constructor(model?: RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition) {
    if (!model) return;

    this.id = model.id;
    this.oML_ID = model.oML_ID;
    this.oML_Name = model.oML_Name;
    this.companyName = model.companyName;
    this.companyemail = model.companyemail;
    this.year_of_WP = model.year_of_WP;
    this.reserves_Addition_Was_there_any_Reserve_Addition =
      model.reserves_Addition_Was_there_any_Reserve_Addition;
    this.reserves_Addition_Reason_for_Addition =
      model.reserves_Addition_Reason_for_Addition;
    this.reserves_Addition_Oil = model.reserves_Addition_Oil;
    this.reserves_Addition_Condensate = model.reserves_Addition_Condensate;
    this.reserves_Addition_AG = model.reserves_Addition_AG;
    this.reserves_Addition_NAG = model.reserves_Addition_NAG;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.contract_Type = model.contract_Type;
    this.consession_Type = model.consession_Type;
    this.terrain = model.terrain;
    this.cOMPANY_ID = model.cOMPANY_ID;
    this.companyNumber = model.companyNumber;
  }
}

export class RESERVES_UPDATES_OIL_CONDENSATE_MMBBL {
  id: number;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  reserves_as_at_MMbbl_P1: string = '';
  additional_Reserves_as_at_: string = '';
  total_Production_: string = '';
  reserves_as_at_MMbbl: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  reserves_as_at_MMbbl_condensate: string = '';
  reserves_as_at_MMbbl_gas: string = '';
  consession_Type: string = '';
  contract_Type: string = '';
  terrain: string = '';
  companyNumber: number;
}

export class OIL_CONDENSATE_PRODUCTION_ACTIVITy {
  id: number;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  current_year_Actual: string = '';
  deferment: string = '';
  forecast: string = '';
  remarks: string = '';
  cost_Barrel: string = '';
  company_Timeline: string = '';
  company_Oil: string = '';
  company_Condensate: string = '';
  company_AG: string = '';
  company_NAG: string = '';
  fiveyear_Timeline: string = '';
  fiveyear_Oil: string = '';
  fiveyear_Condensate: string = '';
  fiveyear_AG: string = '';
  fiveyear_NAG: string = '';
  did_you_carry_out_any_well_test: string = '';
  type_of_Test: string = '';
  maximum_Efficiency_Rate: string = '';
  number_of_Test_Carried_out: string = '';
  number_of_Producing_Wells: string = '';
  daily_Production_: string = '';
  is_any_of_your_field_straddling: string = '';
  how_many_fields_straddle: string = '';
  straddling_Fields_OC: string = '';
  prod_Status_OC: string = '';
  straddling_Field_OP: string = '';
  company_Name_OP: string = '';
  prod_Status_OP: string = '';
  has_DPR_been_notified: string = '';
  has_the_other_party_been_notified: string = '';
  has_the_CA_been_signed: string = '';
  committees_been_inaugurated: string = '';
  participation_been_determined: string = '';
  has_the_PUA_been_signed: string = '';
  is_there_a_Joint_Development: string = '';
  has_the_UUOA_been_signed: string = '';
  actual_year: string = '';
  proposed_year: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  total_Reconciled_National_Crude_Oil_Production: string = '';
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  oil_Royalty_Payment: string = '';
  straddle_field_producing: string = '';
  what_concession_field_straddling: string = '';
  gas_AG: string = '';
  gas_NAG: string = '';
  cOMPANY_ID: string = '';
  companyNumber: number;
}

export class NDR {
  id: number;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  cOMPANY_ID: string = '';
  year_of_WP: string = '';
  has_annual_NDR_subscription_fee_been_paid: string = '';
  when_was_the_date_of_your_last_NDR_submission: string = '';
  upload_NDR_payment_receipt: string = '';
  are_you_up_to_date_with_your_NDR_data_submission: string = '';
  nDRFilename: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  companyNumber: number;
}

export class OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity {
  id: number;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  production_month_id: string = '';
  production_month: string = '';
  production: string = '';
  avg_Daily_Production: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  gas_AG: string = '';
  gas_NAG: string = '';
  cOMPANY_ID: string = '';
  companyNumber: string = '';
}

export class OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED {
  id: number;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  production_month_id: string = '';
  production_month: string = '';
  production: string = '';
  avg_Daily_Production: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  gas_AG: string = '';
  gas_NAG: string = '';
  cOMPANY_ID: string = '';
  companyNumber: number;
}

export class OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION {
  id: number;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  current_year_Actual: string = '';
  deferment: string = '';
  forecast: string = '';
  remarks: string = '';
  cost_Barrel: string = '';
  company_Timeline: string = '';
  company_Oil: string = '';
  company_Condensate: string = '';
  company_AG: string = '';
  company_NAG: string = '';
  fiveyear_Timeline: string = '';
  fiveyear_Oil: string = '';
  fiveyear_Condensate: string = '';
  fiveyear_AG: string = '';
  fiveyear_NAG: string = '';
  did_you_carry_out_any_well_test: string = '';
  type_of_Test: string = '';
  maximum_Efficiency_Rate: string = '';
  number_of_Test_Carried_out: string = '';
  number_of_Producing_Wells: string = '';
  daily_Production: string = '';
  is_any_of_your_field_straddling: string = '';
  how_many_fields_straddle: string = '';
  straddling_Fields_OC: string = '';
  prod_Status_OC: string = '';
  straddling_Field_OP: string = '';
  company_Name_OP: string = '';
  prod_Status_OP: string = '';
  has_DPR_been_notified: string = '';
  has_the_other_party_been_notified: string = '';
  has_the_CA_been_signed: string = '';
  committees_been_inaugurated: string = '';
  participation_been_determined: string = '';
  has_the_PUA_been_signed: string = '';
  is_there_a_Joint_Development: string = '';
  has_the_UUOA_been_signed: string = '';
  actual_year: string = '';
  proposed_year: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  total_Reconciled_National_Crude_Oil_Production: string = '';
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  productionOilCondensateAGNAGUploadFilePath: string = '';
  productionOilCondensateAGNAGUFilename: string = '';
  cOMPANY_ID: string = '';
  companyNumber: number;
  field_ID: number;
}
