import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doc } from '../models/doc';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  private apiUrl = 'http://localhost:3000/docSite';

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

  getOne(id: number): Observable<Doc> {
    return this.httpClient.get<Doc>(`${this.apiUrl}/${id}`);
  }


  update(data: any): Observable<any> {
    const url = `${this.apiUrl}/${data.id}`;
    return this.httpClient.put(url, data);
  }


  public importFile(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    console.log('formdata: ', formdata);
    console.log('file: ', file);
    const url = `${this.apiUrl}`;

    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    console.log('file to add', this.httpClient.request(req));

    return this.httpClient.request(req);
  }


}