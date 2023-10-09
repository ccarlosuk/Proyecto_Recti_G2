SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `prueba` (
  `id` int(11) NOT NULL,
  `codigo` varchar(8) NOT NULL,
  `plan` varchar(4) NOT NULL,
  `situacion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


ALTER TABLE `prueba`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `prueba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1449;
COMMIT;


