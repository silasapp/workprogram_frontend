export class CompanyDetails{
    companyId: string='';
    companyName: string='';
    companyEmail: string='';
    email: string;
    address_of_Company: string;
    contact_Person: string;
    phone_No: string;
    email_Address: string;
    name_of_MD_CEO: string;
    phone_NO_of_MD_CEO: string;
    alternate_Contact_Person: string;
    phone_No_alt: string;
    email_Address_alt: string;
}
export class ConcessionDetails{
     consession_Id: number;
     equity_distribution: string;
     concession_Held: string;
     area: string;
     contract_Type: string;
     year_of_Grant_Award: string;
     date_of_Expiration: string;
     geological_location: string;
     comment: string;
     status_: string;
     flag1: string;
     flag2: string;
     terrain: string;
     consession_Type: string;
     concession_Unique_ID: string;
     field_Name: string;

}
export class FieldDetails{
    field_ID: number;
    concession_Name: string;
    field_Name: string;
}

export class CodeFields{
    id: number;
    companycode: string;
    companyname: string;
    isactive: string;
}

export class CompanyDashboardBody {
    companyReportModels: CompanyReportModel[];
    omL_Count: number;
    opL_Count: number;
    no_Of_ProducingFields_Count: number;
}

export class DashboardGasBudgetAndReserveBody {
  reserveOilCondensate: number;
  reserveAGNAG: number;
  prodCost: number;
}

export class CompanyReportModel {
    concessionName: string;
    totalNetProduction: number;
    totalReserves: number;
}
