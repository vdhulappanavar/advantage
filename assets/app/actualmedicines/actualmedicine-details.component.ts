import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { ActualmedicinesService } from './actualmedicines.service';
import { Actualmedicine } from './actualmedicine';

@Component({
  selector: 'actualmedicine-details',
  templateUrl: 'html/actualmedicines/actualmedicine-details.component.html',
  styleUrls: ['html/actualmedicines/actualmedicine-details.component.css']
})
export class ActualmedicineDetailsComponent implements OnInit {
    @Input() actualmedicine : Actualmedicine;
    isSaving: boolean;
    listFilter="";
    professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

    constructor(private actualmedicinesService: ActualmedicinesService,
               private routeParams: RouteParams,
               private router: Router){
    }

       ngOnInit(){
//        let id = Number.parseInt(this.routeParams.get('id'));
        let id = this.routeParams.get('id');
        console.log('getting student with id: ', id);
        this.actualmedicinesService
         .getActualmedicine(id)
          .subscribe(p => this.actualmedicine = p);
          console.log('getting student : ', this.actualmedicine);
    }

    gotoPeoplesList(){
        let link = ['Actualmedicines'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveActualmedicine(){
      this.isSaving = true;
      this.actualmedicinesService
          .saveActualmedicine(this.actualmedicine)
          .subscribe(
 //           (r: Response) => {console.log('success, id:'+this.actualmedicine.id+', Name:'+this.actualmedicine.name+', Weight:'+this.actualmedicine.weight)},
            (r: Response) => {console.log('success, '+ JSON.stringify(this.actualmedicine))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
}
