const {conexion} = require("../database/dbConnection");
const util = require("util");
const query = util.promisify(conexion.query).bind(conexion);

class AlumnoModel {
    /*    enrollCourse(student_id, course_id) {
            const queryString = "INSERT INTO studentcourse SET ?";
            const result = query(queryString, {
                course_id: course_id,
                student_id: student_id,
            });
            return result;
        }*/
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
/*const respuesta = async () => {
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
respuesta();*/

module.exports = alumnoModel;