CREATE DEFINER=`coesgrmbpol1e57z`@`%` PROCEDURE `insertarCliente`(IN idUbicacion int(11),IN cedula varchar(45),IN nombre varchar(45), IN telefono varchar(45))
BEGIN

	IF EXISTS 
		(select idUbicacion from Ubicacion where Ubicacion.idUbicacion =idUbicacion)
    THEN 
	Insert into Cliente (
		cedula,
        nombre,
        telefono,
        idUbicacion 
    )values(
		cedula,
        nombre,
        telefono,
        idUbicacion  
    );
    
    END IF ;
END