import { Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {StockModel} from '../model/stock-model.model';
@Injectable({
  providedIn: 'root'
})
export class StockService {


  private apiUrl = 'http://localhost:8082';
 
  constructor(private http:HttpClient) { }
  getMovies(): Observable<StockModel[]> {
    return this.http.get<StockModel[]>(`${this.apiUrl}/api/v1.0/stocks/country/{countryName}`);
  }

}
