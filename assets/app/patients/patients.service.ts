import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Patient } from '../patients/patient';

@Injectable()
export class PatientsService{
  //private baseUrl: string = 'http://swapi.co/api';
    private baseUrl: string = 'http://localhost:3000';

  constructor(private http : Http){}

  getAllPatients(): Observable<Patient[]>{
    let patients$ = this.http
      .get(`${this.baseUrl}/patients`)
      .map(mapPatients);
      return patients$;
  }
  getPatients(id: string): Observable<Patient> {
    let patients$ = this.http
      .get(`${this.baseUrl}/patients/${id}`)
      .map(mapPatient);
      return patients$;
  }
  savePatient(patient: Patient) : Observable<Response>{
    return this.http
      .post(`${this.baseUrl}/patients/${patient.id}`, JSON.stringify(patient));
  }
}

function mapPatients(response:Response): Patient[]{
   return response.json().obj.map(toPatient)
}

function mapPatient(response:Response): Patient{
   return toPatient(response.json().obj);
}

function toPatient(r:any): Patient{
  let patient = <Patient>({
//    id: parseInt(r.url.replace('http://swapi.co/api/patients/','').replace('/','')),
    id: r._id,
    url: r.url,
    name: r.name,
    weight: r.mass,
    height: r.height,
    mongoId : r._id
  });
  console.log('Parsed patient:', patient);
  return patient;
}
