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
                                    <li><a [routerLink]="['Actualpatients']">Patients</a></li>
                                    <li><a [routerLink]="['Actualmedicines']">Items</a></li>
                                    <li class="active"><a  [routerLink]="['Select Patient']">AddItemToBill</a></li>                                    
                                    <li><a [routerLink]="['Auth']">User Management</a></li>									
								</ul>
							</div>
						</nav>
					</div>
    `,
    directives: [ROUTER_DIRECTIVES]
    /*styles: [`        
    
        ul {
          text-align: center;  
        }
        
        li {
            float: none;
            display: inline-block;
        }
        
        
         .navbar-default .navbar-nav > .active
         {
                color: #000;
            background: #d65c14;
          }
         .navbar-default .navbar-nav > .active > a, 
         .navbar-default .navbar-nav > .active > a:hover, 
         .navbar-default .navbar-nav > .active > a:focus 
         {
                color: #000;
                background: #d65c14;
            }
    `]*/
})
export class HeaderComponent {
    pageTitle = "Advantage Elder Care";
    
}