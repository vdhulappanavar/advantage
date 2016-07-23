import { Injectable } from 'angular2/core'
import { Http, Headers, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Actualmed2patient } from './actualmed2patients';

@Injectable()
export class Actualmed2patientsService{
  //private baseUrl: string = 'http://swapi.co/api';
    private baseUrl: string = 'http://localhost:3000';

  constructor(private http : Http){}

  getAllActualmed2patients(): Observable<Actualmed2patient[]>{
    let actualmed2patients$ = this.http
      .get(`${this.baseUrl}/actualmed2patients`)
      .map(mapActualmed2patients);
      return actualmed2patients$;
  }
  getActualmed2patients(id: string): Observable<Actualmed2patient> {
    let actualmed2patients$ = this.http
      .get(`${this.baseUrl}/actualmed2patients/${id}`)
      .map(mapActualmed2patient);
      return actualmed2patients$;
  }
  
  getMed2PatientIdFromPatientId(patientid){
    const body = JSON.stringify({"patientid" : patientid});
     const headers = new Headers({'Content-Type': 'application/json'});
    let actualmed2patients$ = this.http
      .post(`${this.baseUrl}/actualmed2patients/findbypatientid` , body , {headers: headers})
      .map(mapActualmed2patient);
      return actualmed2patients$;
    
    
  }
  
  
  saveActualmed2patient(actualmed2patient: Actualmed2patient) : Observable<Response>{
        const body = JSON.stringify(actualmed2patient);
        const headers = new Headers({'Content-Type': 'application/json'});

         return this.http
              .post(`${this.baseUrl}/actualmed2patients/${actualmed2patient.id}`,body, {headers: headers});
  }
  
  


}

function mapActualmed2patients(response:Response): Actualmed2patient[]{
   return response.json().obj.map(toActualmed2patient)
}

function mapActualmed2patient(response:Response): Actualmed2patient{
   return toActualmed2patient(response.json().obj);
}

function toActualmed2patient(r:any): Actualmed2patient{
  let actualmed2patient = <Actualmed2patient>({
//    id: parseInt(r.url.replace('http://swapi.co/api/actualmed2patients/','').replace('/','')),
    id: r._id,    
    patientid: r.patientid,
    medicines : r.medicines,
    newmedicines : r.newmedicines
  });
  console.log('Parsed actualmed2patient:', actualmed2patient);
  return actualmed2patient;
}
