var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Family Tree',
                      topNavbar: 'THIS IS TOP NAVIGATION THAT I\'M STRUGLING TO BUILD'
      }
  );
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Family Tree' });
});

module.exports = router;
