import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators'
import { GenericService } from './generic.services';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private num  = 2;

  constructor( private http: HttpClient, private gen: GenericService) { }

fetch(url, year){
  return this.http.get<any>(`${environment.apiUrl}/report/${url}`,{params:{year: year}})
  .pipe(retry(this.num),
  map((response) => {
    response.data = this.gen.lowerArray(response.data);
    return response
  })
  )
}

performanceEvaluation(url, year){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/${url}`,{params:{year: year}})
  .pipe(retry(this.num),
  map((response) => {
    response.data = this.gen.lowerArray(response.data);
    return response
  })
  )
}


getYearList(url){
  url = 'reports_yearlist';
  return this.http.get<any>(`${environment.apiUrl}/report/${url}`)
  .pipe(retry(this.num)
  )
}

getExecutiveReport(year: string){
  return this.http.get<any>(`${environment.apiUrl}/report/Get_General_SummaryReport`, {params: {year: year}})
  .pipe(retry(this.num)
  )
}

}
