var express = require('express');
var router = express.Router();

var passwordHash = require('password-hash')
var dbConnection = require('../config/config').mysqlConnection();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
            title: 'Family Tree',
            topNavbar: 'THIS IS TOP NAVIGATION THAT I\'M STRUGLING TO BUILD'
        }
    );
});

router.get('/admin', function (req, res, next) {
    res.render('admin', {title: 'Family Tree'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {logged: false});
});

router.post('/login', function (req, res, next) {
    var password = req.body.password;
    var email = req.body.email_address;
    var selectQuery = 'select * from admin where email_address = "' + email + '"';

    dbConnection.query(selectQuery, function (error, result) {
        if(error)
            res.render('login', {logged: false});
        else {
            if(passwordHash.verify(password, result[0].password)) {
                res.render('index', {logged: true,
                                    failLogin: false});
            } else {
                res.render('login', {logged: false,
                                    failLogin: true,
                                    failMessage: "Incorrect combination of username and password"
                                    });
            }
        }


        })

});

module.exports = router;
