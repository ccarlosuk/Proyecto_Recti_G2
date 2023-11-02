
SELECT * FROM Alumno;
SELECT * FROM Usuario;

SELECT u.id_usuario, u.usuario, r.nombre_rol
FROM USUARIO as u
JOIN ROL as r ON u.ID_ROL = r.ID_ROL
WHERE u.id_usuario = 16200004 AND r.NOMBRE_ROL= 'ESTUDIANTE';

SELECT * from alumno;

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
        WHERE a.cod_alumno = '17200237'
        LIMIT 1
