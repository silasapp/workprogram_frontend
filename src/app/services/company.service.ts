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
        return this.http.post<any>(`${environment.apiUrl}/presentation/editcompanydetails`, details)
        .pipe(retry(this.num),
            map((response) =>{
                return response;
            } )
        );
    }

    getCompanyDetails() {
        const d = this.auth.currentUserValue;
        return this.http.get<any>(`${environment.apiUrl}/presentation/getcompanydetails`, {params: {companyName: d.companyName, companyEmail: d.companyEmail, companyId: d.companyId }})
        .pipe(retry(this.num),
        map((response) => {
            localStorage.setItem('currentCompany', JSON.stringify(response))
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
        debugger;
        return this.http.get<any>(`${environment.apiUrl}/dashboard/company_dashboard_report`,  {params: {year: year}}
        )
        .pipe(retry(this.num),
        map((response) =>{
            debugger;
            return response;
            debugger;
        })
        )

    }


    getdashboardgasbudgetandreserve(year: string){
        debugger;
        return this.http.get<any>(`${environment.apiUrl}/dashboard/dashboard_total_gas_budget_reserves_details`,  {params: {year: year}}
        )
        .pipe(retry(this.num),
        map((response) =>{
            debugger;
            return response;
            debugger;
        })
        )}
}