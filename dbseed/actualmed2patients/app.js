//var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//ar cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Patients = require('./.../models/patients');
var Actualmed2patients = require('../../models/actualmed2patients');

mongoose.connect('localhost:27017/advantage');

var patients = new Array();

//Mongo commands
 Patients.find()
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            patients = docs;
            //console.log(patients);
            for(var i=0;i<patients.length;i++)
{
        var actualmed2patients = new Actualmed2patients({
            patientid   : patients[i]._id,
            medicines : [],
            newmedicines : [],
           });
        console.log ("med2patient record to be saved ...", actualmed2patients);
        actualmed2patients.save(function(err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log(result);
        });
}
        });
//console.log(patients);


    Actualmed2patients.find({"patientid" : "5789ee5c4b779cc738abf190"})
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log(docs);
        });

//module.exports = app;