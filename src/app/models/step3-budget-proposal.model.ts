export class budgetProposal{
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
    budget_for_Direct_Exploration_and_Production_Activities_Naira : string = '';
    budget_for_Direct_Exploration_and_Production_Activities_Dollars : string = '';
    budget_for_other_Activities_Naira : string = '';
    budget_for_other_Activities_Dollars: string = '';
    total_Company_Expenditure_Dollars : string = '';
}

export class capexOpex{
    id : number = 0;
    omL_ID : string = '';
    omL_Name : string = '';
    companyemail : string = '';
    year_of_WP : string = '';
    companyName: string = '';
    companyNumber: number = 0;
    contract_Type : string = '';
    terrain : string = '';
    consession_Type : string = '';
    company_ID : string = '';
    item_Type : string = '';
    item_Description : string = '';
    naira : string = '';
    dollar: string = '';
    dollar_equivalent = '';
    remarks: string = '';
}