import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private apiUrl = 'http://localhost:3000/sites';

  constructor(public httpClient: HttpClient) { }

  add(formData: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}`, formData);
  }


  public getList(): Observable<any> {
    console.log('%cproject.service.ts line:21 this.apiUrl', 'color: #007acc;', this.apiUrl);
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }


  delete(idProject: any): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${idProject}`);
  }

  getOne(id: number): Observable<Site> {
    return this.httpClient.get<Site>(`${this.apiUrl}/${id}`);
  }


  update(data: any): Observable<any> {
    const url = `${this.apiUrl}/${data.id}`;
    return this.httpClient.put(url, data);
  }



}
