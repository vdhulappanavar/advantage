import { Pipe , PipeTransform } from 'angular2/core';
import { Medicine } from '../medicines/medicine';

@Pipe({
	name : 'med2patientmedicineFilter'
})

export class MedicinesFilterPipe implements PipeTransform{
	transform(value: Medicine[] , args : string[]) : Medicine[] {
		let filter : string = args[0] ? args[0].toLocaleLowerCase() : null;
		return filter  ? value.filter((medicines : Medicine) => medicines.name.toLowerCase().indexOf(filter) != -1) : value ; 
	}	
}