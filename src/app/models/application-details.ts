import { CompanyDetails, ConcessionDetails, FieldDetails } from "./company-details";

export class ApplicationDetails{
    application: Application;
    concession: ConcessionDetails;
    field: FieldDetails;
    company: CompanyDetails;
    document: SubmittedDocument;
    staff : Staff = {} as Staff;
    application_History : ApplicationHistory = {} as ApplicationHistory;
}

    export class Application
    {
         id : number;
         referenceNo : string;
         companyID : string;
         companyName : string;
         fieldName : string;
         concessionName : string;
         concessionID : string;
         fieldID : string;
         categoryID : string;
         yearOfWKP : string;
         status : string;
         paymentStatus : string;
         currentDesk : string;
         currentPermit : string;
         submitted : string;
         approvalRef : string;
         createdAt : Date;
         submittedAt : Date;
    }

    export class Staff
    {
    staff_Name : string;
    staff_Email : string;
    staff_SBU : string;
    staff_Role : string;
    sort: number;
    desk_ID: number
    }

    export class ApplicationHistory {
        
    staff_Name : string;
    staff_Email: string;
    staff_SBU: string;
    comment : string;
    status : string;
    date : Date;
}
export class SubmittedDocument
{
    appID : number;
    compElpsDocID : string;
    yearOfWKP : number;
    docSource : string;
    documentName : string;
    documentCategory : string;
    createdBy : Date;
    createdAt : Date;
    updatedAt : Date;
}
export class DashboardModel{
    deskCount: number;
    allApplicationsCount: number;
    allApprovalsCount: number;
    allProcessingCount: number;
}