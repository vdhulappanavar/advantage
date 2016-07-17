import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Student } from './student';
import { StudentDetailsComponent } from './student-details.component';
import { StudentsService } from './students.service';

@Component({
  selector: 'students-list',
  directives: [StudentDetailsComponent, ROUTER_DIRECTIVES],
  template: `
  <!-- this is the new syntax for ng-repeat -->
  HI
  <div class="panel panel-primary ">
	  <div class="panel-heading">
		 <a href="#" [routerLink] = "['Student Add']">ADD</a>
	  </div>
	  <div class="panel-body">
			<div class="table-responsive">
			  <table class="table">
				<tr *ngFor="#student of students">
					<td>
					  <a href="#" [routerLink]="['Student Details', {id: student.id}]">{{student.name}}</a>
					</td>		
				</tr>
			  </table>	  
			</div>
		</div>
	</div>
  <h6>Thanks to http://www.barbarianmeetscoding.com/blog/categories/angular2-step-by-step/ </h6>
  `,
  styleUrls: ['html/students/students.component.css']
})
export class StudentComponent implements OnInit{
  students: Student[] = [];
  selectedStudent: Student;

  constructor(private studentsService : StudentsService){ }

  ngOnInit(){
    //this.students = this.starWarsService.getAll();
    this.studentsService
      .getAllStudents()
      .subscribe(p => this.students = p)
  }

  selectStudent(student: Student){
    this.selectedStudent = student;
  }
}
