export interface Actualmedicine {
    id?: string;
    registrationNumber : string;    
    name        : string;
    gender      : string;
    dob         : Date;
    dateOfAdmission : Date;  
    photoUrl    : string;
    pcpContact : {
        name : string; 
        contactNo : string; 
        adress : string;
    }
    comments : string;
    initialPayment : {
        registrationFee : number;
    }
    mongoId? : string;
}
