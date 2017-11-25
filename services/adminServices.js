var mysql = require('mysql')

module.exports = {
    registerAdmin: function(req, res, next) {

        //add new admin
        var pass            = req.body.password;
        var email           = req.body.email_address;
        var name            = req.body.first_name;
        var surname         = req.body.last_name;
        var dbConnection    = mysqlConnection();
        var insertQuery     = 'insert into admin'+ 
            '(user_id, email_address, password, '+
            'first_name,last_name, join_date)'+
            ' values (null, "'+email+'", "'+pass+'",'+
            '"'+name+'", "'+surname+'", CURRENT_TIMESTAMP);';

        dbConnection.query(insertQuery, function(insertError, results){
            if(insertError) {
                console.log('Could not insert record: '+insertError.sqlMessage)
                res.send(JSON.parse(JSON.stringify(insertError)));
            } else {
                // res.render('admin', { success: 'Success added new admin' });
                res.send(JSON.parse(JSON.stringify(results)));
            }
        })
    },
    viewAdmin: function(req, res) {
        var email              = req.params.email;
        var dbConnection    = mysqlConnection();
        var selectQuery     = 'select * from admin where email_address= "'+email+'"'; 

        dbConnection.query(selectQuery, function(selectError, results){
            if(selectError) {
                res.send('Could not retrieve data: '+ selectError.sqlMessage);
                // res.render('admin', { error: 'Could not retrieve data: '+ selectError.sqlMessage });
            } else {
                // res.render('admin', { adminDetails: JSON.parse(JSON.stringify(results[0])) });
                res.send(JSON.parse(JSON.stringify(results)));
            }
        })
    },
    deleteAdmin: function(req, res) {
        var email              = req.params.email;
        var dbConnection    = mysqlConnection();
        var deleteQuery     = 'delete from admin where email_address= "'+email+'"';

        dbConnection.query(deleteQuery, function(deleteError, results){
            if(deleteError) {
                res.send('Could not retrieve data: '+ deleteQuery.sqlMessage);
                // res.render('admin', { error: 'Could not retrieve data: '+ selectError.sqlMessage });
            } else {
                // res.render('admin', { adminDetails: JSON.parse(JSON.stringify(results[0])) });
                res.send(JSON.parse(JSON.stringify(results)));
            }
        })
    }
};

//NB: This needs to be on a config file
function mysqlConnection(){
    var connection = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'family_tree',
    })

    return connection;
}