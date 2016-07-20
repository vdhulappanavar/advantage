import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Med2patient } from './med2patient';
import { Med2patientDetailsComponent } from './med2patient-details.component';
import { Med2patientsService } from './med2patients.service';

import { Med2patientsPatientFilterPipe } from './med2patient-patient-filter.pipe';

@Component({
  selector: 'med2patients-list',
  directives: [Med2patientDetailsComponent, ROUTER_DIRECTIVES],
  template: `
  <div class="panel panel-primary " *ngIf="med2patients">
	  <div class="panel-heading">
      <div class='row'>
              <div class='col-md-1 col-md-offset-2'>Filter by:</div>
              <div class='col-md-4' style="color:black">
                  <input type='text' [(ngModel)]='listFilter'/>
              </div>            
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
                    </tr>
         </thead>
         <tbody>
				<tr *ngFor="#med2patient of med2patients | med2patientpatientFilter:listFilter">
          <td>
                <img *ngIf='showImage' [src]='med2patient.url' [title]='med2patient.name' [style.width.px]='imageWidth' [style.margin.px]= 'imageMargin'/>
          </td>
					<td>
					  <a href="#" [routerLink]="['Med2patient Details', {id: med2patient.id}]">{{med2patient.name}}</a>
					</td>
				</tr>
        </tbody>
			  </table>	  
			</div>
		</div>
	</div> 
  
  
  `,
  styleUrls: ['html/med2patients/med2patients.component.css'] ,
  pipes : [Med2patientsPatientFilterPipe]
})
export class Med2patientComponent implements OnInit{
  med2patients: Med2patient[] = [];
  selectedMed2patient: Med2patient;
  listFilter="";
  showImage = false;
  imageWidth = 50;
  imageMArgin = 2;
  constructor(private med2patientsService : Med2patientsService){ }

  ngOnInit(){
    //this.med2patients = this.starWarsService.getAll();
    this.med2patientsService
      .getAllMed2patients()
      .subscribe(p => this.med2patients = p)
  }

  toggleImage() : void
    {
        this.showImage = !this.showImage;
    }

  selectMed2patient(med2patient: Med2patient){
    this.selectedMed2patient = med2patient;
  }
}
