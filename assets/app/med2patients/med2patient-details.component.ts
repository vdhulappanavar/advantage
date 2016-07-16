import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { Med2patientsService } from './med2patients.service';
import { Med2patient } from './med2patient';

@Component({
  selector: 'med2patient-details',
  templateUrl: 'html/med2patients/med2patient-details.component.html',
  styleUrls: ['html/med2patients/med2patient-details.component.css']
})
export class Med2patientDetailsComponent implements OnInit {
    @Input() med2patient : Med2patient;
    isSaving: boolean;
    professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

    constructor(private med2patientsService: Med2patientsService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){
//        let id = Number.parseInt(this.routeParams.get('id'));
        let id = this.routeParams.get('id');
        console.log('getting med2patient with id: ', id);
        this.med2patientsService
          .getMed2patients(id)
          .subscribe(p => this.med2patient = p);
    }

    gotoPeoplesList(){
        let link = ['Med2patients'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveMed2patientDetails(){
      this.isSaving = true;
      this.med2patientsService
          .saveMed2patient(this.med2patient)
          .subscribe(
 //           (r: Response) => {console.log('success, id:'+this.med2patient.id+', Name:'+this.med2patient.name+', Weight:'+this.med2patient.weight)},
            (r: Response) => {console.log('success, '+ JSON.stringify(this.med2patient))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
}
