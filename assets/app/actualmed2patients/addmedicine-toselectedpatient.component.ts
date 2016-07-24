import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import {Actualmed2patient} from './actualmed2patients';

import { ActualpatientsService } from '../actualpatients/actualpatients.service';
import { Actualpatient } from '../actualpatients/actualpatient';

import {Medicine} from './medicine';

import { Actualmedicine } from '../actualmedicines/actualmedicine';
import { ActualmedicinesService } from '../actualmedicines/actualmedicines.service';
import { ActualmedicinesFilterPipe } from '../actualmedicines/actualmedicine-filter.pipe';

import {Actualmed2patientsService} from './actualmed2patient.service';

@Component({
  selector: 'actualpatient-details',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'html/actualmed2patients/actualmed2patient-details.component.html',
  styleUrls: ['html/actualmed2patients/actualmed2patient-details.component.css'],
  pipes : [ActualmedicinesFilterPipe]
  
})
export class AddMedicineToSelectedPatientComponent implements OnInit {
    @Input() actualpatient : Actualpatient={
      "registrationNumber" : "" ,    
    "name"        : "",
    "gender"      : "",
    "dob"         : new Date(),
    "dateOfAdmission" : new Date(),  
    "photoUrl"    : "",
    "pcpContact" : {
		"name" : "" , 
		"contactNo" : "" , 
		"adress" : ""
	},
    "comments" : "",
    "initialPayment" : {
		"registrationFee" : 8000,
        "cautionDeposit" : 75000,
        "advancePayment" : 20000,
        "establishmentCharges" : 37500,
        "monthlyCharges" : 20000,
        "phyisiotherapyCharges": 4000,
        "privateNurseCharges" : 7000
	}
    };
    isSaving: boolean;
    listFilter="";
    notEditable = true;
    selectedActualmedicine: Actualmedicine;
    selectedActualmedicines : Actualmedicine[]=[];
    actualmedicines: Actualmedicine[] = [];
    
    med2patientObj : Actualmed2patient = {
      patientid: "" 
      
    };  
    temp : Medicine={
      "medid" : "" , 
      "qty" : "1" , 
      "name" : "" , 
      "cost" : 0
    }; 
    
    constructor(private actualpatientsService: ActualpatientsService,
                private actualmedicinesService : ActualmedicinesService,
                 private actualmed2patientsService : Actualmed2patientsService,
               private routeParams: RouteParams,
               private router: Router){
    }

       ngOnInit(){
         console.log("in the ngOnInit");
        let id = this.routeParams.get('id');
        console.log('getting student with id: ', id);
        //console.log(this.actualmedicinesService.getMed2PatientIdFromPatientId(id));
        this.med2patientObj.patientid = id;
        this.actualpatientsService
         .getActualpatient(id)
          .subscribe(p => this.actualpatient = p);
          console.log('getting student : ', this.actualpatient);
          
      this.actualmedicinesService
        .getAllActualmedicines()
          .subscribe(p => this.actualmedicines = p);
          
      this.actualmed2patientsService
         .getMed2PatientIdFromPatientId(id)
          .subscribe(p => this.med2patientObj = p);
          console.log('getting med2patientObj : ', this.med2patientObj);
          
      //console.log("med2patientid of the patient : " , this.med2patientObj.id);
          
      
      
    }
    
    makeEditable(){
      this.notEditable=!this.notEditable;
    }

    gotoPeoplesList(){
        let link = ['Select Patient'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveActualpatient(){
      this.isSaving = true;
      this.actualpatientsService
          .saveActualpatient(this.actualpatient)
          .subscribe( 
            (r: Response) => {console.log('success, '+ JSON.stringify(this.actualpatient))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
    saveActualmed2patientDetails(){
      this.isSaving = true;
      this.actualmed2patientsService
          .saveActualmed2patient(this.med2patientObj)
          .subscribe( 
            (r: Response) => {console.log('success, '+ JSON.stringify(this.med2patient))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
    stringAsDate(dateStr) {
          return new Date(dateStr);
        }
        
        clacAge(dateStr){
       var m = moment(new Date(dateStr) , "YYYY-MM-DD");
       return m.fromNow(true);
     }
     
     selectActualmedicine(actualmedicine: Actualmedicine){
    this.selectedActualmedicine = actualmedicine;
  }  
  
  saveMeds($event , actualmedicine : Actualmedicine)
  {
    this.selectedActualmedicines.push(actualmedicine); 
    
    this.temp.name = actualmedicine.name;
    this.temp.cost = actualmedicine.cost;
    this.temp.medid = actualmedicine.id;
    this.temp.qty = "1";   
    this.med2patientObj.newmedicines.push(this.temp)
    this.saveActualmed2patientDetails();
  }
  
  onClickingSave()
  {
    for(var i = 0 ; i < this.med2patientObj.newmedicines.length ; i++)
    {
        this.med2patientObj.medicines.push(this.med2patientObj.newmedicines[i]);
    }   
        
     this.med2patientObj.newmedicines = [];
     this.selectedActualmedicines = [];
     this.saveActualmed2patientDetails();
  }
 
   
}
