import {Component} from 'angular2/core';

// HTTP_PROVIDERS =. let's you inject http service
import { HTTP_PROVIDERS } from 'angular2/http';

import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";
import { PeopleComponent} from './people/people.component';
import { PersonDetailsComponent } from './people/person-details.component';
import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";
import { StarWarsService } from './people/starwars.service';
@Component({
    selector: 'my-app',
    template: ` 
        <div class="container">
            <my-header></my-header>
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent, PeopleComponent],
    providers: [StarWarsService, ROUTER_PROVIDERS, HTTP_PROVIDERS]
})
@RouteConfig([
    { path: '/persons', name: 'Persons', component: PeopleComponent, useAsDefault: true},
  { path: '/persons/:id', name: 'Person Details', component: PersonDetailsComponent },
    {path: '/auth/...', name: 'Auth', component: AuthenticationComponent}
])
export class AppComponent {
    
}