export class budgetProposal {
  id: number = 0;
  omL_ID: string = '';
  omL_Name: string = '';
  year_of_WP: string = '';
  companyName: string = '';
  companyNumber: number = 0;
  companyemail: string = '';
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  company_ID: string = '';
  budget_for_Direct_Exploration_and_Production_Activities_Naira: string = '';
  budget_for_Direct_Exploration_and_Production_Activities_Dollars: string = '';
  budget_for_other_Activities_Naira: string = '';
  budget_for_other_Activities_Dollars: string = '';
  total_Company_Expenditure_Dollars: string = '';
}

export class capexOpex {
  id: number = 0;
  omL_ID: string = '';
  omL_Name: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  companyName: string = '';
  companyNumber: number = 0;
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  company_ID: string = '';
  item_Type: string = '';
  item_Description: string = '';
  naira: string = '';
  dollar: string = '';
  dollar_equivalent = '';
  remarks: string = '';
}

export class CAPEX {
  id: number = 0;
  omL_ID: string = '';
  omL_Name: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  companyName: string = '';
  companyNumber: number = 0;
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  company_ID: string = '';
  item_Type: string = '';

  acquisition: string = '';
  processing: string = '';
  reprocessing: string = '';
  exploratory_well_drilling: string = '';
  appraisal_well_drilling: string = '';
  development_well_drilling: string = '';
  workover_operations: string = '';
  completions: string = '';
  flowlines: string = '';
  pipelines: string = '';
  generators: string = '';
  turbines_compressors: string = '';
  buildings: string = '';
  other_equipment: string = '';
  civil_works: string = '';
  other_costs: string = '';
}

export class OPEX {
  id: number = 0;
  omL_ID: string = '';
  omL_Name: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  companyName: string = '';
  companyNumber: number = 0;
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  company_ID: string = '';
  item_Type: string = '';

  variable_cost: string = '';
  fixed_cost: string = '';
  overheads: string = '';
  repairs_and_maintenance_cost: string = '';
  general_expenses: string = '';
}
