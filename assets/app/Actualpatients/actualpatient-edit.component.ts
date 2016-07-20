import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { ActualpatientsService } from './actualpatients.service';
import { Actualpatient } from './actualpatient';

@Component({
  selector: 'actualpatients-details',
  templateUrl: 'html/actualpatients/actualpatient-edit.component.html',
  styleUrls: ['html/actualpatients/actualpatient-edit.component.css']
})
export class ActualpatientsEditComponent implements OnInit {
    actualpatient : Actualpatient = {"registrationNumber" : "" ,   
    "name"        : "",
    "gender"      : "",
    "DOB"         : new Date(),
    "dateOfAdmission" : new Date(),  
    "photoUrl"    : "",
    "pcpContact" : 
    {
		  "name" : "" , 
		  "contactNo" : "" , 
		  "adress" : ""
	   },
    "comments" : "",
    "initialPayment" : 
    {
		  "registrationFee" : 8000	
    }
    };
    
    isSaved: boolean = false; 
    

    constructor(private actualpatientsService: ActualpatientsService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){       
        let id = this.routeParams.get('id');
        console.log('getting patient with id: ', id);
        this.actualpatientsService
          .getActualpatient(id)
          .subscribe(p => this.actualpatient = p);
        
    }

    gotoPeoplesList(){
        let link = ['Actualpatients'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveActualpatientDetails(){
     // this.isSaved = true;
      this.actualpatientsService
          .saveActualpatient(this.actualpatient)
          .subscribe( 
            (r: Response) => {console.log('success, '+ JSON.stringify(this.actualpatient))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaved = true;}
          );
          
  //        this.isSaved = true;
    }
}