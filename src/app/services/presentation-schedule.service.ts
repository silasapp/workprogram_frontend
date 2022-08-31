import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators'
import { GenericService } from './generic.services';


@Injectable({
  providedIn: 'root'
})
export class PresentationScheduleService {
  private num  = 2;

  constructor(private http: HttpClient, private gen: GenericService) { }

  getScribesYearList(){
    return this.http.get<any>(`${environment.apiUrl}/presentation/scribes_yearlist`)
    .pipe(retry(this.num),
    map((response) =>{
      return response
    })
    )
  }
  getScribesAndChairmen(year : string){
    return this.http.get<any>(`${environment.apiUrl}/presentation/scribes_&_chairmen`, {params:{year: year}})
    .pipe(retry(this.num), 
    map((response) => {
      return response
    })
    )
  }

  getDivisionalScheduleList(){
    return this.http.get<any>(`${environment.apiUrl}/presentation/divisional_schedule_list`)
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  getDivisionalScheduleByYear(year: string){
    return this.http.get<any>(`${environment.apiUrl}/presentation/divisional_schedule_by_year`, {params:{year: year}})
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  getDivisionalYearList(){
    return this.http.get<any>(`${environment.apiUrl}/presentation/divisional_yearlist`)
    .pipe(retry(this.num),
    map((response) => {
      return response
    })
    )
  }

  emailStatus(compId: string, emailStatus){
    var id = parseInt(compId);
    return this.http.post<any>(`${environment.apiUrl}/presentation/activate_deactivate_email`, '',{params:{compId: id, option: emailStatus}} )
    .pipe(
    map((response) => {
      return response
    })
    )
  }

  getCompanyRep(compId: string){
    var id = parseInt(compId);
    return this.http.get<any>(`${environment.apiUrl}/presentation/get_company_rep`, {params:{id: id}} )
    .pipe(retry(this.num),
    map((response)=>{
    response.data = this.gen.lowerArray(response.data);
      return response
    })
    )
  }

  getCompanyRepsList(){
    return this.http.get<any>(`${environment.apiUrl}/presentation/company_reps`)
    .pipe(retry(this.num),
    map((response)=>{
      return response
    })
    )
  }

  updateCompanyRep(e: any, compId: any){
    return this.http.post<any>(`${environment.apiUrl}/presentation/update_company_rep`, 
    {representative: e.representative, representativE_EMAIL: e.representativE_EMAIL},
    {params: {compId: compId}}
    )
    .pipe(retry(this.num),
    map((response) =>{
      return response
    })
    )
  }
}
