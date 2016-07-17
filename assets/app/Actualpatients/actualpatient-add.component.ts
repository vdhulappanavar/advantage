import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { ActualpatientsService } from './actualpatients.service';
import { Actualpatient } from './actualpatient';

@Component({
  selector: 'actualpatients-details',
  templateUrl: 'html/actualpatients/actualpatient-add.component.html',
  styleUrls: ['html/actualpatients/actualpatients-add.component.css']
})
export class ActualpatientsAddComponent implements OnInit {
    actualpatient : Actualpatient = {"regitrationNumber" : "test" ,    
    "name"        : "",
    "gender"      : "",
    "DOB"         : new Date("1934-11-1"),
    "dateOfAdmission" : new Date("2014-11-1"),  
    "photoUrl"    : "http://lorempixel.com/100/100/people?1",
    "PCPContact" : 
    {
		  "name" : "123test" , 
		  "contactNo" : "" , 
		  "adress" : "test"
	   },
    "comments" : "",
    "initialPayment" : 
    {
		  "registrationFee" : 8000	
    }
    };
    
    isSaving: boolean = false; 
    

    constructor(private actualpatientsService: ActualpatientsService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){       
       // this.actualpatients.name="hello";
       // this.actualpatients.schoolName="hi";
       // this.actualpatients.url="";
       // this.actualpatients.standard="";
        
    }

    gotoPeoplesList(){
        let link = ['Actualpatients'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveNewActualpatientsDetails(){
      this.isSaving = true;
      this.actualpatientsService
          .saveNewActualpatient(this.actualpatient)
          .subscribe( 
            (r: Response) => {console.log('success, '+ JSON.stringify(this.actualpatient))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
}