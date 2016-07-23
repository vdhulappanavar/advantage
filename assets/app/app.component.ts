import {Component} from 'angular2/core';
import * as moment from 'moment';

// HTTP_PROVIDERS =. let's you inject http service
import { HTTP_PROVIDERS } from 'angular2/http';

import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";
import { PeopleComponent} from './people/people.component';
import { PersonDetailsComponent } from './people/person-details.component';

import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";
import { StarWarsService } from './people/starwars.service';

import { PatientComponent} from './patients/patient.component';
import { PatientDetailsComponent } from './patients/patient-details.component';
import { PatientsService } from './patients/patients.service';

import { MedicineComponent} from './medicines/medicine.component';
import { MedicineDetailsComponent } from './medicines/medicine-details.component';
import { MedicinesService } from './medicines/medicines.service';

import { Med2patientComponent} from './med2patients/med2patient.component';
import { Med2patientDetailsComponent } from './med2patients/med2patient-details.component';
import { Med2patientsService } from './med2patients/med2patients.service';

import { StudentComponent} from './students/student.component';
import { StudentDetailsComponent } from './students/student-details.component';
import { StudentAddComponent } from './students/student-add.component';
import { StudentsService } from './students/students.service';

import { ActualpatientComponent} from './actualpatients/actualpatient.component';
import { ActualpatientsAddComponent} from './actualpatients/actualpatient-add.component';
import { ActualpatientDetailsComponent} from './actualpatients/actualpatient-details.component';
import { ActualpatientsEditComponent} from './actualpatients/actualpatient-edit.component';
import { ActualpatientsService } from './actualpatients/actualpatients.service';

import { ActualmedicineComponent} from './actualmedicines/actualmedicine.component';
import { ActualmedicinesAddComponent} from './actualmedicines/actualmedicine-add.component';
import { ActualmedicineDetailsComponent} from './actualmedicines/actualmedicine-details.component';
import { ActualmedicinesEditComponent} from './actualmedicines/actualmedicine-edit.component';
import { ActualmedicinesService } from './actualmedicines/actualmedicines.service';

import {ActualpatientListComponent} from './actualmed2patients/actualpatientslist.component';
import{AddMedicineToSelectedPatientComponent} from './actualmed2patients/addmedicine-toselectedpatient.component';
import {Actualmed2patientsService} from './actualmed2patients/actualmed2patient.service';
@Component({
    selector: 'my-app',
    template: `         
        <my-header></my-header>        
        <div class="container">        
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent, PeopleComponent, PatientComponent, MedicineComponent, Med2patientComponent , StudentComponent , ActualpatientComponent , ActualmedicineComponent],
    providers: [StarWarsService, PatientsService, MedicinesService, Med2patientsService, ROUTER_PROVIDERS, HTTP_PROVIDERS , StudentsService , ActualpatientsService , ActualmedicinesService , ActualpatientListComponent , Actualmed2patientsService]
})
@RouteConfig([
    { path: '/patients', name: 'Patients', component: PatientComponent},
    { path: '/patients/:id', name: 'Patient Details', component: PatientDetailsComponent },
    { path: '/medicines', name: 'Medicines', component: MedicineComponent},
    { path: '/medicines/:id', name: 'Medicine Details', component: MedicineDetailsComponent },
   { path: '/med2patients', name: 'Med2patients', component: Med2patientComponent},
    { path: '/med2patients/:id', name: 'Med2patient Details', component: Med2patientDetailsComponent },
    {path: '/auth/...', name: 'Auth', component: AuthenticationComponent},
     { path: '/students', name: 'Students', component: StudentComponent},
    { path: '/students/:id', name: 'Student Details', component: StudentDetailsComponent },
    { path: '/studentsAdd', name: 'Student Add', component: StudentAddComponent },
    { path: '/Actualpatients', name: 'Actualpatients', component: ActualpatientComponent },
    { path: '/ActualpatientsAdd', name: 'Actualpatients Add', component: ActualpatientsAddComponent },
    { path: '/ActualpatientsDetails', name: 'Actualpatients Details', component: ActualpatientDetailsComponent}, 
    { path: '/ActualpatientsEdit', name: 'Actualpatients Edit', component: ActualpatientsEditComponent},
    
    { path: '/Actualmedicines', name: 'Actualmedicines', component: ActualmedicineComponent},
    { path: '/ActualmedicinesAdd', name: 'Actualmedicines Add', component: ActualmedicinesAddComponent},
    { path: '/ActualmedicinesDetails', name: 'Actualmedicines Details', component: ActualmedicineDetailsComponent}, 
    { path: '/ActualmedicinesEdit', name: 'Actualmedicines Edit', component: ActualmedicinesEditComponent},
    { path: '/SelectPatient', name: 'Select Patient', component: ActualpatientListComponent , useAsDefault: true} ,
    { path: '/AdditemToPatient', name: 'Add Med To Patient', component: AddMedicineToSelectedPatientComponent}
])
export class AppComponent {    
}