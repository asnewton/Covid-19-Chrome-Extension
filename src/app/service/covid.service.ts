import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }

  public getCovidSummary() {
    return this.http.get('https://api.covid19api.com/summary');
  }


}
