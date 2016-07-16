var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subMedicine = new Schema({ 
            medid   : String,
            name    : String,
            qty     : String,
            totalcost : Number});

var schema = new Schema({
    url         : String,
    name        : String,
    height      : Number,
    weight      : Number,
    profession  : String,
    medicines: [ subMedicine ]
});

module.exports = mongoose.model('Med2patients', schema);

