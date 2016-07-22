import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { ActualmedicinesService } from './actualmedicines.service';
import { Actualmedicine } from './actualmedicine';

@Component({
  selector: 'actualmedicines-details',
  templateUrl: 'html/actualmedicines/actualmedicine-add.component.html',
  styleUrls: ['html/actualmedicines/actualmedicine-add.component.css']
})
export class ActualmedicinesAddComponent implements OnInit {
    actualmedicine : Actualmedicine = {"registrationNumber" : "" ,   
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
    

    constructor(private actualmedicinesService: ActualmedicinesService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){       
       // this.actualmedicines.name="hello";
       // this.actualmedicines.schoolName="hi";
       // this.actualmedicines.url="";
       // this.actualmedicines.standard="";
        
    }

    gotoPeoplesList(){
        let link = ['Actualmedicines'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveNewActualmedicinesDetails(){
     // this.isSaved = true;
      this.actualmedicinesService
          .saveNewActualmedicine(this.actualmedicine)
          .subscribe( 
            (r: Response) => {console.log('success, '+ JSON.stringify(this.actualmedicine))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaved = true;}
          );
          
  //        this.isSaved = true;
    }
}