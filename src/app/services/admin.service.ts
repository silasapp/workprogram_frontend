import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators'
import { AuthenticationService, GenericService } from ".";
import { ConcessionDetails, FieldDetails } from "../models/company-details";


@Injectable({ providedIn: 'root' })
export class AdminService {
  private num = 2;



  constructor(private http: HttpClient, private gen: GenericService) { }


  fetch(url) {
    return this.http.get<any>(`${environment.apiUrl}/admin/${url}`)
      .pipe(retry(this.num),
        map((response) => {
        
          response.data = this.gen.lowerArray(response.data);
          return response
        })
      )
  }


  fetchparconfig() {
    return this.http.get<any>(`${environment.apiUrl}/admin/get_parametersconfiguration`)
      .pipe(retry(this.num),
        map((response) => {
          
          //response.data = this.gen.lowerArray(response.data);
          return response
        })
      )
  }

  addDataDuration_pw(dataDuration_pw_FormBody: FormData, action: string) {
    debugger;
    return this.http.post<any>(`${environment.apiUrl}/admin/get_parametersconfiguration`, dataDuration_pw_FormBody, { params: { action: action } })
      .pipe(retry(this.num),
        map((response) => {

          //response.data = this.gen.lowerArray(response.data);
          return response
        })
      )
  }
  

  getUser(id_: string) {
    var id = parseInt(id_);
    return this.http.get<any>(`${environment.apiUrl}/admin/get_updateuser`, { params: { id: id } })
      .pipe(retry(this.num),
        map((response) => {
          //response.data = this.gen.lowerArray(response.data);
          return response
        })
      )
  }

  getConcessions(year: any) {
    return this.http.get<any>(`${environment.apiUrl}/admin/get_concessions`, { params: { year: year } })
      .pipe(retry(this.num),
        map((response) => {
          //response.data = this.gen.lowerArray(response.data);
          return response
        })
      )
  }


  updateUser(e: any, id_: any) {
    debugger;
    var id = parseInt(id_);
     return this.http.put<any>(`${environment.apiUrl}/admin/activate_deactivate`, '',
     {params: { status: e.statuS_, id: id }},
    )
      .pipe(retry(this.num),
        map((response) => {
          return response
        })
      )
  }

  addUser(e: any) {
    return this.http.post<any>(`${environment.apiUrl}/admin/create_user`,
      {
        email: e.email, companY_NAME: e.companY_NAME, passwords: e.passwords,
        name: e.name, designation: e.designation, phonE_NO: e.phonE_NO, companY_ID: e.companY_ID
      },
    )
      .pipe(
        retry(this.num),
        map((response) => {
          return response
        }
        )
      )
  }
  addConcession(e: any) {
    return this.http.post<any>(`${environment.apiUrl}/admin/create_concession`,
      {
        companYNAME: e.companY_NAME, concession_Held: e.concession_Held, equity_distribution: e.equity_distribution,
        area: e.area, contract_Type: e.contract_Type, year_of_Grant_Award: e.year_of_Grant_Award, date_of_Expiration: e.date_of_Expiration,
        geological_location: e.geological_location, year: e.year, comment: e.comment, consession_Type: e.consession_Type,
        concession_Unique_ID: e.concession_Unique_ID
      },
    )
      .pipe(
        retry(this.num),
        map((response) => {
          return response
        }
        )
      )
  }

  addCompanyConcession(e: any) {
    
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_admin_concessions_information`,
      {})
      .pipe(
        retry(this.num),
        map((response) => {
          return response
        }
        )
      )
  }


  Post_ConcessionDetails(conbody: ConcessionDetails, id, actionToDo) {
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_admin_concessions_information`, conbody, { params: { id, actionToDo } })
      .pipe(retry(this.num),
        map((response) => {
          return response
        })
      )
  }

  Post_FieldDetails(conbody: FieldDetails, id, actionToDo) {
    debugger;
    return this.http.post<any>(`${environment.apiUrl}/workprogramme/post_company_field`, conbody, { params: { id, actionToDo } })
      .pipe(retry(this.num),
        map((response) => {
          return response
        })
      )
  }

  getConcessionFields() {
    return this.http.get<any>(`${environment.apiUrl}/workprogramme/get_concessions_field`, { params: { companyNumber: 0 } })
      .pipe(retry(this.num), map((response) => { return response }))
  }

  uploadCompanyCode(conbody: FormData) {

    return this.http.post<any>(`${environment.apiUrl}/admin/upload_companycode`, conbody)
      .pipe(retry(this.num),
        map((response) => {
          return response
        })
      )
  }

  codefetch(url) {
    return this.http.get<any>(`${environment.apiUrl}/admin/${url}`)
      .pipe(retry(this.num),
        map((response) => {
          response.data = this.gen.lowerArray(response.data);
          return response
        })
      )
  }


  updateCompanyCode(_id: any, _name: any, _status:any) {
    var id = parseInt(_id);
    return this.http.put<any>(`${environment.apiUrl}/admin/update_company_codes`, '', { params: { id:id, name:_name, status:_status } }
    )
      .pipe(retry(this.num),
        map((response) => {
          return response
        })
      )
  }
}