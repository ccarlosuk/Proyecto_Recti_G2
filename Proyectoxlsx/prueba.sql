CREATE TABLE Alumno (
    cod_alumno VARCHAR(10) NOT NULL PRIMARY KEY,
    apellido_paterno VARCHAR(15) NOT NULL,
    apellido_materno VARCHAR(15) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    anio_ingreso NUMERIC(10) NOT NULL,
    situ_academica VARCHAR(30) NOT NULL COMMENT 'Observado, Regular',
    correo VARCHAR(30) NOT NULL,
    promedio_ponderado NUMERIC(30,3) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 
INSERT IGNORE INTO Alumno (cod_alumno, apellido_paterno, apellido_materno, nombre, anio_ingreso, situ_academica, correo, promedio_ponderado,password)
VALUES ('1', 'ApellidoPaterno1', 'ApellidoMaterno1', 'Nombre1', 2023, 'Observado', 'correo1@example.com', 8.5,'123');

-- Esta consulta intentará insertar un nuevo registro, pero si encuentra un valor existente en la columna cod_alumno, lo ignorará y no generará un error.
