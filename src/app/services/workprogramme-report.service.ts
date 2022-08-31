import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.services';
import { map, retry } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class WorkprogrammeReportService {

  private num  = 2;

  constructor( private http: HttpClient, private gen: GenericService) { }

fetch(url, year){
  return this.http.get<any>(`${environment.apiUrl}/report/${url}`,{params:{year: year}})
  .pipe(retry(this.num),
  map((response) => {
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

}
