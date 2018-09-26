USE xtfq8cowzznl7iwm;

CREATE TABLE Pais(
	IdPais INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(45),
    PRIMARY KEY(IdPais)
);

CREATE TABLE Provincia(
	IdProvincia INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(45),
    PRIMARY KEY(IdProvincia)
);

CREATE TABLE Estado(
	IdEstado INT NOT NULL AUTO_INCREMENT,
    Estado VARCHAR(45),
    PRIMARY KEY(IdEstado)
);

CREATE TABLE Color(
	IdColor INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(45),
    PRIMARY KEY(IdColor)
);

CREATE TABLE Ubicacion (
	IdUbicacion INT NOT NULL AUTO_INCREMENT,
    DireccionExacta VARCHAR(100),
    IdPais INT,
    IdProvincia INT,
    PRIMARY KEY(IdUbicacion),
    FOREIGN KEY(IdProvincia) REFERENCES Provincia(IdProvincia),
    FOREIGN KEY(IdPais) REFERENCES Pais(IdPais)
);

CREATE TABLE Cliente (
	IdCliente INT NOT NULL AUTO_INCREMENT,
    Cedula VARCHAR(45),
    Nombre VARCHAR(45),
    Telefono INT,
    IdUbicacion INT,
    PRIMARY KEY(IdCliente),
    FOREIGN KEY(IdUbicacion) REFERENCES Ubicacion(IdUbicacion)
);

CREATE TABLE Taller (
	IdTaller INT NOT NULL AUTO_INCREMENT,
    IdUbicacion INT,
    PRIMARY KEY(IdTaller),
    FOREIGN KEY(IdUbicacion) REFERENCES Ubicacion(IdUbicacion)
);

CREATE TABLE Mecanico (
	IdMecanico INT NOT NULL AUTO_INCREMENT,
    IdTaller INT,
    Cedula VARCHAR(45),
    Nombre VARCHAR(45),
    Apellido1 VARCHAR(45),
    Apellido2 VARCHAR(45),
    FechaDeContratacion DATE,
    Salario INT,
    PRIMARY KEY(IdMecanico),
    FOREIGN KEY(IdTaller) REFERENCES Taller(IdTaller)
);

CREATE TABLE Concesionario (
	IdConcesionario INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(45),
    IdTaller INT,
    IdUbicacion INT,
    PRIMARY KEY(IdConcesionario),
    FOREIGN KEY(IdUbicacion) REFERENCES Ubicacion(IdUbicacion),
    FOREIGN KEY(IdTaller) REFERENCES Taller(IdTaller)
);

CREATE TABLE Coche (
	IdCoche INT NOT NULL AUTO_INCREMENT,
    Matricula VARCHAR(45),
    Modelo VARCHAR(45),
    Marca VARCHAR(45),
    Kilometros INT,
    IdColor INT,
    IdEstado INT,
    IdCliente INT,
    IdConcesionario INT,
    PRIMARY KEY(IdCoche),
    FOREIGN KEY(IdColor) REFERENCES Color(IdColor),
    FOREIGN KEY(IdEstado) REFERENCES Estado(IdEstado),
    FOREIGN KEY(IdCliente) REFERENCES Cliente(IdCliente),
    FOREIGN KEY(IdConcesionario) REFERENCES Concesionario(IdConcesionario)
);

CREATE TABLE Ficha (
	IdFicha INT NOT NULL AUTO_INCREMENT,
    IdCoche INT,
    IdCliente INT,
    PRIMARY KEY(IdFicha),
    FOREIGN KEY(IdCoche) REFERENCES Coche(IdCoche),
    FOREIGN KEY(IdCliente) REFERENCES Cliente(IdCliente)
);

CREATE TABLE Reparacion (
    Fecha DATETIME,
    CantidadDeHoras INT,
    IdCoche INT,
    IdMecanico INT,
    FOREIGN KEY(IdCoche) REFERENCES Coche(IdCoche),
    FOREIGN KEY(IdMecanico) REFERENCES Mecanico(IdMecanico)
);