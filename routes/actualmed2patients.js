var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Actualmed2patients = require('../models/actualmed2patients');


router.get('/static', function(req, res, next) {
        res.json( [
             {
      "name": "Luke Skywalker",
      "height": "172",
      "weight": "77",
      "url": "http://swapi.co/api/med2patients/1/"
    },
    {
      "name": "C-3PO",
      "height": "167",
      "weight": "75",
      "url": "http://swapi.co/api/med2patients/2/"
    },
    {
      "name": "R2-D2",
      "height": "96",
      "weight": "32",
      "url": "http://swapi.co/api/med2patients/3/"
    }
     ])
 
});

router.get('/', function(req, res, next) {
    Actualmed2patients.find()
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});


router.get('/:id', function(req, res, next) {
    Actualmed2patients.findById(req.params.id)
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});

router.post('/findbypatientid' , function(req , res , next){
    console.log(req.body);
    //console.log(typeof(req.body));
    console.log(req.body.patientid);
    console.log(typeof(req.body.patientid));
    /*var pid = toString(req.body.patientid);
    console.log(typeof(pid));
    var x = {"patientid" : pid};
    console.log(x);*/
    
   // var pid = {"patientid": "578b71d586a20823a42e9bfe"};
    
    Actualmed2patients.findOne(req.body)
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log("Finding the patients", docs);
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});



router.post('/', function(req, res, next) {

        var med2patients = new Actualmed2patients({
            patientid         : req.body.patientid,            
            medicines      : req.body.medicines,
            newmedicines      : req.body.newmedicines            
           });
        med2patients.save(function(err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
});



router.post('/:id', function(req, res, next) {
    Actualmed2patients.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'No message found',
                error: {message: 'Message could not be found'}
            });
        }
        console.log("Mongo Record before update .... "+doc);
        console.log("Request Body from Browser .... "+req.body);
//        console.log(decoded.user);
//        if (doc.user != decoded.user._id) {
//            return res.status(401).json({
//                title: 'Not Authorized',
//                error: {message: 'Message created by other user'}
//            });
//        }
        doc.patientid = req.body.patientid;        
        doc.medicines = req.body.medicines;
        doc.newmedicines = req.body.newmedicines;        
        
        doc.save(function(err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
    });
});

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Authentication failed',
                error: err
            });
        }
        next();
    });
});



module.exports = router;