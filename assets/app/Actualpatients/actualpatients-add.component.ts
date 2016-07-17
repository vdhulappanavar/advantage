import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { ActualpatientsService } from './actualpatients.service';
import { Actualpatient } from './actualpatient';

@Component({
  selector: 'actualpatients-details',
  templateUrl: 'html/actualpatientss/actualpatients-add.component.html',
  styleUrls: ['html/actualpatientss/actualpatients-add.component.css']
})
export class ActualpatientsAddComponent implements OnInit {
    actualpatients : Actualpatient ;
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
        let link = ['Actualpatientss'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveNewActualpatientsDetails(){
      this.isSaving = true;
      this.actualpatientsService
          .saveNewActualpatient(this.actualpatients)
          .subscribe( 
            (r: Response) => {console.log('success, '+ JSON.stringify(this.actualpatients))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
}