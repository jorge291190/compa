const express = require('express');

function createRouter(db) {
  const router = express.Router();

  // the routes are defined here
  router.get('/getalgo/:sql', (req, res, next) => {
    var Connection = require('tedious').Connection;  
    var config = {  
      server: '127.0.0.1',  //update me
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
  connection.on('connect', function(err) {  
      // If no error, then good to proceed.  
      console.log("Connected");  

      
     executeStatement(req.params.sql).then( 
       data =>{

      res.send(data);
     });
      
     
  });  

  var Request = require('tedious').Request  
  var TYPES = require('tedious').TYPES;  

  async function executeStatement(Query) {  
    var dbConn = await connection; // Here add your connection code in connect() function
    const allRows = [];
    return await new Promise((resolve,reject) => {
       const request = new Request(Query, function(err, rowCount) {
            if (err) {
                return reject(err);
            } else {
                console.log(rowCount + ' rows');
                return rowCount + ' rows';
            }
        });

        request.on('row', function(columns) {

            columns.forEach(function(column) {
                const row = [];
                row.push({
                    metadata: column.metadata,
                    value: column.value,
                    toString: () => column.value
                });
                allRows.push(row);
            });
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            console.log('onDoneProc');
          
           // console.log('all rows',allRows);
          
            return resolve(JSON.stringify(allRows));
        });

        dbConn.execSql(request);

    });
  }  
  });
 

  // prueba de consulta


  router.get('/consulta', (req, res, next) => {
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
  connection.on('connect', function(err) {  
      // If no error, then good to proceed.  
      console.log("Connected");  
      
    executeStatement().then(
      data =>{
        res.send(data)
      }
    ).catch( error =>{ console.log(error)});
  });  

  var Request = require('tedious').Request;  
  var TYPES = require('tedious').TYPES;  

   async function executeStatement() {  
    var dbConn = await connection; // Here add your connection code in connect() function
    const allRows = [];
    return await new Promise((resolve,reject) => {
       var SELECT_QUERY = 'SELECT ID,Codigo,Nombre FROM dbo.ActivosFijos';
       const request = new Request(SELECT_QUERY, function(err, rowCount) {
            if (err) {
                return reject(err);
            } else {
                console.log(rowCount + ' rows');
                
            }
        });

        request.on('row', function(columns) {

            columns.forEach(function(column) {
                const row = [];
                row.push({
                    metadata: column.metadata,
                    value: column.value,
                    toString: () => column.value
                });
                allRows.push(row);
            });
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            console.log('onDoneProc');
          
           // console.log('all rows',allRows);
          
            return resolve(JSON.stringify(allRows));
        });

        dbConn.execSql(request);

    });
  }  
  });


  return router;
}

module.exports = createRouter;