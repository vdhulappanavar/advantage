import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    selector: 'my-header',
    template: `
                    <div>
						<nav class="navbar navbar-default">
							<div class="container-fluid">
								<a class="navbar-brand">{{pageTitle}}</a>
								<ul class="nav navbar-nav" >
                                    <li><a [routerLink]="['Actualpatients']">ActualPatients</a></li>
                                    <li><a [routerLink]="['Actualmedicines']">ActualMedicines</a></li>
                                    <li><a [routerLink]="['Med2patients']">Med2Patients</a></li>
                                    <li><a [routerLink]="['Auth']">User Management</a></li>									
								</ul>
							</div>
						</nav>
					</div>
    `,
    directives: [ROUTER_DIRECTIVES]
    /*styles: [`
        header {
            margin-bottom: 20px;
        }
    
        ul {
          text-align: center;  
        }
        
        li {
            float: none;
            display: inline-block;
        }
        
        .router-link-active {
            background-color: #337ab7;
            color: white;
        }
    `]*/
})
export class HeaderComponent {
    pageTitle = "Advantage Elder Care";
    
}