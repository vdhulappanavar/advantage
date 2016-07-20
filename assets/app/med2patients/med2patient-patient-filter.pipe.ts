import { Pipe , PipeTransform } from 'angular2/core';
import { Med2patient } from './med2patient';

@Pipe({
	name : 'med2patientpatientFilter'
})

export class Med2patientsPatientFilterPipe implements PipeTransform{
	transform(value: Med2patient[] , args : string[]) : Med2patient[] {
		let filter : string = args[0] ? args[0].toLocaleLowerCase() : null;
		return filter  ? value.filter((med2patients : Med2patient) => med2patients.name.toLowerCase().indexOf(filter) != -1) : value ; 
	}	
}