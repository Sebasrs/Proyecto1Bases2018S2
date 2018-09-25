DELIMITER $$
CREATE PROCEDURE asignarMecanico(mecanicoID INT, tallerId INT)
BEGIN
	UPDATE Mecanico
    SET IdTaller = tallerId
    WHERE IdMecanico = mecanicoId;
END$$
DELIMITER ;