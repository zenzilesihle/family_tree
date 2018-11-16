var express = require('express');
var router = express.Router();


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




    res.render('index', {logged: true});
});

module.exports = router;
