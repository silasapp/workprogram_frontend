import { Injectable} from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators'
import { BehaviorSubject, Observable} from 'rxjs';
import { CompanyDetails } from "../models/company-details";
import { AuthenticationService } from ".";


@Injectable({providedIn: 'root'})
export class CompanyService {
    private num = 2;
    private currentCompanySubject: BehaviorSubject<CompanyDetails>;
    public currentCompany: Observable<CompanyDetails>;


    constructor(private http: HttpClient, private auth: AuthenticationService) {

        this.currentCompanySubject = new BehaviorSubject<CompanyDetails>(JSON.parse(localStorage.getItem('currentCompany')));
        this.currentCompany = this.currentCompanySubject.asObservable();
    }

    public get currentCompanyValue(): CompanyDetails {
        return this.currentCompanySubject.value;
    }

    editCompanyDetails(details: any){
        debugger;
        return this.http.post<any>(`${environment.apiUrl}/presentation/editcompanydetails`, details)
        .pipe(retry(this.num),
            map((response) =>{
                debugger;
                return response;
            } )
        );
    }

    getCompanyDetails() {
        const d = this.auth.currentUserValue;
        return this.http.get<any>(`${environment.apiUrl}/presentation/getcompanydetails`, {params: {companyName: d.companyName, companyEmail: d.companyEmail, companyId: d.companyId }})
        .pipe(retry(this.num),
        map((response) => {
            debugger;
            localStorage.setItem('currentCompany', JSON.stringify(response.data))
            return response
        })
        )
    }
    opl() {
        return this.http.get<any>(`${environment.apiUrl}/workprogramme/opl_recalibrated_scaled`, {params:{year: '2020'}})
        .pipe(retry(this.num),
        map((response) => {
            return response
        })
        )
    }
    schedulePresentation(time: string, date: string){
        return this.http.post<any>(`${environment.apiUrl}/presentation/schedulepresentation`, '' , {params: {time: time, date: date}})
        .pipe(retry(this.num),
            map((response) => {
                return response
            })
        )
    }


    uploadPresentation(year: string, formData: FormData){

        return this.http.post<any>(`${environment.apiUrl}/presentation/uploadpresentation`, formData,
        {params: {year: year}}
        )
        .pipe(retry(this.num),
        map((response) =>{
            return response
        })
        )

    }


    getdashboardreport(year: string){
        return this.http.get<any>(`${environment.apiUrl}/dashboard/company_dashboard_report`,  {params: {year: year}})
        .pipe(retry(this.num),
        map((response) =>{
            return response;
        })
        )

    }


getCompanyProd(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/dashboard/COMPANY_MONTHLY_PRODUCTION`,  {params: {year: year}})
  .pipe(retry(this.num),
  map((response) =>{
      return response;
  })
  )
}

getCompanyConcessionProd(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/dashboard/COMPANY_CONCESSION_PRODUCTION`,  {params: {year: year}})
  .pipe(retry(this.num),
  map((response) =>{
      return response;
  })
  )
}

getCompanyConcessionReserveOil(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/dashboard/COMPANY_CONCESSION_RESERVE`,  {params: {year: year}})
  .pipe(retry(this.num),
  map((response) =>{
      return response;
  })
  )
}

getCompanyConcessionReserveGas(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/dashboard/COMPANY_CONCESSION_RESERVE_GAS`,  {params: {year: year}})
  .pipe(retry(this.num),
  map((response) =>{
      return response;
  })
  )
}

getCompanyConcessionReserve(year: string) {
  return this.http.get<any>(`${environment.apiUrl}/dashboard/COMPANY_CONCESSION_RESERVE`,  {params: {year: year}})
  .pipe(retry(this.num),
  map((response) =>{
      return response;
  })
  )
}


    getdashboardgasbudgetandreserve(year: string){
        return this.http.get<any>(`${environment.apiUrl}/dashboard/TOTAL_RESERVE_BUDGET`,  {params: {year: year}}
        )
        .pipe(retry(this.num),
        map((response) =>{
            return response;
        })
        )}


        changePassword(e:any) {
            return this.http.get<any>(`${environment.apiUrl}/account/changePassword`, { params: {currentPassword:e.currentPassword, newPassword:e.newPassword}})
                .pipe(retry(this.num));
        }
    
}
