CREATE DEFINER=`coesgrmbpol1e57z`@`%` PROCEDURE `crearReparacion`(IN fecha date,IN cantidadHoras int(11),IN idCoche int(11),IN idMecanico int(11))
BEGIN

	IF EXISTS 
		(select idCoche from Coche where Coche.idCoche =idCoche AND (select idMecanico from Mecanico where Mecanico.idMecanico=idMecanico))
    THEN 
	Insert into Reparacion (
		Fecha,
        CantidadDeHoras,
        IdCoche,
        IdMecanico
    )values(
		fecha,
        cantidadHoras,
        idCoche,
        idMecanico
    );
	ELSE 
		select "no existe idCoche o idMecanico";
    END IF ;
END