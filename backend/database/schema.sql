drop database proyectorecti;
create database proyectorecti;

-- ######################################################################################################

CREATE TABLE Cupo (
                id_cupo VARCHAR(30) NOT NULL,
                cupos_asignados NUMERIC(10) NOT NULL,
                cupos_ocupados NUMERIC(10) NOT NULL,
                PRIMARY KEY (id_cupo)
);

ALTER TABLE Cupo MODIFY COLUMN cupos_asignados NUMERIC(10) COMMENT 'cupos otorgados a la asignatura
';

ALTER TABLE Cupo MODIFY COLUMN cupos_ocupados NUMERIC(10) COMMENT 'Cupos que le quedan a la asignatura
';


CREATE TABLE Horario (
                id_horario VARCHAR(10) NOT NULL,
                dia VARCHAR(10) NOT NULL,
                hora_inicio INT NOT NULL,
                hora_fin INT NOT NULL,
                PRIMARY KEY (id_horario)
);


CREATE TABLE Tipo_Rectificacion (
                id_tipo_recti VARCHAR(10) NOT NULL,
                descripcion VARCHAR(10) NOT NULL,
                PRIMARY KEY (id_tipo_recti)
);

ALTER TABLE Tipo_Rectificacion MODIFY COLUMN descripcion VARCHAR(10) COMMENT 'Ingreso o Retiro
';


CREATE TABLE Rol (
                id_rol INT AUTO_INCREMENT NOT NULL,
                nombre_rol VARCHAR(30) NOT NULL,
                PRIMARY KEY (id_rol)
);

ALTER TABLE Rol MODIFY COLUMN nombre_rol VARCHAR(30) COMMENT 'Estudiante
Secretaria
Director';


CREATE TABLE Asignatura (
                cod_asignatura VARCHAR(10) NOT NULL,
                nombre VARCHAR(30) NOT NULL,
                creditaje INT NOT NULL,
                grupo VARCHAR(20),
                ciclo_asignatura NUMERIC(2) NOT NULL,
                PRIMARY KEY (cod_asignatura)
);

ALTER TABLE Asignatura MODIFY COLUMN grupo VARCHAR(20) COMMENT 'GE:Electivo
O: obligatorio
GS: Selectivo';

ALTER TABLE Asignatura MODIFY COLUMN ciclo_asignatura NUMERIC(2) COMMENT 'ciclo al que pertenece la asignatura
';


CREATE TABLE Plan_academico (
                cod_asignatura VARCHAR(10) NOT NULL,
                plan_asignatura NUMERIC(4) NOT NULL,
                escuela VARCHAR(30) NOT NULL,
                PRIMARY KEY (cod_asignatura)
);

ALTER TABLE Plan_academico MODIFY COLUMN plan_asignatura NUMERIC(4) COMMENT 'plan academico al que pertenece la asignatura';

ALTER TABLE Plan_academico MODIFY COLUMN escuela VARCHAR(30) COMMENT 'sistemas
software';


CREATE TABLE Seccion (
                id_seccion VARCHAR(10) NOT NULL,
                cod_asignatura VARCHAR(10) NOT NULL,
                id_cupo VARCHAR(30) NOT NULL,
                id_horario VARCHAR(10) NOT NULL,
                PRIMARY KEY (id_seccion, cod_asignatura)
);


CREATE TABLE Alumno (
                cod_alumno VARCHAR(10) NOT NULL,
                apellido_paterno VARCHAR(15) NOT NULL,
                apellido_materno VARCHAR(15) NOT NULL,
                nombre VARCHAR(30) NOT NULL,
                anio_ingreso NUMERIC(10) NOT NULL,
                situ_academica VARCHAR(30) NOT NULL,
                correo VARCHAR(30) NOT NULL,
                promedio_ponderado NUMERIC(30,3) NOT NULL,
                PRIMARY KEY (cod_alumno)
);

ALTER TABLE Alumno MODIFY COLUMN situ_academica VARCHAR(30) COMMENT 'Observado
Regular
';


CREATE TABLE Usuario (
                id_usuario VARCHAR(10) NOT NULL,
                usuario VARCHAR(30) NOT NULL,
                contrasenia VARCHAR(30) NOT NULL,
                id_rol INT NOT NULL,
                PRIMARY KEY (id_usuario)
);


CREATE TABLE Alumno_seccion (
                cod_alumno_seccion VARCHAR(10) NOT NULL,
                cod_alumno VARCHAR(10) NOT NULL,
                cod_asignatura VARCHAR(10) NOT NULL,
                id_seccion VARCHAR(10) NOT NULL,
                PRIMARY KEY (cod_alumno_seccion)
);


CREATE TABLE Rectificacion (
                id_rectificacion VARCHAR(10) NOT NULL,
                cod_alumno VARCHAR(10) NOT NULL,
                fecha DATE NOT NULL,
                PRIMARY KEY (id_rectificacion)
);


CREATE TABLE Detalle_Rectificacion (
                id_deta_recti VARCHAR(10) NOT NULL,
                id_rectificacion VARCHAR(10) NOT NULL,
                cod_asignatura VARCHAR(10) NOT NULL,
                id_seccion VARCHAR(10) NOT NULL,
                id_tipo_recti VARCHAR(10) NOT NULL,
                motivo VARCHAR(50) NOT NULL,
                num_repitencia NUMERIC(2) NOT NULL,
                estado VARCHAR(15) NOT NULL,
                PRIMARY KEY (id_deta_recti)
);

ALTER TABLE Detalle_Rectificacion MODIFY COLUMN cod_asignatura VARCHAR(10) COMMENT 'aSIGNATURA A INGRESAR O RETIRARSE';

ALTER TABLE Detalle_Rectificacion MODIFY COLUMN id_seccion VARCHAR(10) COMMENT 'GRUPO DEL GRUPO A INGRESAR O RETIRARSE
';

ALTER TABLE Detalle_Rectificacion MODIFY COLUMN num_repitencia NUMERIC(2) COMMENT 'Numerod e veces que lleva el curso
0,1,2da,3era,etc';

ALTER TABLE Detalle_Rectificacion MODIFY COLUMN estado VARCHAR(15) COMMENT 'en espera
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

ALTER TABLE Usuario ADD CONSTRAINT alumno_usuario_fk
FOREIGN KEY (id_usuario)
REFERENCES Alumno (cod_alumno)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Detalle_Rectificacion ADD CONSTRAINT rectificacion_detalle_rectificacion_fk
FOREIGN KEY (id_rectificacion)
REFERENCES Rectificacion (id_rectificacion)
ON DELETE NO ACTION
ON UPDATE NO ACTION;
-- ######################################################################################################