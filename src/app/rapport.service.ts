import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rapport } from './models/rapport';
import { toString } from './handlers/userSession';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  constructor() { }

  getRapports(): Observable<Array<Rapport>> {
    return Observable.create(observer => {
      fetch(`${environment.server}/bootstrap.php/rapports`, { method: 'GET', mode: 'cors' })
        .then(res => res.json())
        .then((rapports: Array<Rapport>) => {
          observer.next(rapports);
          observer.complete();
        });
    })
  }

  getRapportsUser(user): Observable<Array<Rapport>> {

    return Observable.create(observer => {
      fetch(`${environment.server}/bootstrap.php/rapport`, { 
        method: 'POST', mode: 'cors', body: toString(user)
       })
        .then(res => res.json())
        .then((value: Array<Rapport>) => {
          observer.next(value)
          observer.complete();
        });
    })
  }

  addRapport(data) : boolean{
    var resu:boolean=null;
    fetch(`${environment.server}/uploader.php`, { method: 'POST', mode: 'cors', body: data })
    .then(res => {
      if (res.ok) {
       resu=true;
      }else resu=false;
    }) 
    return resu;
  }
}
