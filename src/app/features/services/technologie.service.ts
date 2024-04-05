import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Technologie } from '../models/technologie';

@Injectable({
  providedIn: 'root'
})
export class TechnologieService {


  private apiUrl = 'http://localhost:3000/technologies';

  constructor(public httpClient: HttpClient) { }


  public getList(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }


  getOne(id: number): Observable<Technologie> {
    return this.httpClient.get<Technologie>(`${this.apiUrl}/${id}`);
  }


}
