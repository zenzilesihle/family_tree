var passwordHash = require('password-hash')
var dbConnection = require('../config/config').mysqlConnection();

module.exports = {
    registerAdmin: function (req, res, next) {
        var pass = passwordHash.generate(req.body.password);
        var email = req.body.email_address;
        var name = req.body.first_name;
        var surname = req.body.last_name;
        var insertQuery = '';

        if (pass != undefined || pass != ' '
            || surname != undefined || surname != null
            || name != undefined || name != null
            || email != undefined || email != null) {

            insertQuery = getInsertQuery(email, pass, name, surname);

            dbConnection.query(insertQuery, function (insertError, results) {
                if (insertError) {
                    res.render('admin', {error: "Error: " + insertError.sqlMessage});
                } else {
                    res.render('admin', {success: 'Successfully added new admin'});
                }
            })
        } else {
            res.render('admin', {error: 'Missing field data'});
        }
    },

    viewAdmins: function (req, res) {
        var selectQuery = 'select * from admin';

        dbConnection.query(selectQuery, function (selectError, results) {
            if (selectError) {
                res.render('admin', {error: 'Could not retrieve data: ' + selectError.sqlMessage});
            } else {
                res.render('view-admins', {adminDetails: JSON.parse(JSON.stringify(results))});
            }
        })
    },

    searchAdminByName: function (req, res) {
        var searchKeyword = req.body.search;
        var selectQuery = 'select * from admin where first_name LIKE "%' + searchKeyword + '%"';

        dbConnection.query(selectQuery, function (selectError, results) {
            if (selectError) {
                res.render('', {error: 'Could not retrieve data: ' + selectError.sqlMessage});
            } else {
                res.render('view-admins', {adminDetails: JSON.parse(JSON.stringify(results))});
            }
        })
    },

    viewAdminById: function (req, res) {
        var userId = req.params.id;
        var selectQuery = 'select * from admin where user_id = "' + userId + '"';

        dbConnection.query(selectQuery, function (selectError, result) {
            if (selectError) {
                res.render('admin', {error: 'Could not retrieve data: ' + selectError.sqlMessage});
            } else {
                res.render('view-admin', {adminDetails: result[0]});
            }
        })
    },

    deleteAdmin: function (req, res) {
        var email = req.params.email;
        var deleteQuery = 'delete from admin where email_address= "' + email + '"';

        dbConnection.query(deleteQuery, function (deleteError, results) {
            if (deleteError) {
                res.send('Could not retrieve data: ' + deleteQuery.sqlMessage);
                // res.render('admin', { error: 'Could not retrieve data: '+ selectError.sqlMessage });
            } else {
                // res.render('view-admins', { adminDetails: JSON.parse(JSON.stringify(results)) });
                res.send(JSON.parse(JSON.stringify(results)));
            }
        })
    },
};

function getInsertQuery(email, pass, name, surname) {
    var fullInsertQuery = 'insert into admin' +
        '(user_id, email_address, password, ' +
        'first_name,last_name, join_date)' +
        ' values (null, "' + email + '", "' + pass + '",' +
        '"' + name + '", "' + surname + '", CURRENT_TIMESTAMP);';

    return fullInsertQuery;
}
