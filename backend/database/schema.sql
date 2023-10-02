use proyectorecti;

CREATE TABLE Curso (
                cod_curso VARCHAR(10) NOT NULL,
                nombre VARCHAR(30) NOT NULL,
                seccion NUMERIC NOT NULL,
                PRIMARY KEY (cod_curso)
);


CREATE TABLE Alumno (
                cod_alumno VARCHAR(10) NOT NULL,
                nombres VARCHAR(30) NOT NULL,
                apellidos VARCHAR(30) NOT NULL,
                situ_academica VARCHAR(30) NOT NULL,
                facultad VARCHAR(30) NOT NULL,
                correo_electronico VARCHAR(30) NOT NULL,
                PRIMARY KEY (cod_alumno)
);


CREATE TABLE Matricula (
                cod_matricula VARCHAR(10) NOT NULL,
                cod_curso VARCHAR(10) NOT NULL,
                cod_alumno VARCHAR(10) NOT NULL,
                PRIMARY KEY (cod_matricula)
);


ALTER TABLE Matricula ADD CONSTRAINT curso_alumno_curso_fk
FOREIGN KEY (cod_curso)
REFERENCES Curso (cod_curso)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Matricula ADD CONSTRAINT alumno_alumno_curso_fk
FOREIGN KEY (cod_alumno)
REFERENCES Alumno (cod_alumno)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

