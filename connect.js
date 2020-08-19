var Connection = require('tedious').Connection;


var config = {  
    server: 'LAPTOP-P7IJULGC',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', //update me
            password: 'root'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: false,
        instanceName: 'COMPAC',
        database: 'CtEmpresa1'  //update me
    }
};  
var connection = new Connection(config);
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});