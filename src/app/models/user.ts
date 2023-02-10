export class User {
  contractType: string;
  companyId: string;
  companyName: string;
  companyEmail: string;
  companyNumber: number;
  name: string;
  pass: string;
  token?: string;
  code?: string;
}

export class WorkData {
  wkpYear: string;
  wkpConcession: string;
  wkpField: string;
}
