use proyectorecti;
-- Insertar el rol "Estudiante"
-- INSERT INTO Rol (nombre_rol) VALUES ('Alumno');
-- Insertar el rol "Director"
-- INSERT INTO Rol (nombre_rol) VALUES ('Director');
-- Insertar el rol "Secretaria"
-- INSERT INTO Rol (nombre_rol) VALUES ('Secretaria');
-- Insertar el rol "Administrador"
-- INSERT INTO Rol (nombre_rol) VALUES ('Administrador');
-- INSERT IGNORE INTO Rol (nombre_rol) VALUES ('administrador'), ('alumno'), ('director');

-- DELETE FROM Rol WHERE id_rol = 5;
-- ALTER TABLE Rol AUTO_INCREMENT = 4;
-- -- ALTER TABLE Rol AUTO_INCREMENT = MAX_ID + 1; //reiniciar el autoincrementable en el valor dado

-- SELECT * FROM ROL;
-- VALIDAR ALUMNO DE ACUERDO A UN CODIGO
/*SELECT u.id_usuario, u.usuario, r.nombre_rol
FROM USUARIO as u
JOIN ROL as r ON u.ID_ROL = r.ID_ROL
WHERE u.id_usuario = 16200004 AND r.NOMBRE_ROL= 'ALUMNO';
*/
-- OBTENER DATOS DEL ALUMNO DE ACUERDO AL ID
       /* SELECT  a.cod_alumno,
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
        LIMIT 1;*/

-- LISTAR CURSOS MATRICULADOS DE ACUERDO AL COD_ALUMNO
/*SELECT a.cod_asignatura, a.nombre
FROM Alumno_seccion AS als
JOIN Seccion AS s ON als.id_seccion = s.id_seccion AND als.cod_asignatura = s.cod_asignatura
JOIN Asignatura AS a ON s.cod_asignatura = a.cod_asignatura
WHERE als.cod_alumno = '17200237';*/

-- ---------------------INSERTS USUARIOS------------------
INSERT INTO Usuario (id_usuario, usuario, contrasenia, id_rol)
VALUES ('16200004', 'juan.ayma', '123', 1);
INSERT INTO usuario (id_usuario, usuario, contrasenia, id_rol)
VALUES ('17200237', 'patrick.monzon', '123456', 1);

        -- ----------Alumno---------- --
INSERT INTO Alumno (cod_alumno, apellido_paterno, apellido_materno, nombre, anio_ingreso, situ_academica, correo, promedio_ponderado)
VALUES ('17200237', 'Monzon', 'Seguerra', 'Patrick', 2017, 'Regular', 'patrick.monzon@unmsm.edu.pe', 20);
UPDATE alumno SET id_usuario = '17200237'
WHERE cod_alumno = '17200237';

INSERT INTO Alumno (cod_alumno, apellido_paterno, apellido_materno, nombre, anio_ingreso, situ_academica, correo, promedio_ponderado)
VALUES ('16200004', 'Ayma', 'Pumainca', 'Juan Fidel', 2023, 'Regular', 'juan.ayma@unmsm.edu.pe', 8.5);
UPDATE alumno SET id_usuario = '16200004'
WHERE cod_alumno = '16200004';

-- ----------Asignatura---------- --
INSERT INTO asignatura (cod_asignatura, nombre, creditaje, grupo, ciclo_asignatura)
VALUES ('2010806', 'TALL DE CONSTR DE SIST', 2, 1, 8);

INSERT INTO asignatura (cod_asignatura, nombre, creditaje, grupo, ciclo_asignatura)
VALUES ('2010704', 'BASE DE DATOS III', 3, 0, 7);

INSERT INTO asignatura (cod_asignatura, nombre, creditaje, grupo, ciclo_asignatura)
VALUES ('2010705', 'INFRAESTRUCTURA Y SEGURIDAD EN REDES', 3, 0, 7);

select * FROM asignatura;

-- ----------Cupo---------- --
INSERT INTO cupo (id_cupo, cupos_asignados, cupos_ocupados)
VALUES ('C_TS_1', 20, 18);

INSERT INTO cupo (id_cupo, cupos_asignados, cupos_ocupados)
VALUES ('C_BD_3', 20, 13);

INSERT INTO cupo (id_cupo, cupos_asignados, cupos_ocupados)
VALUES ('C_ISR_1', 10, 8);

select * FROM cupo;

-- ----------Horario---------- --
INSERT INTO horario (id_horario, dia, hora_inicio, hora_fin)
VALUES ('H_TS_1', 'Lunes', 1500, '1900');

INSERT INTO horario (id_horario, dia, hora_inicio, hora_fin)
VALUES ('H_BD_3', 'Viernes', 1800, '2200');

INSERT INTO horario (id_horario, dia, hora_inicio, hora_fin)
VALUES ('H_ISR_1', 'Sabado', 0800, '1200');

select * FROM horario;

-- ----------Seccion---------- --
INSERT INTO seccion (id_seccion, cod_asignatura, id_cupo, id_horario)
VALUES ('TALL_SIST_1', '2010806', 'C_TS_1', 'H_TS_1');

INSERT INTO seccion (id_seccion, cod_asignatura, id_cupo, id_horario)
VALUES ('B_D_3', '2010704', 'C_BD_3', 'H_BD_3');

INSERT INTO seccion (id_seccion, cod_asignatura, id_cupo, id_horario)
VALUES ('I_S_R_1', '2010705', 'C_ISR_1', 'H_ISR_1');

select * FROM seccion;

-- ----------Alumno Seccion---------- --
INSERT INTO alumno_seccion (cod_alumno_seccion, cod_alumno, cod_asignatura, id_seccion)
VALUES ('TS1_17200237', '17200237', '2010806', 'TALL_SIST_1');

INSERT INTO alumno_seccion (cod_alumno_seccion, cod_alumno, cod_asignatura, id_seccion)
VALUES ('DB3_17200237', '17200237', '2010704', 'B_D_3');

INSERT INTO alumno_seccion (cod_alumno_seccion, cod_alumno, cod_asignatura, id_seccion)
VALUES ('ISR_17200237', '17200237', '2010705', 'I_S_R_1');

select * FROM alumno_seccion;

-- ----------Plan Academico---------- --
INSERT INTO plan_academico (cod_asignatura, plan_asignatura, escuela)
VALUES ('2010806', 2014, 'SISTEMAS');

INSERT INTO plan_academico (cod_asignatura, plan_asignatura, escuela)
VALUES ('2010704', 2014, 'SISTEMAS');

INSERT INTO plan_academico (cod_asignatura, plan_asignatura, escuela)
VALUES ('2010705', 2014, 'SISTEMAS');

select * FROM plan_academico;

select u.id_usuario, u.usuario, u.contrasenia, r.nombre_rol
from usuario u
join rol as r
on u.id_rol = r.id_rol
where u.usuario = ?
