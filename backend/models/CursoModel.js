const {conexion} = require("../database/dbConnection");
const util = require("util");
const query = util.promisify(conexion.query).bind(conexion);

class CursoModel {

    //LIST
    getCourses() {
        const queryString = `SELECT * FROM CURSO`;
        const result = query(queryString);
        return result;
    }

    //INSERT
    insertCourse(courseData) {
        const queryString = "INSERT INTO course SET ?";
        const result = query(queryString, {
            name: courseData.name,
            code: courseData.code,
        });
        return result;
    }
    //UPDATE
    updateCourse(courseData, oldCode) {
        const queryString = "UPDATE course SET ? WHERE ?";
        const result = query(queryString, [courseData, { code: oldCode }]);
        return result;
    }
    //DELETE
    deleteCourse(courseCode) {
        const queryString = "DELETE FROM course WHERE ?";
        const result = query(queryString, { code: courseCode });
        return result;
    }

    getCourseByCode(code) {
        const queryString = "SELECT * FROM course WHERE ?";
        const result = query(queryString, { code: code });
        return result;
    }
    getCourseById(id) {
        const queryString = "SELECT * FROM course WHERE ?";
        const result = query(queryString, { id: id });
        return result;
    }

    getActiveCourses() {
        const queryString = `SELECT c.name AS CourseName, c.code, u.name AS InstructorName
            FROM course AS c
            INNER JOIN user AS u
            ON c.instructor_id=u.id
            WHERE c.status = 1`;
        const result = query(queryString);
        return result;
    }

}

cursoModel = new CursoModel();
module.exports = cursoModel;