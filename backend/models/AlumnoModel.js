const query = require("../database/dbConnection");

//DEFINICION DE LA CLASE ALUMNOMODEL
class AlumnoModel {
    //OBTENER ALUMNO DE ACUERDO AL ID DE USUARIO
    getAlumnoByUsuario(name_usuario) {
        const queryString =
            `SELECT a.*
             FROM Usuario AS u
             JOIN Alumno AS a ON u.id_usuario = a.id_usuario
             WHERE u.usuario = ?`;
        const result = query(queryString, name_usuario);
        return result;
    }
    //FUNCION OBTENER DATOS DEL ESTUDIANTE
    getById(id) {
        const queryString = `
        SELECT  a.cod_alumno,
                a.nombre,
                a.apellido_paterno,
                a.apellido_materno,
                a.correo,
                a.situ_academica,
                p_a.plan_asignatura AS plan_academico,
                p_a.escuela,
                (
                    SELECT SUM(asig.creditaje)
                    FROM asignatura asig, alumno a, alumno_seccion a_s
                    WHERE a.cod_alumno = a_s.cod_alumno
                    AND asig.cod_asignatura = a_s.cod_asignatura
                ) AS total_cred_matr
        FROM alumno a
        JOIN alumno_seccion a_s ON a.cod_alumno = a_s.cod_alumno
        JOIN plan_academico p_a ON a_s.cod_asignatura = p_a.cod_asignatura
        WHERE a.cod_alumno = ?
        LIMIT 1`;
        const result = query(queryString, id);
        return result;
    }

    getCursosAlumno(cod_alumno) {
        const queryString =
            `SELECT a.cod_asignatura, a.nombre
                FROM Alumno_seccion AS als
                JOIN Seccion AS s ON als.id_seccion = s.id_seccion AND als.cod_asignatura = s.cod_asignatura
                JOIN Asignatura AS a ON s.cod_asignatura = a.cod_asignatura
                WHERE als.cod_alumno = ?`;
        const result = query(queryString, cod_alumno);
        return result;
    }
}
//SE INSTANCIA EL OBJETO DE LA CLASE ALUMNOMODEL
alumnoModel = new AlumnoModel();

module.exports = alumnoModel;

/* class AlumnoModel {
    enrollCourse(student_id, course_id) {
            const queryString = "INSERT INTO studentcourse SET ?";
            const result = query(queryString, {
                course_id: course_id,
                student_id: student_id,
            });
            return result;
        }
    getAlumnoCursos(alumno_id) {
        const queryString = `SELECT c.name AS CourseName,c.code,s.grade,u.name as InstructorName 
            FROM course c
            INNER JOIN studentcourse s
            ON c.id = s.course_id
            INNER JOIN user u
            ON c.instructor_id= u.id
            WHERE ? `;
        const result = query(queryString, {student_id: alumno_id});
        return result;
    }

    getStudentByEmail(studentEmail) {
        const queryString = "SELECT * FROM user WHERE ? AND type = 'student'";
        const result = query(queryString, {email: studentEmail});
        return result;
    }

    getActiveCoursesForStudent(studentId) {
        const queryString = `SELECT c.name AS CourseName, c.code, u.name AS InstructorName 
    FROM course AS c 
    LEFT JOIN user AS u
    ON c.instructor_id=u.id
    WHERE c.status = 1 AND c.id NOT IN
    (SELECT course_id FROM studentcourse WHERE ?)`;
        const result = query(queryString, {student_id: studentId});
        return result;
    }
}

alumnoModel = new AlumnoModel();
const respuesta = async () => {
    try {
        const listCursos = await alumnoModel.getAlumnoCursos('juan.ayma@unmsm.edu.pe');
        if (listCursos.length === 0) {
            console.log('fail');
        } else {
            console.log('ok');
        }
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error);
    }
};
respuesta();

module.exports = alumnoModel; */
