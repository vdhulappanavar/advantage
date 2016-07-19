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
     // this.isSaved = true;
      this.actualpatientsService
          .saveNewActualpatient(this.actualpatient)
          .subscribe( 
            (r: Response) => {console.log('success, '+ JSON.stringify(this.actualpatient))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaved = true;}
          );
          
  //        this.isSaved = true;
    }
}