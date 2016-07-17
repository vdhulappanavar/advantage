var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var initialPayment = new Schema ({
    registrationFee : Number , 
    /*cautionDeposit : Number , 
    advantagePayment : Number , 
    establishmentCharges : Number , 
    monthlyCharges : Number , 
    physiotherapyCharges : Number , 
    privateNurseCharges : Number*/
});


var contact = new Schema ({
   name : String , 
   contactNo : String , 
   adress : String 
});

var schema = new Schema({
	regitrationNumber : String ,    
    name        : String,
    gender      : String,
    DOB         : Date,
    dateOfAdmission : Date,  
    photoUrl    : String,
    PCPContact : contact,
    comments : String,
    initialPayment : initialPayment 
},
{
    timestamps : true
}
);

module.exports = mongoose.model('Actualpatients', schema);
//PCP : Patient Care Party