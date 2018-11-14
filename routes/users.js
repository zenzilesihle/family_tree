var express = require('express');
var router = express.Router();
var adminServices = require('../controllers/adminServices.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',adminServices.registerAdmin);

router.post('/search',adminServices.searchAdminByName);

router.get('/admins',adminServices.viewAdmins);

router.get('/admin/:id',adminServices.viewAdminById);

router.delete('/:email/delete',adminServices.deleteAdmin);

module.exports = router;
