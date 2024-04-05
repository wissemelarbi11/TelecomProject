import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gouvernorate } from '../models/governorate';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {

  private apiUrl = 'http://localhost:3000/gouvernorats';

  constructor(public httpClient: HttpClient) { }


  public getList(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }


  getOne(id: number): Observable<gouvernorate> {
    return this.httpClient.get<gouvernorate>(`${this.apiUrl}/${id}`);
  }


}

