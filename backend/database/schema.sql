drop database proyectorecti;
create database proyectorecti;
use proyectorecti;
-- ######################################################################################################

CREATE TABLE Cupo (
                id_cupo VARCHAR(30) NOT NULL,
                cupos_asignados NUMERIC(10) NOT NULL,
                cupos_ocupados NUMERIC(10) NOT NULL,
                PRIMARY KEY (id_cupo)
);

ALTER TABLE Cupo MODIFY COLUMN cupos_asignados NUMERIC(10) COMMENT 'cupos otorgados a la asignatura';

ALTER TABLE Cupo MODIFY COLUMN cupos_ocupados NUMERIC(10) COMMENT 'Cupos que le quedan a la asignatura';


CREATE TABLE Horario (
                id_horario VARCHAR(50) NOT NULL,
                dia VARCHAR(10) NOT NULL,
                hora_inicio INT NOT NULL,
                hora_fin INT NOT NULL,
                PRIMARY KEY (id_horario)
);


CREATE TABLE Tipo_Rectificacion (
                id_tipo_recti VARCHAR(50) NOT NULL,
                descripcion VARCHAR(100) NOT NULL,
                PRIMARY KEY (id_tipo_recti)
);

ALTER TABLE Tipo_Rectificacion MODIFY COLUMN descripcion VARCHAR(100) COMMENT 'Ingreso o Retiro';


CREATE TABLE Rol (
                id_rol INT AUTO_INCREMENT NOT NULL,
                nombre_rol VARCHAR(50) NOT NULL,
                PRIMARY KEY (id_rol)
);

ALTER TABLE Rol MODIFY COLUMN nombre_rol VARCHAR(50) COMMENT 'Estudiante
Secretaria
Director';


CREATE TABLE Usuario (
                id_usuario VARCHAR(50) NOT NULL,
                usuario VARCHAR(50) UNIQUE NOT NULL,
                contrasenia VARCHAR(60) NOT NULL,
                id_rol INT NOT NULL,
                PRIMARY KEY (id_usuario)
);


CREATE TABLE Asignatura (
                cod_asignatura VARCHAR(50) NOT NULL,
                nombre VARCHAR(100) NOT NULL,
                creditaje INT NOT NULL,
                grupo VARCHAR(50),
                ciclo_asignatura NUMERIC(3) NOT NULL,
                PRIMARY KEY (cod_asignatura)
);

ALTER TABLE Asignatura MODIFY COLUMN grupo VARCHAR(50) COMMENT 'GE:Electivo
O: obligatorio
GS: Selectivo';

ALTER TABLE Asignatura MODIFY COLUMN ciclo_asignatura NUMERIC(3) COMMENT 'ciclo al que pertenece la asignatura';


CREATE TABLE Plan_academico (
                cod_asignatura VARCHAR(50) NOT NULL,
                plan_asignatura NUMERIC(5) NOT NULL,
                escuela VARCHAR(100) NOT NULL,
                PRIMARY KEY (cod_asignatura)
);

ALTER TABLE Plan_academico MODIFY COLUMN plan_asignatura NUMERIC(5) COMMENT 'plan academico al que pertenece la asignatura';

ALTER TABLE Plan_academico MODIFY COLUMN escuela VARCHAR(100) COMMENT 'sistemas
software';


CREATE TABLE Seccion (
                id_seccion VARCHAR(50) NOT NULL,
                cod_asignatura VARCHAR(50) NOT NULL,
                id_cupo VARCHAR(30) NOT NULL,
                id_horario VARCHAR(50) NOT NULL,
                PRIMARY KEY (id_seccion, cod_asignatura)
);


CREATE TABLE Alumno (
                cod_alumno VARCHAR(50) NOT NULL,
                id_usuario VARCHAR(50),
                apellido_paterno VARCHAR(100) NOT NULL,
                apellido_materno VARCHAR(100) NOT NULL,
                nombre VARCHAR(100) NOT NULL,
                anio_ingreso NUMERIC(10) NOT NULL,
                situ_academica VARCHAR(50) NOT NULL,
                correo VARCHAR(255) NOT NULL,
                promedio_ponderado NUMERIC(30,3) NOT NULL,
                PRIMARY KEY (cod_alumno)
);

ALTER TABLE Alumno MODIFY COLUMN situ_academica VARCHAR(50) COMMENT 'Observado
Regular';


CREATE TABLE Alumno_seccion (
                cod_alumno_seccion VARCHAR(50) NOT NULL,
                cod_alumno VARCHAR(50) NOT NULL,
                cod_asignatura VARCHAR(50) NOT NULL,
                id_seccion VARCHAR(50) NOT NULL,
                PRIMARY KEY (cod_alumno_seccion)
);


CREATE TABLE Rectificacion (
                id_rectificacion VARCHAR(50) NOT NULL,
                cod_alumno VARCHAR(50) NOT NULL,
                fecha DATE NOT NULL,
                PRIMARY KEY (id_rectificacion)
);


CREATE TABLE Detalle_Rectificacion (
                id_deta_recti VARCHAR(50) NOT NULL,
                id_rectificacion VARCHAR(50) NOT NULL,
                cod_asignatura VARCHAR(50) NOT NULL,
                id_seccion VARCHAR(50) NOT NULL,
                id_tipo_recti VARCHAR(50) NOT NULL,
                motivo VARCHAR(100) NOT NULL,
                num_repitencia NUMERIC(2) NOT NULL,
                estado VARCHAR(50) NOT NULL,
                PRIMARY KEY (id_deta_recti)
);

ALTER TABLE Detalle_Rectificacion MODIFY COLUMN cod_asignatura VARCHAR(50) COMMENT 'aSIGNATURA A INGRESAR O RETIRARSE';

ALTER TABLE Detalle_Rectificacion MODIFY COLUMN id_seccion VARCHAR(50) COMMENT 'GRUPO DEL GRUPO A INGRESAR O RETIRARSE';

ALTER TABLE Detalle_Rectificacion MODIFY COLUMN num_repitencia NUMERIC(2) COMMENT 'Numerod e veces que lleva el curso
0,1,2da,3era,etc';

ALTER TABLE Detalle_Rectificacion MODIFY COLUMN estado VARCHAR(50) COMMENT 'en espera
aprobado
rechazado';


ALTER TABLE Seccion ADD CONSTRAINT cupo_seccion_fk
FOREIGN KEY (id_cupo)
REFERENCES Cupo (id_cupo)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Seccion ADD CONSTRAINT horario_seccion_fk
FOREIGN KEY (id_horario)
REFERENCES Horario (id_horario)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Detalle_Rectificacion ADD CONSTRAINT tipo_rectificacion_detalle_rectificacion_fk
FOREIGN KEY (id_tipo_recti)
REFERENCES Tipo_Rectificacion (id_tipo_recti)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Usuario ADD CONSTRAINT rol_usuario_fk
FOREIGN KEY (id_rol)
REFERENCES Rol (id_rol)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Alumno ADD CONSTRAINT usuario_alumno_fk
FOREIGN KEY (id_usuario)
REFERENCES Usuario (id_usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Seccion ADD CONSTRAINT curso_seccion_fk
FOREIGN KEY (cod_asignatura)
REFERENCES Asignatura (cod_asignatura)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Plan_academico ADD CONSTRAINT curso_plan_academico_fk
FOREIGN KEY (cod_asignatura)
REFERENCES Asignatura (cod_asignatura)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Alumno_seccion ADD CONSTRAINT seccion_alumno_seccion_fk
FOREIGN KEY (id_seccion, cod_asignatura)
REFERENCES Seccion (id_seccion, cod_asignatura)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Detalle_Rectificacion ADD CONSTRAINT seccion_detalle_rectificacion_fk
FOREIGN KEY (id_seccion, cod_asignatura)
REFERENCES Seccion (id_seccion, cod_asignatura)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Rectificacion ADD CONSTRAINT alumno_rectificacion_fk
FOREIGN KEY (cod_alumno)
REFERENCES Alumno (cod_alumno)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Alumno_seccion ADD CONSTRAINT alumno_alumno_seccion_fk
FOREIGN KEY (cod_alumno)
REFERENCES Alumno (cod_alumno)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Detalle_Rectificacion ADD CONSTRAINT rectificacion_detalle_rectificacion_fk
FOREIGN KEY (id_rectificacion)
REFERENCES Rectificacion (id_rectificacion)
ON DELETE NO ACTION
ON UPDATE NO ACTION;
-- ######################################################################################################