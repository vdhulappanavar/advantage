var mongoose = require('mongoose');
var Schema = mongoose.Schema;
            
var contact = new Schema({
    name : String , 
    contactNo : String , 
    adress : String 
});

var initialPayment = new Schema({
    registrationFee : Number
});

var schema = new Schema({    
    registrationNumber          : String,
    name            : String,    
    gender          : String,
    dob             : Date ,
    dateOfAdmission : Date ,
    photourl             : String,
    comments : String , 
    initialPayment : initialPayment , 
    pcpContact : contact 
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Actualmedicines', schema);
