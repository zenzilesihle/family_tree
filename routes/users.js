var express = require('express');
var router = express.Router();
var adminServices = require('../services/adminServices.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',adminServices.registerAdmin);

router.get('/:email',adminServices.viewAdmin);

router.delete('/:email/delete',adminServices.deleteAdmin);

module.exports = router;
