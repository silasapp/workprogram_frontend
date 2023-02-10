import { formatNumFromStr } from '../helpers/formatters';

export class NIGERIA_CONTENT_QUESTION {
  public id: number = 0;
  public oML_ID: string = '';
  public oML_Name: string = '';
  public companyName: string = '';
  public companyemail: string = '';
  public year_of_WP: string = '';
  public do_you_have_a_valid_Expatriate_Quota_for_your_foreign_staff: string =
    '';
  public if_NO_why: string = '';
  public is_there_a_succession_plan_in_place: string = '';
  public number_of_staff_released_within_the_year_: string = '';
  public created_by: string = '';
  public updated_by: string = '';
  public date_Created: string = '';
  public date_Updated: string = '';
  public contract_Type: string = '';
  public terrain: string = '';
  public consession_Type: string = '';
  public total_no_of_nigeria_senior_staff: string = '';
  public total_no_of_senior_staff: string = '';
  public total_no_of_top_nigerian_management_staff: string = '';
  public total_no_of_top_management_staff: string = '';
  public cOMPANY_ID: string = '';
  public companyNumber: number;

  // constructor(model?: NIGERIA_CONTENT_QUESTION) {
  //   if (!model) return;

  //   this.id = model.id;
  //   this.oML_ID = model.oML_ID;
  //   this.oML_Name = model.oML_Name;
  //   this.companyName = model.companyName;
  //   this.companyemail = model.companyemail;
  //   this.year_of_WP = model.year_of_WP;
  //   this.do_you_have_a_valid_Expatriate_Quota_for_your_foreign_staff =
  //     model.do_you_have_a_valid_Expatriate_Quota_for_your_foreign_staff;
  //   this.if_NO_why = model.if_NO_why;
  //   this.is_there_a_succession_plan_in_place =
  //     model.is_there_a_succession_plan_in_place;
  //   this.number_of_staff_released_within_the_year_ =
  //     model.number_of_staff_released_within_the_year_;
  //   this.created_by = model.created_by;
  //   this.updated_by = model.updated_by;
  //   this.date_Created = model.date_Created;
  //   this.date_Updated = model.date_Updated;
  //   this.contract_Type = model.contract_Type;
  //   this.terrain = model.terrain;
  //   this.consession_Type = model.contract_Type;
  //   this.total_no_of_nigeria_senior_staff =
  //     model.total_no_of_nigeria_senior_staff;
  //   this.total_no_of_senior_staff = model.total_no_of_senior_staff;
  //   this.total_no_of_top_nigerian_management_staff =
  //     model.total_no_of_top_nigerian_management_staff;
  //   this.total_no_of_top_management_staff =
  //     model.total_no_of_top_management_staff;
  //   this.cOMPANY_ID = model.cOMPANY_ID;
  //   this.companyNumber = model.companyNumber;
  // }
}

export class NIGERIA_CONTENT_Training {
  public id: number = 0;
  public omL_ID: string = '';
  public omL_Name: string = '';
  public companyName: string = '';
  public companyemail: string = '';
  public year_of_WP: string = '';
  public training_: string = '';
  public local_: string = '';
  public foreign_: string = '';
  public created_by: string = '';
  public updated_by: string = '';
  public date_Created: string = '';
  public date_Updated: string = '';
  public nigerian_Understudies: string = '';
  public management_Foriegn: string = '';
  public management_Local: string = '';
  public staff_Foriegn: string = '';
  public staff_Local: string = '';
  public actual_Proposed: string = '';
  public actual_Proposed_Year: string = '';
  public consession_Type: string = '';
  public contract_Type: string = '';
  public terrain: string = '';
  public companY_ID: string = '';
  public companyNumber: number;
  public expatriate_quota_positions?: string = '';
  public utilized_EQ?: string = '';
  public year: string = '';

  public set _expatriate_quota_positions(expatriate_quota_positions: string) {
    this.expatriate_quota_positions = expatriate_quota_positions?.replace(
      /,/g,
      ''
    );
  }

  public get _expatriate_quota_positions() {
    return formatNumFromStr(this.expatriate_quota_positions);
  }

  public set _utilized_EQ(utilized_EQ: string) {
    this.utilized_EQ = utilized_EQ?.replace(/,/g, '');
  }

  public get _utilized_EQ() {
    return formatNumFromStr(this.utilized_EQ);
  }

  constructor(model?: NIGERIA_CONTENT_Training) {
    if (!model) return;

    this.id = model.id;
    this.omL_ID = model.omL_ID;
    this.omL_Name = model.omL_Name;
    this.companyName = model.companyName;
    this.companyemail = model.companyemail;
    this.year_of_WP = model.year_of_WP;
    this.training_ = model.training_;
    this.local_ = model.local_;
    this.foreign_ = model.foreign_;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.expatriate_quota_positions = model.expatriate_quota_positions;
    this.utilized_EQ = model.utilized_EQ;
    this.nigerian_Understudies = model.nigerian_Understudies;
    this.management_Foriegn = model.management_Foriegn;
    this.management_Local = model.management_Local;
    this.staff_Foriegn = model.staff_Foriegn;
    this.staff_Local = model.staff_Local;
    this.actual_Proposed = model.actual_Proposed;
    this.actual_Proposed_Year = model.actual_Proposed_Year;
    this.consession_Type = model.consession_Type;
    this.contract_Type = model.contract_Type;
    this.terrain = model.terrain;
    this.companY_ID = model.companY_ID;
    this.companyNumber = model.companyNumber;
    this.year = model.year;
  }
}

export class LEGAL_LITIGATION {
  id: number = 0;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  terrain: string = '';
  contract_Type: string = '';
  consession_Type: string = '';
  anyLitigation: string = '';
  case_Number: string = '';
  names_of_Parties: string = '';
  jurisdiction: string = '';
  name_of_Court: string = '';
  summary_of_the_case: string = '';
  any_orders_made_so_far_by_the_court: string = '';
  potential_outcome: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  cOMPANY_ID: string = '';
  companyNumber: number;

  year: string = '';
}

export class LEGAL_ARBITRATION {
  id: number = 0;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  anyArbitration: string = '';
  terrain: string = '';
  contract_Type: string = '';
  consession_Type: string = '';
  case_Number: string = '';
  names_of_Parties: string = '';
  jurisdiction: string = '';
  name_of_Court: string = '';
  summary_of_the_case: string = '';
  any_orders_made_so_far_by_the_court: string = '';
  potential_outcome: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  cOMPANY_ID: string = '';
  companyNumber: number;

  year: string = '';
}

export class NIGERIA_CONTENT_Upload_Succession_Plan {
  id: number = 0;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  name_: string = '';
  understudy_: string = '';
  timeline_: string = '';
  position_Occupied_: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  actual_proposed: string = '';
  actual_Proposed_Year: string = '';
  terrain: string = '';
  contract_Type: string = '';
  consession_Type: string = '';
  cOMPANY_ID: string = '';
  companyNumber: number;
  year: string = '';

  constructor(model?: NIGERIA_CONTENT_Upload_Succession_Plan) {
    if (!model) return;

    this.id = model.id;
    this.oML_ID = model.oML_ID;
    this.oML_Name = model.oML_Name;
    this.companyName = model.companyName;
    this.companyemail = model.companyemail;
    this.year_of_WP = model.year_of_WP;
    this.name_ = model.name_;
    this.understudy_ = model.understudy_;
    this.timeline_ = model.timeline_;
    this.position_Occupied_ = model.position_Occupied_;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;
    this.date_Created = model.date_Created;
    this.date_Updated = model.date_Updated;
    this.actual_proposed = model.actual_proposed;
    this.actual_Proposed_Year = model.actual_Proposed_Year;
    this.terrain = model.terrain;
    this.contract_Type = model.contract_Type;
    this.consession_Type = model.consession_Type;
    this.cOMPANY_ID = model.cOMPANY_ID;
    this.companyNumber = this.companyNumber;
  }
}

export class STRATEGIC_PLANS_ON_COMPANY_BASES {
  id: number = 0;
  oML_ID: string = '';
  oML_Name: string = '';
  companyName: string = '';
  companyemail: string = '';
  year_of_WP: string = '';
  activities: string = '';
  n_1_Q1: string = '';
  n_1_Q2: string = '';
  n_1_Q3: string = '';
  n_1_Q4: string = '';
  n_2_Q1: string = '';
  n_2_Q2: string = '';
  n_2_Q3: string = '';
  n_2_Q4: string = '';
  n_3_Q1: string = '';
  n_3_Q2: string = '';
  n_3_Q3: string = '';
  n_3_Q4: string = '';
  n_4_Q1: string = '';
  n_4_Q2: string = '';
  n_4_Q3: string = '';
  n_4_Q4: string = '';
  n_5_Q1: string = '';
  n_5_Q2: string = '';
  n_5_Q3: string = '';
  n_5_Q4: string = '';
  created_by: string = '';
  updated_by: string = '';
  date_Created: string = '';
  date_Updated: string = '';
  contract_Type: string = '';
  terrain: string = '';
  consession_Type: string = '';
  cOMPANY_ID: string = '';
  companyNumber: number;
}

// export class LOCAL_CONTENT_AND_HUMAN_CAPACITY_DEVELOPMENT_PROGRAMMES_Expatriate
// {
//     id: number= 0;
//     oML_ID: string= '';
//     oML_Name: string= '';
//     companyName: string= '';
//     companyemail: string= '';
//     year_of_WP: string= '';
//     list_of_Expatriate_positions_that_will_expire: string= '';
//     list_of_Understudies_that_had_successfully_taken_over_from_expatriates_in_the_last_4_years: string= '';
//     expatriate_Quota_projection_for_proposed_year: string= '';
//     created_by: string= '';
//     updated_by: string= '';
//     date_Created: string= '';
//     date_Updated: string= '';
//     contract_Type: string= '';
//     terrain: string= '';
//     consession_Type: string= '';
//     companyNumber: number;
//  }
