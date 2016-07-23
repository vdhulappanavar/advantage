var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subMedicine = new Schema({ 
            medid   : String,
            name    : String,
            qty     : String,
            cost : Number});


var schema = new Schema({    
    patientid       : String,	    
    medicines       : [ subMedicine ],
    newmedicines    : [ subMedicine ]
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('Actualmed2patients', schema);

