import {Component} from 'angular2/core';

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


@Component({
    selector: 'my-app',
    template: ` 
        <div class="container">
            <my-header></my-header>
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent, PeopleComponent, PatientComponent, MedicineComponent],
    providers: [StarWarsService, PatientsService, MedicinesService, ROUTER_PROVIDERS, HTTP_PROVIDERS]
})
@RouteConfig([
    { path: '/persons', name: 'Persons', component: PeopleComponent},
    { path: '/persons/:id', name: 'Person Details', component: PersonDetailsComponent },
    { path: '/patients', name: 'Patients', component: PatientComponent, useAsDefault: true},
    { path: '/patients/:id', name: 'Patient Details', component: PatientDetailsComponent },
    { path: '/medicines', name: 'Medicines', component: MedicineComponent},
    { path: '/medicines/:id', name: 'Medicine Details', component: MedicineDetailsComponent },
    {path: '/auth/...', name: 'Auth', component: AuthenticationComponent}
])
export class AppComponent {
    
}