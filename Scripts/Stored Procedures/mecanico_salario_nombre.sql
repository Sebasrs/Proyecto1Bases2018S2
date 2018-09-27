CREATE DEFINER=`coesgrmbpol1e57z`@`%` PROCEDURE `mecanico_salario_nombre`(nombre VARCHAR(50), salarioMinimo INT, salarioMaximo INT)
BEGIN
	SELECT * FROM Mecanico
	WHERE	 Apellido1 LIKE nombre AND
			 Salario BETWEEN salarioMinimo AND salarioMaximo
	ORDER BY Salario;

END