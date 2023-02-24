import { SBUSelectTableDetails } from '../application/process-application/send-back-form/send-back-form.component';
import { ISBU } from '../process-flow-configuration/application-process-flow-configuration/application-process-flow-configuration.component';
import {
  CompanyDetails,
  ConcessionDetails,
  FieldDetails,
} from './company-details';

export class ApplicationDetails {
  application: Application;
  concession: ConcessionDetails;
  field: FieldDetails;
  company: CompanyDetails;
  document: SubmittedDocument;
  staff: Staff = {} as Staff;
  application_History: ApplicationHistory = {} as ApplicationHistory;
  sbU_TableDetails: SBUSelectTableDetails[];
  sbu: ISBU[];
}

export class Application {
  id: number;
  referenceNo: string;
  companyID: string;
  companyName: string;
  fieldName: string;
  concessionName: string;
  concessionID: string;
  fieldID: string;
  categoryID: string;
  yearOfWKP: string;
  status: string;
  paymentStatus: string;
  currentDesk: string;
  currentPermit: string;
  submitted: string;
  approvalRef: string;
  createdAt: Date;
  submittedAt: Date;
}

export class Staff {
  id: number;
  staff_Name: string;
  staff_Email: string;
  staff_SBU: string;
  staff_Role: string;
  sort: number;
  desk_ID: number;
  lastName: string;
  firstName: string;
  email: string;
  phoneNo: string;
  userType: string;
  role: string;
  status: boolean;

  activeStatus: boolean;
  adminCompanyInfo_ID: number;
  createdAt: string;
  createdBy: string;
  deleteStatus: string;
  deletedAt: string;
  deletedBy: string;
  // firstName: string;
  // lastName: string;
  locationID: string;
  roleID: number;
  signatureName: string;
  signaturePath: string;
  staffElpsID: string;
  staffEmail: string;
  staffID: number;
  // staff_SBU: number;
  updatedAt: string;
  updatedBy: string;

  status_: any;
}

export class ApplicationHistory {
  staff_Name: string;
  staff_Email: string;
  staff_SBU: string;
  comment: string;
  status: string;
  date: Date;
}
export class SubmittedDocument {
  appID: number;
  compElpsDocID: string;
  yearOfWKP: number;
  docSource: string;
  documentName: string;
  documentCategory: string;
  createdBy: Date;
  createdAt: Date;
  updatedAt: Date;
}
export class DashboardModel {
  deskCount: number;
  allApplicationsCount: number;
  allApprovalsCount: number;
  allProcessingCount: number;
}

export interface IAuthData {
  code?: number;
  companyEmail: string;
  companyId: string;
  companyName: string;
  companyNumber: string;
  contractType: string;
  name: string;
  pass: string;
  token?: string;
}

export interface IElpsUser {
  elpsId: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phoneNo: string;
}
