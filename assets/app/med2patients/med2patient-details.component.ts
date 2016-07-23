import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { Med2patientsService } from './med2patients.service';
import { Med2patient } from './med2patient';

import { MedicinesService } from '../medicines/medicines.service';
import { Medicine } from '../medicines/medicine';

import { MedicinesFilterPipe } from './med2patient-medicine-filter.pipe';

@Component({
  selector: 'med2patient-details',
  templateUrl: 'html/med2patients/med2patient-details.component.html',
  styleUrls: ['html/med2patients/med2patient-details.component.css'],
  pipes : [MedicinesFilterPipe]
})
export class Med2patientDetailsComponent implements OnInit {
    @Input() med2patient : Med2patient;
    medicines: Medicine[] = [];
    isSaving: boolean;
    professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

    constructor(private med2patientsService: Med2patientsService,
                private medicinesService: MedicinesService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){
        let id = this.routeParams.get('id');
        console.log('getting med2patient with id: ', id);
        this.med2patientsService
          .getMed2patients(id)
          .subscribe(p => this.med2patient = p);

        this.medicinesService
                .getAllMedicines()
                .subscribe(p => this.medicines = p)
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
            (r: Response) => {console.log('success, '+ JSON.stringify(this.med2patient))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }

    onEdit(event : string, med2patient : Med2patient) {
           console.log(event, med2patient);
    }

      addNewMedPatientList(event : string, medicine : Medicine) {
            console.log("Send to Patient List clicked");
           console.log(event, medicine);
           this.med2patient.newmedicines.push(medicine);
           this.saveMed2patientDetails()
    }
}
