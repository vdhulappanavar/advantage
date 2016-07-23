import {Medicine} from "./medicine"

export interface Actualmed2patient 
{
	id?: string;	
	patientid ?      : string;	    
    medicines  ?     :  Medicine [];
    newmedicines?    : Medicine [];
}