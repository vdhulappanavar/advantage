var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Actualpatients = require('../models/Actualpatients');


/*router.get('/static', function(req, res, next) {
        res.json( [
             {
      "name": "Luke Skywalker",
      "height": "172",
      "weight": "77",
      "url": "http://swapi.co/api/patients/1/"
    },
    {
      "name": "C-3PO",
      "height": "167",
      "weight": "75",
      "url": "http://swapi.co/api/patients/2/"
    },
    {
      "name": "R2-D2",
      "height": "96",
      "weight": "32",
      "url": "http://swapi.co/api/patients/3/"
    }
     ])
 
});*/

router.get('/', function(req, res, next) {
    Actualpatients.find()
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
    Actualpatients.findById(req.params.id)
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

router.post('/', function(req, res, next) {    
        console.log("In post");
        var Actualpatients = new Actualpatients({
            regitrationNumber: req.body.regitrationNumber,
            name        : req.body.name,
            gender      : req.body.gender,
            DOB      : req.body.DOB,
            dateOfAdmission  : req.body.dateOfAdmission,
            photoUrl      : req.body.photoUrl,
            PCPContact      : req.body.PCPContact,
            comments      : req.body.comments,
            initialPayment      : req.body.initialPayment            
           });
        Actualpatients.save(function(err, result) {
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
    Actualpatients.findById(req.params.id, function(err, doc) {
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

            doc.regitrationNumber= req.body.regitrationNumber,
            doc.name        = req.body.name,
            doc.gender      = req.body.gender,
            doc.DOB      = req.body.DOB,
            doc.dateOfAdmission  = req.body.dateOfAdmission,
            doc.photoUrl      = req.body.photoUrl,
            doc.PCPContact      = req.body.PCPContact,
            doc.comments      = req.body.comments,
            doc.initialPayment      = req.body.initialPayment        
        
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