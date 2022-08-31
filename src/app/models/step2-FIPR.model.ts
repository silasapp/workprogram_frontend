export class FIELD_DEVELOPMENT_PLAN
{
  id : number = 0;
  omL_ID :  string ='';
  omL_Name : string ='';
  companyName: string ='';
  companyemail: string ='';
  year_of_WP: string='';
  how_many_fields_have_FDP: string ='';
  status: string ='';
  list_all_the_field_with_FDP: string ='';
  which_fields_do_you_plan_to_submit_an_FDP: string ='';
  how_many_fields_have_approved_FDP: string ='';
  number_of_wells_proposed_in_the_FDP: string ='';
  no_of_wells_drilled_in_current_year: string='';
  proposed_number_of_wells_from_approved_FDP: string='';
  processing_Fees_paid: string='';
  actual_year: string='';
  proposed_year: string='';
  created_by: string='';
  updated_by: string='';
  date_Created: string='';
  date_Updated: string='';
  consession_Type: string='';
  terrain: string='';
  contract_Type: string='';
  how_many_fields_in_concession: string='';
  noof_Producing_Fields: string='';
  uploaded_approved_FDP_Document: string='';
  are_they_oil_or_gas_wells: string='';
  fdpDocumentFilename: string='';
  companY_ID: string='';
  companyNumber: number;
}



export class FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE
{
  id: number;
  omL_ID: string='';
  omL_Name: string='';
  companyName: string='';
  companyemail: string='';
  year_of_WP: string='';
  proposed_Development_well_name: string='';
  field_Name: string='';
  oil: string='';
  gas: string='';
  condensate: string='';
  created_by: string='';
  updated_by: string='';
  date_Created: string='';
  date_Updated: string='';
  consession_Type: string='';
  companY_ID: string='';
  companyNumber: number;
}

export class FIELD_DEVELOPMENT_FIELDS_TO_SUBMIT_FDP
{
  id: number;
  omL_ID: string='';
  omL_Name:string='';
  companyName:string='';
  companyemail:string='';
  year_of_WP: string='';
  field_Name:string='';
  development_Plan_Status:string='';
  created_by: string='';
  updated_by:string='';
  date_Created:string='';
  date_Updated: string='';
  consession_Type:string='';
  companY_ID: string='';
  companyNumber:number;
 }

 export class FIELD_DEVELOPMENT_FIELD_AND_STATUS
 {
    id: number;
    omL_ID: string='';
    omL_Name: string='';
    companyName: string='';
    companyemail: string='';
    year_of_WP: string='';
    field_Name: string='';
    development_Plan_Status: string='';
    created_by: string='';
    updated_by:string='';
    date_Created: string='';
    date_Updated: string='';
    consession_Type: string='';
    companY_ID: string='';
    companyNumber: number;
}

export class WORKOVER_COMPLETION_JOBS
{
    id:number;
    omL_ID: string='';
    omL_Name: string='';
    companyName: string='';
    companyemail: string='';
    year_of_WP: string='';
    current_year_Actual_Number_data: string='';
    proposed_year_data: string='';
    current_year_Budget_Allocation: string='';
    remarks: string='';
    processing_Fees_paid: string='';
    do_you_have_approval_for_the_workover_recompletion: string='';
    actual_year: string='';
    proposed_year: string='';
    created_by: string='';
    updated_by: string='';
    date_Created: string='';
    date_Updated: string='';
    budeget_Allocation_NGN: string='';
    budeget_Allocation_USD: string='';
    consession_Type: string='';
    terrain: string='';
    contract_Type: string='';
    quater: string='';
    oil_or_gas_wells: string='';
    companY_ID: string='';
    companyNumber: number;
}

export class INITIAL_WELL_COMPLETION_JOB
{
    id: number;
    omL_ID: string='';
    omL_Name: string='';
    companyName: string='';
    companyemail: string='';
    year_of_WP: string='';
    do_you_have_approval_to_complete_the_well: string='';
    current_year_Actual_Number: string='';
    current_year_Budget_Allocation: string='';
    proposed_year_data: string='';
    processing_Fees_paid: string='';
    remarks: string='';
    actual_year: string='';
    proposed_year: string='';
    created_by: string='';
    updated_by: string='';
    date_Created: string='';
    date_Updated: string='';
    budeget_Allocation_NGN: string='';
    budeget_Allocation_USD: string='';
    consession_Type: string='';
    contract_Type: string='';
    terrain: string='';
    quater: string='';
    oil_or_gas_wells: string='';
    actual_Completion_Date: string='';
    proposed_Completion_Date: string='';
    companY_ID: string='';
    companyNumber: number;
}
export class GAS_PRODUCTION_ACTIVITY
{
  id: number=0;
  omL_ID: string='';
  omL_Name: string='';
  companyName: string='';
  companyemail: string='';
  year_of_WP: string='';
  current_Actual_Year: string='';
  utilized: string='';
  flared: string='';
  forecast_: string='';
  remarks_: string='';
  how_many_NAG_fields_have_approved_Gas_FDP: string='';
  gas_wells_drilled_and_planned: string='';
  gas_production_and_flare_historical_performance: string='';
  gas_plant_capacity: string='';
  ongoing_and_planned_Gas_plant_projects: string='';
  domestic_gas_obligation: string='';
  planned_projects_for_domestic_supply: string='';
  gas_Field_Development_Plan_Approval: string='';
  gas_wells_drilled_and_wells_planned: string='';
  aG_NAG_and_Condensate_in_place_volumes_and_Reserves_Reserves_for_reservoirs_and_Fields: string='';
  maturation_plans_for_leads_and_prospects_leading_to_reserves_growth: string='';
  current_production_status_for_all_Gas_and_condensate_Reservoirs: string='';
  current_gas_production_utilisation_and_Flare_volumes: string='';
  sources_of_Gas_utilisation_should_be_clearly_stated: string='';
  gas_Production_and_flare_historical_Performance_5_years_Performance_and_Plan: string='';
  substantiate_flare_reduction_methods_with_projects: string='';
  annotate_clearly_reasons_for_increase_or_reduction_in_Gas_production_utilisation_and_flare_profiles: string='';
  current_pressures_for_Gas_and_condensate_Reservoirs: string='';
  production_forecast_for_all_Gas_and_condensate_reservoirs: string='';
  gas_compositional_Analysis: string='';
  feed_gas_Volumes_into_the_Processing_Facility: string='';
  gas_Plant_Capacity_NEW: string='';
  plant_Utilization_Capacity: string='';
  plant_maintenance_activities: string='';
  ongoing_and_planned_Gas_plant_projects_NEW: string='';
  lnG_and_NGLs_Production_forecast: string='';
  custody_Transfer_status: string='';
  license_Renewal_Status_for_all_Gas_plants: string='';
  pipeline_license_renewal_staus: string='';
  domestic_Gas_Supply_DSO: string='';
  projects_planned_for_Domestic_supply_Gas_to_power_industries_etc: string='';
  actual_year: string='';
  proposed_year: string='';
  contract_Type: string='';
  terrain: string='';
  penaltyfeepaid: string='';
  amount_Paid: string='';
  consession_Type: string='';
  proposed_production: string='';
  proposed_utilization: string='';
  proposed_flaring: string='';
  gas_flare_Royalty_payment: string='';
  gas_Sales_Royalty_Payment: string='';
  no_of_gas_well_planned: string='';
  no_of_gas_well_drilled: string='';
  is_there_a_gas_plant: string='';
  no_of_ongoing_projects: string='';
  no_of_plannned_projects: string='';
  is_there_a_license_to_operate_a_gas_plant: string='';
  domestic_Gas_obligation_met: string='';
  has_annual_NDR_subscription_fee_been_paid: string='';
  when_was_the_date_of_your_last_NDR_submission: Date;
  upload_NDR_payment_receipt: File;
  are_you_up_to_date_with_your_NDR_data_submission: string='';
  ndrFilename: string='';
  number_of_gas_wells_completed: string='';
  number_of_gas_wells_tested: string='';
  companY_ID: string='';
  companyNumber: number;

}



export class OIL_CONDENSATE_PRODUCTION_ACTIVITY
 {
     id: number;
     omL_ID: string='';
     omL_Name: string='';
     companyName: string='';
     companyemail: string='';
     year_of_WP: string='';
     current_year_Actual: string='';
     deferment: string='';
     forecast: string='';
     remarks: string='';
     cost_Barrel: string='';
     company_Timeline: string='';
     company_Oil: string='';
     company_Condensate: string='';
     company_AG: string='';
     company_NAG: string='';
     fiveyear_Timeline: string='';
     fiveyear_Oil: string='';
     fiveyear_Condensate: string='';
     fiveyear_AG: string='';
     fiveyear_NAG: string='';
     did_you_carry_out_any_well_test: string='';
     type_of_Test: string='';
     maximum_Efficiency_Rate: string='';
     number_of_Test_Carried_out: string='';
     number_of_Producing_Wells: string='';
     daily_Production_: string='';
     is_any_of_your_field_straddling: string='';
     how_many_fields_straddle: string='';
     straddling_Fields_OC: string='';
     prod_Status_OC: string='';
     straddling_Field_OP: string='';
     company_Name_OP: string='';
     prod_Status_OP: string='';
     has_DPR_been_notified: string='';
     has_the_other_party_been_notified: string='';
     has_the_CA_been_signed: string='';
     committees_been_inaugurated: string='';
     participation_been_determined: string='';
     has_the_PUA_been_signed: string='';
     is_there_a_Joint_Development: string='';
     has_the_UUOA_been_signed: string='';
     actual_year: string='';
     proposed_year: string='';
     created_by: string='';
     updated_by: string='';
     date_Created: string='';
     date_Updated: string='';
     total_Reconciled_National_Crude_Oil_Production: string='';
     contract_Type: string='';
     terrain: string='';
     consession_Type: string='';
     oil_Royalty_Payment: string='';
     straddle_field_producing: string='';
     what_concession_field_straddling: string='';
     gas_AG: string='';
     gas_NAG: string='';
     companY_ID: string='';
     companyNumber: number;
     domestic_Gas_obligation_met: any;
 }

 export class OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION
 {

    id: number;
    omL_ID:  string ='';
    omL_Name:  string ='';
    companyName:  string ='';
    companyemail:  string ='';
    year_of_WP:  string ='';
    current_year_Actual:  string ='';
    deferment:  string ='';
    forecast:  string ='';
    remarks:  string ='';
    cost_Barrel:  string ='';
    company_Timeline:  string ='';
    company_Oil:  string ='';
    company_Condensate:  string ='';
    company_AG:  string ='';
    company_NAG:  string ='';
    fiveyear_Timeline:  string ='';
    fiveyear_Oil:  string ='';
    fiveyear_Condensate:  string ='';
    fiveyear_AG:  string ='';
    fiveyear_NAG:  string ='';
    did_you_carry_out_any_well_test:  string ='';
    type_of_Test:  string ='';
    maximum_Efficiency_Rate:  string ='';
    number_of_Test_Carried_out:  string ='';
    number_of_Producing_Wells:  string ='';
    daily_Production_:  string ='';
    is_any_of_your_field_straddling:  string ='';
    how_many_fields_straddle:  string ='';
    straddling_Fields_OC:  string ='';
    prod_Status_OC:  string ='';
    straddling_Field_OP:  string ='';
    company_Name_OP:  string ='';
    prod_Status_OP:  string ='';
    has_DPR_been_notified:  string ='';
    has_the_other_party_been_notified:  string ='';
    has_the_CA_been_signed:  string ='';
    committees_been_inaugurated:  string ='';
    participation_been_determined:  string ='';
    has_the_PUA_been_signed:  string ='';
    is_there_a_Joint_Development:  string ='';
    has_the_UUOA_been_signed:  string ='';
    actual_year:  string ='';
    proposed_year:  string ='';
    created_by:  string ='';
    updated_by:  string ='';
    date_Created:  string ='';
    date_Updated:  string ='';
    total_Reconciled_National_Crude_Oil_Production:  string ='';
    contract_Type:  string ='';
    terrain:  string ='';
    consession_Type:  string ='';
    oil_Royalty_Payment:  string ='';
    straddle_field_producing:  string ='';
    what_concession_field_straddling:  string ='';
    puaUploadFilePath:  string ='';
    uuoaUploadFilePath:  string ='';
    puaUploadFilename:  string ='';
    uuoaUploadFilename:  string ='';
    companY_ID:  string ='';
    companyNumber: number;
    gas_AG: string;
 }

 export class RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE
 {
  id: number;
  omL_ID: string ='';
  omL_Name: string ='';
  companyName: string ='';
  companyemail: string ='';
  year_of_WP: string ='';
  company_Reserves_Year: string ='';
  company_Reserves_Oil: string ='';
  company_Reserves_Condensate: string ='';
  company_Reserves_AG: string ='';
  company_Reserves_NAG: string ='';
  company_Reserves_AnnualOilProduction: string ='';
  flaG1: string ='';
  flaG2: string ='';
  created_by: string ='';
  updated_by: string ='';
  date_Created:  string ='';
  date_Updated:  string ='';
  consession_Type:  string ='';
  terrain: string ='';
  contract_Type: string ='';
  company_Reserves_AnnualGasProduction: string ='';
  company_Reserves_AnnualCondensateProduction: string ='';
  company_Reserves_AnnualGasAGProduction: string ='';
  company_Reserves_AnnualGasNAGProduction:  string ='';
  companY_ID: string ='';
  companyNumber: number;
 }

 export class RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection
 {
  id: number;
  omL_ID: string ='';
  omL_Name:  string ='';
  companyName:  string ='';
  companyemail:  string ='';
  year_of_WP:  string ='';
  fiveyear_Projection_Year:  string ='';
  fiveyear_Projection_Oil:  string ='';
  fiveyear_Projection_Condensate:  string ='';
  fiveyear_Projection_AG:  string ='';
  fiveyear_Projection_NAG:  string ='';
  created_by:  string ='';
  updated_by:  string ='';
  date_Created:  string ='';
  date_Updated:  string ='';
  terrain:  string ='';
  contract_Type:  string ='';
  consession_Type:  string ='';
  companY_ID:  string ='';
  companyNumber: number;
 }



  export class RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE
    {
     id: number;
     oML_ID :  string ='';
     oML_Name :  string ='';
     companyName :  string ='';
     companyemail :  string ='';
     year_of_WP :  string ='';
     reserves_Decline_Was_there_a_decline_in_reserve :  string ='';
     reserves_Decline_Reason_for_Decline :  string ='';
     reserves_Decline_Oil :  string ='';
     reserves_Decline_Condensate :  string ='';
     reserves_Decline_AG :  string ='';
     reserves_Decline_NAG :  string ='';
     created_by :  string ='';
     updated_by :  string ='';
     date_Created :  string ='';
     date_Updated :  string ='';
     terrain :  string ='';
     consession_Type :  string ='';
     contract_Type :  string ='';
     cOMPANY_ID :  string ='';
     companyNumber: number;
    }

  export class RESERVES_UPDATES_LIFE_INDEX
    {
         id: number;
         oML_ID:  string ='';
         oML_Name:  string ='';
         CompanyName:  string ='';
         companyemail:  string ='';
         year_of_WP:  string ='';
         oIL:  string ='';
         cONDENSATE:  string ='';
         nAG:  string ='';
         aG:  string ='';
         created_by:  string ='';
         updated_by:  string ='';
         date_Created:  string ='';
         cate_Updated:  string ='';
         consession_Type:  string ='';
         cOMPANY_ID:  string ='';
         companyNumber: number;
    }

    export class RESERVES_UPDATES_DEPLETION_RATE
    {
        id: number;
        oML_ID: string ='';
        oML_Name: string ='';
        companyName: string ='';
        companyemail: string ='';
        year_of_WP: string ='';
        oIL: string ='';
        cONDENSATE: string ='';
        nAG: string ='';
        aG: string ='';
        created_by: string ='';
        updated_by: string ='';
        date_Created: string ='';
        date_Updated: string ='';
        consession_Type: string ='';
        cOMPANY_ID: string ='';
        companyNumber: number;
    }

    export class RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION
    {
         id: number;
         oML_ID:  string ='';
         oML_Name:  string ='';
         companyName:  string ='';
         companyemail:  string ='';
         year_of_WP:  string ='';
         company_Annual_Year:  string ='';
         company_Annual_Oil:  string ='';
         company_Annual_Condensate:  string ='';
         company_Annual_AG:  string ='';
         company_Annual_NAG:  string ='';
         created_by:  string ='';
         updated_by:  string ='';
         date_Created:  string ='';
         date_Updated:  string ='';
         terrain:  string ='';
         contract_Type:  string ='';
         consession_Type:  string ='';
         cOMPANY_ID:  string ='';
         companyNumber: number;
    }

    export class RESERVES_UPDATES_OIL_CONDENSATE_Fiveyear_Projection
    {
        id: number
        oML_ID :  string ='';
        oML_Name :  string ='';
        companyName :  string ='';
        companyemail :  string ='';
        year_of_WP :  string ='';
        fiveyear_Projection_Year :  string ='';
        fiveyear_Projection_Oil :  string ='';
        fiveyear_Projection_Condensate :  string ='';
        fiveyear_Projection_AG :  string ='';
        fiveyear_Projection_NAG :  string ='';
        created_by :  string ='';
        updated_by :  string ='';
        date_Created :  string ='';
        date_Updated :  string ='';
        terrain :  string ='';
        contract_Type :  string ='';
        consession_Type :  string ='';
        cOMPANY_ID :  string ='';
        companyNumber: number;
    }

    export class RESERVES_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE
    {
      id: number;
      oML_ID: string ='';
      oML_Name:string ='';
      companyName:  string ='';
      companyemail:  string ='';
      year_of_WP:  string ='';
      company_Reserves_Year:  string ='';
      company_Reserves_Oil:  string ='';
      company_Reserves_Condensate:  string ='';
      company_Reserves_AG:  string ='';
      company_Reserves_NAG:  string ='';
      company_Reserves_AnnualOilProduction:  string ='';
      fLAG1:  string ='';
      fLAG2:  string ='';
      created_by:  string ='';
      updated_by:  string ='';
      date_Created:  string ='';
      date_Updated:  string ='';
      consession_Type:  string ='';
      terrain:  string ='';
      contract_Type:  string ='';
      company_Reserves_AnnualGasProduction:  string ='';
      company_Reserves_AnnualCondensateProduction:  string ='';
      company_Reserves_AnnualGasAGProduction:  string ='';
      company_Reserves_AnnualGasNAGProduction:  string ='';
      cOMPANY_ID:  string ='';
      companyNumber:  string ='';
    }

    export class RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition
    {
      id: number;
      oML_ID: string ='';
      oML_Name: string ='';
      companyName: string ='';
      companyemail: string ='';
      year_of_WP: string ='';
      reserves_Addition_Was_there_any_Reserve_Addition: string ='';
      reserves_Addition_Reason_for_Addition: string ='';
      reserves_Addition_Oil: string ='';
      reserves_Addition_Condensate: string ='';
      reserves_Addition_AG: string ='';
      reserves_Addition_NAG: string ='';
      created_by: string ='';
      updated_by: string ='';
      date_Created: string ='';
      date_Updated: string ='';
      contract_Type: string ='';
      consession_Type: string ='';
      terrain: string ='';
      cOMPANY_ID: string ='';
      companyNumber: string ='';
    }

    export class RESERVES_UPDATES_OIL_CONDENSATE_MMBBL
    {
        id: number;
        oML_ID: string ='';
        oML_Name: string ='';
        companyName: string ='';
        companyemail: string ='';
        year_of_WP: string ='';
        reserves_as_at_MMbbl_P1: string ='';
        additional_Reserves_as_at_: string ='';
        total_Production_: string ='';
        reserves_as_at_MMbbl: string ='';
        created_by: string ='';
        updated_by: string ='';
        date_Created: string ='';
        date_Updated: string ='';
        reserves_as_at_MMbbl_condensate: string ='';
        reserves_as_at_MMbbl_gas: string ='';
        consession_Type: string ='';
        contract_Type: string ='';
        terrain: string ='';
        companyNumber: number;
    }

    export class OIL_CONDENSATE_PRODUCTION_ACTIVITy
    {
        id: number;
        oML_ID: string ='';
        oML_Name: string ='';
        companyName: string ='';
        companyemail: string ='';
        year_of_WP: string ='';
        current_year_Actual: string ='';
        deferment: string ='';
        forecast: string ='';
        remarks: string ='';
        cost_Barrel: string ='';
        company_Timeline: string ='';
        company_Oil: string ='';
        company_Condensate: string ='';
        company_AG: string ='';
        company_NAG: string ='';
        fiveyear_Timeline: string ='';
        fiveyear_Oil: string ='';
        fiveyear_Condensate: string ='';
        fiveyear_AG: string ='';
        fiveyear_NAG: string ='';
        did_you_carry_out_any_well_test: string ='';
        type_of_Test: string ='';
        maximum_Efficiency_Rate: string ='';
        number_of_Test_Carried_out: string ='';
        number_of_Producing_Wells: string ='';
        daily_Production_: string ='';
        is_any_of_your_field_straddling: string ='';
        how_many_fields_straddle: string ='';
        straddling_Fields_OC: string ='';
        prod_Status_OC: string ='';
        straddling_Field_OP: string ='';
        company_Name_OP: string ='';
        prod_Status_OP: string ='';
        has_DPR_been_notified: string ='';
        has_the_other_party_been_notified: string ='';
        has_the_CA_been_signed: string ='';
        committees_been_inaugurated: string ='';
        participation_been_determined: string ='';
        has_the_PUA_been_signed: string ='';
        is_there_a_Joint_Development: string ='';
        has_the_UUOA_been_signed: string ='';
        actual_year: string ='';
        proposed_year: string ='';
        created_by: string ='';
        updated_by: string ='';
        date_Created: string ='';
        date_Updated: string ='';
        total_Reconciled_National_Crude_Oil_Production: string ='';
        contract_Type: string ='';
        terrain: string ='';
        consession_Type: string ='';
        oil_Royalty_Payment: string ='';
        straddle_field_producing: string ='';
        what_concession_field_straddling: string ='';
        gas_AG: string ='';
        gas_NAG: string ='';
        cOMPANY_ID: string ='';
        companyNumber: number;
    }

    export class NDR
    {
        id: number;
        oML_ID: string ='';
        oML_Name : string ='';
        companyName: string ='';
        companyemail: string ='';
        cOMPANY_ID: string ='';
        year_of_WP: string ='';
        has_annual_NDR_subscription_fee_been_paid: string ='';
        when_was_the_date_of_your_last_NDR_submission: string ='';
        upload_NDR_payment_receipt: string ='';
        are_you_up_to_date_with_your_NDR_data_submission: string ='';
        nDRFilename: string ='';
        created_by: string ='';
        updated_by: string ='';
        date_Created: string ='';
        date_Updated: string ='';
        contract_Type: string ='';
        terrain: string ='';
        consession_Type: string ='';
        companyNumber:number;
    }

     export class OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity
    {
        id: number;
        oML_ID:string ='';
        oML_Name:string ='';
        companyName:string ='';
        companyemail:string ='';
        year_of_WP:string ='';
        production_month_id:string ='';
        production_month:string ='';
        production:string ='';
        avg_Daily_Production:string ='';
        created_by:string ='';
        updated_by:string ='';
        date_Created:string ='';
        date_Updated:string ='';
        contract_Type:string ='';
        terrain:string ='';
        consession_Type:string ='';
        gas_AG:string ='';
        gas_NAG:string ='';
        cOMPANY_ID:string ='';
        companyNumber:string ='';
    }

    export class OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED
    {
        id: number;
        oML_ID:string ='';
        oML_Name:string ='';
        companyName:string ='';
        companyemail:string ='';
        year_of_WP:string ='';
        production_month_id:string ='';
        production_month:string ='';
        production:string ='';
        avg_Daily_Production:string ='';
        created_by:string ='';
        updated_by:string ='';
        date_Created:string ='';
        date_Updated:string ='';
        contract_Type:string ='';
        terrain:string ='';
        consession_Type:string ='';
        gas_AG:string ='';
        gas_NAG:string ='';
        cOMPANY_ID:string ='';
        companyNumber:number;
    }

    export class OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION
    {
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



