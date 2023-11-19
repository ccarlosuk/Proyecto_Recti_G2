
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const validarUsuario = require("./helpers/validar-usuario");

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyectorecti',
};

// Conecta a la base de datos
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (error) {
        throw error;
    }
}
let i = 0;

// Inserta los datos en la tabla
async function insertData(data) {
    const connection = await connectToDatabase();
    const min = 10;
    const max = 18;
    try {
        // Itera sobre los objetos y realiza inserciones

        for (const item of data) {
            // cod_alumno,ape_paterno,ape_materno,nom_alumno,anio_ingreso,situ_academica,coe_alumno,promedio_ponderado
            // const query = 'INSERT INTO prueba (codigo, plan, situacion) VALUES (?, ?, ?)';
            let {
                cod_alumno,
                ape_paterno = "",
                ape_materno = "",
                nom_alumno = "",
                anio_ingreso = "",
                coe_alumno = "",
                rep_plan_actual = 0,
                promedio_ponderado = Math.floor(Math.random() * (max - min + 1)) + min
            } = item;

            if (cod_alumno === undefined) {
                continue;
            }

            let situ_academica = rep_plan_actual >= 2 ? 'observado' : 'regular';
            //let id_usuario = cod_alumno;

            const query = 'INSERT IGNORE INTO alumno (cod_alumno, apellido_paterno, apellido_materno, nombre, anio_ingreso, situ_academica, correo, promedio_ponderado) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
            // Reemplaza "columna1", "columna2", "columna3" con los nombres de tus columnas

            await connection.execute(query, [cod_alumno, ape_paterno, ape_materno, nom_alumno, anio_ingreso, situ_academica, coe_alumno, promedio_ponderado]);
            // console.log(++i);
        }
        console.log('Alumnos insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar alumnos:', error);
    } finally {
        connection.close();
    }
}

async function insertarPlanAcademico(data) {
    const connection = await connectToDatabase();
    try {
        // Itera sobre los objetos y realiza inserciones

        for (const item of data) {
            // cod_alumno,ape_paterno,ape_materno,nom_alumno,anio_ingreso,situ_academica,coe_alumno,promedio_ponderado
            // const query = 'INSERT INTO prueba (cod_asignatura, plan_asignatura, escuela) VALUES (?, ?, ?)';
            let {
                cod_asignatura,
                cod_plan = "",
                escuela = "software",
            } = item;

            if (cod_asignatura === undefined) {
                continue;
            }


            const query = 'INSERT IGNORE INTO Plan_academico (cod_asignatura, plan_asignatura, escuela) VALUES (?, ?, ?)';
            // Reemplaza "columna1", "columna2", "columna3" con los nombres de tus columnas

            await connection.execute(query, [cod_asignatura, cod_plan, escuela]);
            // console.log(++i);
        }
        console.log('Datos de plan academico ingresados con éxito.');
    } catch (error) {
        console.error('Error al insertar plan academico:', error);
    } finally {
        connection.close();
    }
}

async function insertAsignaturas(data) {
    const connection = await connectToDatabase();

    try {
        // Itera sobre los objetos y realiza inserciones

        for (const item of data) {
            // cod_alumno,ape_paterno,ape_materno,nom_alumno,anio_ingreso,situ_academica,coe_alumno,promedio_ponderado
            // const query = 'INSERT INTO prueba (codigo, plan, situacion) VALUES (?, ?, ?)';
            let {
                cod_asignatura,//cod_asignatura
                des_asignatura = "",//nombre
                num_creditaje = "",//creditaje
                cod_seccion = "",//grupo
                num_ciclo_ano_asig = 0//ciclo_asignatura
            } = item;

            if (cod_asignatura === undefined) {
                continue;
            }

            const query = 'INSERT IGNORE INTO asignatura (cod_asignatura, nombre, creditaje, grupo, ciclo_asignatura) VALUES (?, ?, ?, ?, ?)';
            // Reemplaza "columna1", "columna2", "columna3" con los nombres de tus columnas

            await connection.execute(query, [cod_asignatura, des_asignatura, num_creditaje, cod_seccion, num_ciclo_ano_asig]);
            // console.log(++i);
        }
        console.log('Asignaturas insertadas con éxito.');
    } catch (error) {
        console.error('Error al insertar datos:', error);
    } finally {
        connection.close();
    }
}

async function insertartipoRectificacion() {
    const connection = await connectToDatabase();

    try {
        const query = `INSERT INTO Tipo_Rectificacion (id_tipo_recti, descripcion) VALUES
            ('recti1', 'Retiro'),
            ('recti2', 'Cambio'),
            ('recti3', 'Ingreso')`;
        await connection.execute(query);
        console.log('Tipos de rectificacion insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar tipos de rectificacion:', error);
    } finally {
        connection.close();
    }
}

async function insertarHorarios() {
    const connection = await connectToDatabase();

    try {
        const query = `INSERT INTO Horario (id_horario, dia, hora_inicio, hora_fin) VALUES
        ('horario1', 'Lunes', 8, 12),   -- Clase de 4 horas a partir de las 8 am
        ('horario2', 'Miércoles', 14, 17),  -- Clase de 3 horas a partir de las 2 pm
        ('horario3', 'Viernes', 18, 21),   -- Clase de 3 horas a partir de las 6 pm
        ('horario4', 'Martes', 8, 11),   -- Clase de 3 horas a partir de las 8 am
        ('horario5', 'Jueves', 14, 17),  -- Clase de 3 horas a partir de las 2 pm
        ('horario6', 'Sábado', 18, 21),   -- Clase de 3 horas a partir de las 6 pm
        ('horario7', 'Lunes', 19, 22),   -- Clase de 3 horas a partir de las 7 pm
        ('horario8', 'Miércoles', 8, 12),   -- Clase de 4 horas a partir de las 8 am
        ('horario9', 'Viernes', 14, 17),   -- Clase de 3 horas a partir de las 2 pm
        ('horario10', 'Martes', 19, 22);   -- Clase de 3 horas a partir de las 7 pm`;
        await connection.execute(query);
        console.log('Horarios insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar Horarios', error);
    } finally {
        connection.close();
    }
}

async function insertarCupos() {
    const connection = await connectToDatabase();

    try {
        const query = `INSERT INTO Cupo (id_cupo, cupos_asignados, cupos_ocupados) VALUES
        ('cupo1', 50, 40),
        ('cupo2', 45, 35),
        ('cupo3', 30, 25),
        ('cupo4', 50, 45),
        ('cupo5', 40, 30),
        ('cupo6', 45, 35),
        ('cupo7', 50, 40),
        ('cupo8', 35, 28),
        ('cupo9', 40, 32),
        ('cupo10', 50, 45);`;
        await connection.execute(query);
        console.log('Cupos insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar Cupos', error);
    } finally {
        connection.close();
    }
}

async function insertRoles() {
    const connection = await connectToDatabase();
    const roles = ["alumno", "director", "administrador"];

    try {
        for (const elemento of roles) {
            const query = 'INSERT IGNORE INTO Rol (nombre_rol) VALUES (?)';
            await connection.execute(query, [elemento]);
        }
        console.log('roles insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar roles:', error);
    } finally {
        connection.close();
    }
}
async function insertUsuarios(data) {
    const connection = await connectToDatabase();

    try {
        // Itera sobre los objetos y realiza inserciones

        for (const item of data) {
            // INSERT INTO Usuario (id_usuario, usuario, contrasenia, id_rol)
            // VALUES ('16200004', 'juan.ayma', '28603643877848', 1);
            let {
                cod_alumno,
                coe_alumno = "",
                id_rol = "1",//Alumno
            } = item;

            if (cod_alumno === undefined) {
                continue;
            }
            const usuario = validarUsuario(coe_alumno);
            const passwordHashed = await bcrypt.hash(cod_alumno, 2);
            // console.log('hasheado');
            const query1 = `INSERT IGNORE INTO Usuario (id_usuario, usuario, contrasenia, id_rol) VALUES (?, ?, ?, ?)`;
            await connection.execute(query1, [cod_alumno, usuario, passwordHashed, id_rol]);
            const query2 = `UPDATE alumno SET id_usuario = ?
                            WHERE cod_alumno = ?`;
            await connection.execute(query2, [cod_alumno, cod_alumno]);
        }
        console.log('Usuarios insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar usuarios:', error);
    } finally {
        connection.close();
    }
}

async function ingresarSecciones(data) {
    const connection = await connectToDatabase();
    const cupos = ["cupo1", "cupo2", "cupo3", "cupo4", "cupo5", "cupo6", "cupo7", "cupo8", "cupo9", "cupo10"];
    const horarios = ["horario1", "horario2", "horario3", "horario4", "horario5", "horario6", "horario7", "horario8", "horario9", "horario10"];
    const min = 0;
    const max = 9;

    try {
        //
        // const query = 'SELECT cod_asignatura,grupo FROM asignatura';
        // const arreglo = await connection.execute(query);

        for (const item of data) {
            let {
                cod_asignatura,
                cod_seccion = 0
            } = item;
            //console.log(item);
            if (cod_asignatura === undefined) {
                continue;
            }

            let numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            //console.log(numeroAleatorio);
            const cupo = cupos[numeroAleatorio];
            numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            //console.log(numeroAleatorio);

            const horario = horarios[numeroAleatorio];


            const query = 'INSERT IGNORE INTO seccion (id_seccion, cod_asignatura, id_cupo, id_horario) VALUES (?, ?, ?, ?)';
            // Reemplaza "columna1", "columna2", "columna3" con los nombres de tus columnas

            await connection.execute(query, [cod_seccion, cod_asignatura, cupo, horario]);
        }
        console.log('Secciones insertados con éxito.');
        // const query = 'SELECT cod_asignatura,grupo FROM asignatura';
        // const arreglo = await connection.execute(query);
        // return arreglo[0];
        // return arreglo[0].map(valor => [valor.cod_asignatura, valor.grupo])
    } catch (err) {
        console.log("error al insertarSecciones: " + err);
    } finally {
        connection.close();
    }
}

async function insertarAlumno_Seccion(data) {
    const connection = await connectToDatabase();
    let i = 0;
    try {
        // Itera sobre los objetos y realiza inserciones
        for (const item of data) {
            // cod_alumno,ape_paterno,ape_materno,nom_alumno,anio_ingreso,situ_academica,coe_alumno,promedio_ponderado
            // const query = 'INSERT INTO prueba (codigo, plan, situacion) VALUES (?, ?, ?)';
            let {
                cod_alumno,//cod_alumno
                cod_asignatura = "",//cod_asignatura
                cod_seccion = 0,//grupo
            } = item;

            const cod_alumno_seccion = `cas${++i}`;
            const query = 'INSERT INTO alumno_seccion (cod_alumno_seccion, cod_alumno, cod_asignatura, id_seccion) VALUES(?, ?, ?, ?)';
            // Reemplaza "columna1", "columna2", "columna3" con los nombres de tus columnas
            //console.log([cod_alumno_seccion, cod_alumno, cod_asignatura, cod_seccion]);
            await connection.execute(query, [cod_alumno_seccion, cod_alumno, cod_asignatura, cod_seccion]);
            // console.log(++i);
        }
        console.log(i);
        console.log('Alumno-seccion insertadas con éxito.');
    } catch (error) {
        console.error('Error al insertar datos:', error);
    } finally {
        connection.close();
    }
}
module.exports = {
    insertData: insertData,
    insertAsignaturas: insertAsignaturas,
    insertartipoRectificacion: insertartipoRectificacion,
    insertarHorarios: insertarHorarios,
    insertarCupos: insertarCupos,
    insertUsuarios: insertUsuarios,
    insertRoles: insertRoles,
    insertarPlanAcademico: insertarPlanAcademico,
    ingresarSecciones: ingresarSecciones,
    insertarAlumno_Seccion: insertarAlumno_Seccion
}