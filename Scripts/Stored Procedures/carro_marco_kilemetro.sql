CREATE DEFINER=`coesgrmbpol1e57z`@`%` PROCEDURE `carro_marca_kilometro`(marca VARCHAR(50), kilometros INT)
BEGIN
	SELECT DISTINCT Modelo, Marca, Matricula, Kilometros FROM Coche
	LEFT JOIN Cliente
	ON		  Cliente.IdCliente = Coche.IdCliente
	WHERE	  Coche.IdCliente IS NOT NULL AND
			  Marca IN (marca) AND
              Coche.Kilometros = kilometros;
END