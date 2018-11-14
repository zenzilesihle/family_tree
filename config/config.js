var mysql = require('mysql')

module.exports = {

    mysqlConnection: function () {
        var connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Password@123',
            database: 'family_tree',
        })

        return connection;
    }
};
