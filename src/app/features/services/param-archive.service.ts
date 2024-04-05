import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ParamArchive } from '../models/param-archive';

@Injectable({
  providedIn: 'root'
})
export class ParamArchiveService {


  private apiUrl = 'http://localhost:3000/paramArchive';

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

  getOne(id: number): Observable<ParamArchive> {
    return this.httpClient.get<ParamArchive>(`${this.apiUrl}/${id}`);
  }

  /* getProjetName(idProject: number): Observable<string> {
     const url = `${this.apiUrl}/projects/${idProject}`; 
     return this.httpClient.get<any>(url).pipe(
       map(data => data.nomProjet),
       catchError(error => {
         console.error('Erreur lors de la récupération du nom du projet', error);
         throw error;
       })
     );
   }
 
   getProjectDetails(idProject: number): Observable<P> {
     return this.httpClient.get<Project>(`${this.apiUrl}/projects/${idProject}`); 
   }*/

  updateProject(project: any): Observable<any> {
    const url = `${this.apiUrl}/${project.id}`;
    return this.httpClient.put(url, project);
  }



}
