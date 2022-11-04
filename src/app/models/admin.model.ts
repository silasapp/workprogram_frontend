export class COMPANY_CODE {
  constructor() {}

  id: number = 0;
  CompanyCode: string = '';
  companycodeFilePath: string = '';
}

export class PARAMETER_CONFIG {
  constructor() {}

  adminCategories: any[];
  dataTypes: any[];
  wellCategories: any[];
  startEndDate: any[];
  startEndDateUpload: any[];
  penalties: any[];
  emailDays: any[];
  superAdmins: any[];
  presentationCategories: any[];
  meetingRooms: any[];
}
