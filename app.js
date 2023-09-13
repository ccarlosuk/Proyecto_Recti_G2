const mysql = require("mysql")



let conexion =  mysql.createConnection({
        host:'localhost',
        database:'proyectorecti',
        user:'root',
        password: '',
        });




conexion.connect((error) => {
    if(error){
        throwerror;
    }else{
        console.log('CONEXION EXITOSA');
    }
});

conexion.query('SELECT * from alumno',(error,results,fields) => {
    if(error){
        throw error;
    }
    results.forEach((result) => {
        console.log(result.correo);
        //console.log(fields);
        
    });
});


conexion.end();

