import { Component, OnInit ,Input } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Actualpatient } from '../actualpatients/actualpatient';
import { ActualpatientsService } from '../actualpatients/actualpatients.service';

import {Actualmed2patientsService} from '../actualmed2patients/actualmed2patient.service'
import { Actualmed2patient } from '../actualmed2patients/actualmed2patients';

@Component({
  selector: 'actualpatients-list',
  directives: [ ROUTER_DIRECTIVES],
  template: `
  <div class="panel panel-default ">
	  <div class="panel-heading">
	    <div class='row'>     
            <img  src="adavantagelogo.png" />       
            <div class='col-md-2'><span style='font-size:large'>HI</span></div>
            <div *ngIf="actualmed2patient">{{actualmed2patient.patientid}}</div>
            <div *ngIf="thepatient">{{thepatient.name}}</div> 
    	 </div>
       </div>
       <div class="panel-body">
            <div class="table-responsive">
			         <table class="table">
                    <thead>
                        <tr>                            
                            <th>Sl No</th>
                            <th>Particulars</th>
                            <th>Quanty</th>
                            <th>Base Cost</th>
                            <th>Amount</th>                                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="#medicine of actualmed2patient.medicines">
                             <td>{{slno}}</td>
                             <td>{{medicine.name}}</td>
                             <td>{{medicine.qty}}</td>
                             <td>{{medicine.cost}}</td>
                             <td>{{medicine.cost * medicine.qty}}</td>
                        </tr>
                    </tbody>
               </table>
            </div>
       </div>		 
	  
	</div>  
  
  `,
  styleUrls: ['html/actualpatients/actualpatients-list.component.css']
  
})
export class ActualBillComponent implements OnInit{
  actualmed2patient : Actualmed2patient={ };
  thepatient : Actualpatient={};
  showImage = false;
  imageWidth = 50;
  imageMArgin = 2;
  slno = 1;
  constructor(private actualmed2patientsService : Actualmed2patientsService,
              private actualpatientsService : ActualpatientsService,
              private routeParams: RouteParams,
              private router: Router){ }

  ngOnInit(){
     let id = this.routeParams.get('id');
     console.log(id);
    //this.actualpatients = this.starWarsService.getAll();
    this.actualmed2patientsService
         .getMed2PatientIdFromPatientId(id)
          .subscribe(p => this.actualmed2patient = p);
 //         console.log('getting med2patientObj : ', this.actualmed2patient);
          
     this.actualpatientsService
      .getActualpatient(id)
      .subscribe(p => this.thepatient = p)      

  } 
    stringAsDate(dateStr) {
          return new Date(dateStr);
        }
        
     clacAge(dateStr){
       var m = moment(new Date(dateStr) , "YYYY-MM-DD");
       return m.fromNow(true);
     }
}
