DELIMITER $$
CREATE PROCEDURE insertarCoche (nMatricula VARCHAR(45),
								Modelo VARCHAR(45),
                                nMarca VARCHAR(45),
                                nKilometros INT,
                                nColor INT,
                                nEstado INT,
                                nConcesionario INT)
BEGIN
	INSERT INTO Coche(Matricula, Modelo, Marca, Kilometros, IdColor, IdEstado, IdConcesionario)
	VALUES	(nMatricula, nModelo, nMarca, nKilometros, nColor, nEstado, nConcesionario);
END$$
DELIMITER ;