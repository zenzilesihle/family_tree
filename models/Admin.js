var mongoose = require('mongoose');

var vacationSchema = mongoose.Schema({
    user_id: String,
    email_address: String,
    password: String,
    first_name: String,
    last_name: String,
    join_date: Number
});

var Vacation = mongoose.model('Vacation', vacationSchema);
module.exports = Vacation;