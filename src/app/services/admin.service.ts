import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators';
import { AuthenticationService, GenericService } from '.';
import { ConcessionDetails, FieldDetails } from '../models/company-details';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private num = 2;

  constructor(private http: HttpClient, private gen: GenericService) {}

  getStaffFromElps() {
    return this.http.get<any>(`${environment.apiUrl}/admin/GET_ELPS_STAFF`);
  }

  getAllStaff() {
    return this.http.get<any>(`${environment.apiUrl}/admin/GET_USERS`);
  }

  getDashboardStuff() {
    return this.http.get<any>(
      `${environment.apiUrl}/application/getDashboardStuff`
    );
  }

  fetch(url) {
    return this.http.get<any>(`${environment.apiUrl}/admin/${url}`).pipe(
      retry(this.num),
      map((response) => {
        response.data = this.gen.lowerArray(response.data);
        return response;
      })
    );
  }

  fetchparconfig() {
    return this.http
      .get<any>(`${environment.apiUrl}/admin/get_parametersconfiguration`)
      .pipe(
        retry(this.num),
        map((response) => {
          //response.data = this.gen.lowerArray(response.data);
          return response;
        })
      );
  }

  addDataDuration_pw(e: any, action: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/admin/admin_start_end_dates`,
        {
          start_date: e.start_date,
          end_date: e.end_date,
        },
        { params: { _action: action } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          //response.data = this.gen.lowerArray(response.data);
          return response;
        })
      );
  }

  addDataDuration_duw(e: any, action: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/admin/admin_start_end_date_data_uploads`,
        {
          start_date: e.start_date,
          end_date: e.end_date,
        },
        { params: { _action: action } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          //response.data = this.gen.lowerArray(response.data);
          return response;
        })
      );
  }

  meetingRoom(e: any, action: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/admin/admin_meeting_rooms`,
        { meeting_room: e.meeting_rooms },
        { params: { _action: action } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  contractType(e: any, action: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/admin/admin_categories`,
        { categories: e.categories },
        { params: { _action: action } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  emailDuration(e: any, action: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/admin/admin_email_days`,
        { dayS_: e.dayS_ },
        { params: { _action: action } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  DataTypes(e: any, action: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/data_types`,
        { categories: e.datatype },
        { params: { _action: action } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  addPenalities(e: any, action: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/admin_penalties`,
        { no_show: e.no_show, no_submission: e.no_submission },
        { params: { _action: action } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  PresentationCategories(e: any, action: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/admin_presentation_categories`,
        { categories: e.categories },
        { params: { _action: action } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  WellCategories(e: any, action: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/admin_well_categories`,
        { welltype: e.welltype },
        { params: { _action: action } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  SuperAdmin(e: any, action: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/roles_super_admins`,
        { email_: e.email_ },
        { params: { _action: action } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  getUser(id_: string) {
    var id = parseInt(id_);
    return this.http
      .get<any>(`${environment.apiUrl}/admin/get_updateuser`, {
        params: { id: id },
      })
      .pipe(
        retry(this.num),
        map((response) => {
          //response.data = this.gen.lowerArray(response.data);
          return response;
        })
      );
  }

  getUsers() {
    return this.http.get<any>(`${environment.apiUrl}/admin/get_users`).pipe(
      retry(this.num),
      map((response) => {
        //response.data = this.gen.lowerArray(response.data);
        return response;
      })
    );
  }

  getConcessions(year: any) {
    return this.http
      .get<any>(`${environment.apiUrl}/admin/get_concessions`, {
        params: { year: year },
      })
      .pipe(
        retry(this.num),
        map((response) => {
          //response.data = this.gen.lowerArray(response.data);
          return response;
        })
      );
  }

  updateUser(e: any, id_: any) {
    var id = parseInt(id_);
    return this.http
      .put<any>(`${environment.apiUrl}/admin/activate_deactivate`, '', {
        params: { status: e.statuS_, id: id },
      })
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  addUser(e: any) {
    debugger;
    return this.http
      .post<any>(`${environment.apiUrl}/admin/create_user`, {
        email: e.email,
        companY_NAME: e.companY_NAME,
        passwords: e.passwords,
        name: e.name,
        designation: e.designation,
        phonE_NO: e.phonE_NO,
        companY_ID: e.companY_ID,
        rolE_ID: e.rolE_ID,
        sbU_ID: e.sbU_ID,
      })
      .pipe(
        retry(this.num),
        map((response) => {
          debugger;
          return response;
        })
      );
  }
  addConcession(e: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/admin/create_concession`, {
        companYNAME: e.companY_NAME,
        concession_Held: e.concession_Held,
        equity_distribution: e.equity_distribution,
        area: e.area,
        contract_Type: e.contract_Type,
        year_of_Grant_Award: e.year_of_Grant_Award,
        date_of_Expiration: e.date_of_Expiration,
        geological_location: e.geological_location,
        year: e.year,
        comment: e.comment,
        consession_Type: e.consession_Type,
        concession_Unique_ID: e.concession_Unique_ID,
      })
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  addCompanyConcession(e: any) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/post_admin_concessions_information`,
        {}
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  Post_ConcessionDetails(conbody: ConcessionDetails, id, actionToDo) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/post_admin_concessions_information`,
        conbody,
        { params: { id, actionToDo } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  Post_FieldDetails(conbody: FieldDetails, id, actionToDo) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/workprogramme/post_company_field`,
        conbody,
        { params: { id, actionToDo } }
      )
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  getCompanyConcessions() {
    return this.http
      .get<any>(`${environment.apiUrl}/workprogramme/get_field_concessions`)
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  getConcessionFields() {
    return this.http
      .get<any>(`${environment.apiUrl}/workprogramme/get_concessions_field`, {
        params: { companyNumber: 0 },
      })
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  updateCompanyCode(_id: any, _name: any, _status: any) {
    var id = parseInt(_id);
    return this.http
      .put<any>(`${environment.apiUrl}/admin/update_company_codes`, '', {
        params: { id: id, name: _name, status: _status },
      })
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  uploadCompanyCode(conbody: FormData) {
    return this.http
      .post<any>(`${environment.apiUrl}/admin/upload_companycode`, conbody)
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  codefetch(url) {
    return this.http.get<any>(`${environment.apiUrl}/admin/${url}`).pipe(
      retry(this.num),
      map((response) => {
        response.data = this.gen.lowerArray(response.data);
        return response;
      })
    );
  }

  getSBUReport(appID) {
    return this.http.get<any>(
      `${environment.apiUrl}/application/getsbu_report`,
      { params: { appID } }
    );
  }

  getSBU() {
    return this.http.get<any>(`${environment.apiUrl}/application/getSBUs`);
  }

  getRoles() {
    return this.http.get<any>(`${environment.apiUrl}/application/getroles`);
  }

  addSBU(name: string, code: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/application/createSBU`,
      {},
      { params: { name, code } }
    );
  }

  addRole(name: string, description: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/application/createRole`,
      {},
      { params: { name, description } }
    );
  }

  editSBU(id: number, name: string, code: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/application/editSBU`,
      {},
      { params: { id, name, code } }
    );
  }

  editRole(id: number, name: string, description: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/application/editRole`,
      {},
      { params: { id, name, description } }
    );
  }

  deleteSBU(id: number) {
    return this.http.post<any>(
      `${environment.apiUrl}/application/deleteSBU`,
      {},
      { params: { id } }
    );
  }

  deleteRole(id: number) {
    return this.http.post<any>(
      `${environment.apiUrl}/application/deleteRole`,
      {},
      { params: { id } }
    );
  }
}
