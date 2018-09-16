CREATE PROCEDURE `comprarCoche` (cocheId INT, clienteId INT)
BEGIN
	INSERT INTO Ficha (IdCoche, IdCliente)
    VALUES (cocheId, clienteId);
    
    UPDATE Coche
    SET IdCliente = clienteId
    WHERE IdCoche = cocheId;
END