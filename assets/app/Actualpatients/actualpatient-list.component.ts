import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Actualpatient } from './actualpatient';
import { ActualpatientDetailsComponent } from './actualpatient-details.component';
import { ActualpatientsService } from './actualpatients.service';

import { ActualpatientsFilterPipe } from './actualpatient-filter.pipe';

@Component({
  selector: 'actualpatients-list',
  directives: [ActualpatientDetailsComponent, ROUTER_DIRECTIVES],
  template: `
  <div class="panel panel-primary ">
	  <div class="panel-heading">
    <div class='row'>
            <div class='col-md-1 col-md-offset-2'>Filter by:</div>
            <div class='col-md-4' style="color:black">
                <input type='text' [(ngModel)]='listFilter'/>
            </div>
            <div class='col-md-2 col-md-offset-3'><button class="btn btn-danger" [routerLink] = "['Actualpatients Add']" >ADD</button></div>
     </div>		 
	  </div>
	  <div class="panel-body">
			<div class="table-responsive">
			  <table class="table">
        <thead>
                    <tr>
                        <th>
                            <button class='btn btn-primary' (click) = "toggleImage()">
                                {{showImage ? 'Hide' : 'Show'}} Image
                            </button>
                        </th>
                        <th>Patient Name</th>
                        <th></th>         
                        <th></th>               
                    </tr>
         </thead>
         <tbody>
				<tr *ngFor="#actualpatient of actualpatients | actualpatientsFilter:listFilter">
          <td>
                <img *ngIf='showImage' [src]='actualpatient.photoUrl' [title]='actualpatient.name' [style.width.px]='imageWidth' [style.margin.px]= 'imageMargin'/>
          </td>
					<td>
					  <a href="#" [routerLink]="['Actualpatients Details', {id: actualpatient.id}]">{{actualpatient.name}}</a>
					</td>		
          <td>
            <a>Edit</a>
          </td>
          <td>
            <a>Delete</a>
          </td>
				</tr>
        </tbody>
			  </table>	  
			</div>
		</div>
	</div>
  <h6>Thanks to http://www.barbarianmeetscoding.com/blog/categories/angular2-step-by-step/ </h6>
  `,
  styleUrls: ['html/actualpatients/actualpatients-list.component.css'],
  pipes : [ActualpatientsFilterPipe]
})
export class ActualpatientComponent implements OnInit{
  actualpatients: Actualpatient[] = [];
  selectedActualpatient: Actualpatient;
  listFilter = "";
  showImage = false;
  imageWidth = 50;
  imageMArgin = 2;
  constructor(private actualpatientsService : ActualpatientsService){ }

  ngOnInit(){
    //this.actualpatients = this.starWarsService.getAll();
    this.actualpatientsService
      .getAllActualpatients()
      .subscribe(p => this.actualpatients = p)
  }

  selectActualpatient(actualpatient: Actualpatient){
    this.selectedActualpatient = actualpatient;
  }
  
  toggleImage() : void
    {
        this.showImage = !this.showImage;
    }
}
