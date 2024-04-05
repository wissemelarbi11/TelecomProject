import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cellule } from '../models/cellule';

@Injectable({
  providedIn: 'root'
})
export class CelluleService {

  private apiUrl = 'http://localhost:3000/cellule';

  constructor(public httpClient: HttpClient) { }

  add(formData: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}`, formData);
  }


  public getList(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }


  delete(idProject: any): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${idProject}`);
  }

  getOne(id: number): Observable<Cellule> {
    return this.httpClient.get<Cellule>(`${this.apiUrl}/${id}`);
  }


  update(data: any): Observable<any> {
    const url = `${this.apiUrl}/${data.id}`;
    return this.httpClient.put(url, data);
  }

}