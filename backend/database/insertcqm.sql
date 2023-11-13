-- -------------------------------------
INSERT INTO Cupo (id_cupo, cupos_asignados, cupos_ocupados) VALUES
('cupo1', 50, 40),
('cupo2', 45, 35),
('cupo3', 30, 25),
('cupo4', 50, 45),
('cupo5', 40, 30),
('cupo6', 45, 35),
('cupo7', 50, 40),
('cupo8', 35, 28),
('cupo9', 40, 32),
('cupo10', 50, 45);

["cupo1", "cupo2", "cupo3", "cupo4", "cupo5", "cupo6", "cupo7", "cupo8", "cupo9", "cupo10"]

-- -------------

INSERT INTO Horario (id_horario, dia, hora_inicio, hora_fin) VALUES
('horario1', 'Lunes', 8, 12),   -- Clase de 4 horas a partir de las 8 am
('horario2', 'Miércoles', 14, 17),  -- Clase de 3 horas a partir de las 2 pm
('horario3', 'Viernes', 18, 21),   -- Clase de 3 horas a partir de las 6 pm
('horario4', 'Martes', 8, 11),   -- Clase de 3 horas a partir de las 8 am
('horario5', 'Jueves', 14, 17),  -- Clase de 3 horas a partir de las 2 pm
('horario6', 'Sábado', 18, 21),   -- Clase de 3 horas a partir de las 6 pm
('horario7', 'Lunes', 19, 22),   -- Clase de 3 horas a partir de las 7 pm
('horario8', 'Miércoles', 8, 12),   -- Clase de 4 horas a partir de las 8 am
('horario9', 'Viernes', 14, 17),   -- Clase de 3 horas a partir de las 2 pm
('horario10', 'Martes', 19, 22);   -- Clase de 3 horas a partir de las 7 pm

["horario1", "horario2", "horario3", "horario4", "horario5", "horario6", "horario7", "horario8", "horario9", "horario10"]

-- --------------------------

INSERT INTO Tipo_Rectificacion (id_tipo_recti, descripcion) VALUES
('recti1', 'Retiro'),
('recti2', 'Cambio'),
('recti3', 'Ingreso');

["recti1", "recti2", "recti3"]
