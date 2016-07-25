var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Actualpatients = require('../models/actualpatients');


router.get('/static', function(req, res, next) {
        res.json( [
             {
      "name": "Luke Skywalker",
      "height": "172",
      "weight": "77",
      "url": "http://swapi.co/api/actualpatients/1/"
    },
    {
      "name": "C-3PO",
      "height": "167",
      "weight": "75",
      "url": "http://swapi.co/api/actualpatients/2/"
    },
    {
      "name": "R2-D2",
      "height": "96",
      "weight": "32",
      "url": "http://swapi.co/api/actualpatients/3/"
    }
     ])
 
});

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

        var actualpatients = new Actualpatients({            
            registrationNumber      : req.body.registrationNumber,
            name        : req.body.name,            
            gender      : req.body.gender,
            dob  : req.body.dob,
            dateOfAdmission : req.body.dateOfAdmission,
            Photourl         : req.body.Photourl,
            pcpContact : req.body.pcpContact , 
            initialPayment : req.body.initialPayment , 
            comments : req.body.comments             
           });
        actualpatients.save(function(err, result) {
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
        doc.registrationNumber = req.body.registrationNumber;
        doc.name = req.body.name;
        doc.gender = req.body.gender;
        doc.dob = req.body.dob;
        doc.dateOfAdmission = req.body.dateOfAdmission;
        doc.Photourl = req.body.Photourl,
        doc.pcpContact = req.body.pcpContact,
        doc.initialPayment = req.body.initialPayment,
        doc.comments = req.body.comments
        
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


router.delete('/deleteby' , function(req, res, next) {
  console.log('del profile');
  console.log(req.body.id);
   Actualpatients.findByIdAndRemove(req.body.id, function(err, doc) {
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
   });
});    
  /*console.log(req.body);
  Actualpatients.findByIdAndRemove(req.body , {},
    function(err, obj) {
      if (err) next(err);
      req.body.destroy(function(error) {
        if (err) {
          next(err)
        }
      });
      res.json(200, obj);
    }
  );*/




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