CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

GRANT ALL PRIVILEGES ON testdb.* TO 'fran'@'%';

CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha DATE
);

CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(255),
    direccion VARCHAR(255)
);

-- Datos de prueba para entorno de test

INSERT INTO eventos (titulo, descripcion, fecha) VALUES
('Reunión de proyecto', 'Reunión para discutir el avance del proyecto', '2023-05-15'),
('Conferencia de tecnología', 'Conferencia anual sobre nuevas tecnologías', '2023-06-20'),
('Workshop de desarrollo', 'Taller práctico de desarrollo de software', '2023-07-10'),
('Presentación de producto', 'Lanzamiento de nuevo producto', '2023-08-05'),
('Evento de networking', 'Encuentro para establecer contactos profesionales', '2023-09-12');

INSERT INTO contactos (nombre, telefono, email, direccion) VALUES
('Juan Pérez', '612345678', 'juan.perez@example.com', 'Calle Principal 123, Madrid'),
('María López', '623456789', 'maria.lopez@example.com', 'Avenida Central 45, Barcelona'),
('Carlos Rodríguez', '634567890', 'carlos.rodriguez@example.com', 'Plaza Mayor 7, Valencia'),
('Ana Martínez', '645678901', 'ana.martinez@example.com', 'Calle Nueva 89, Sevilla'),
('Pedro Sánchez', '656789012', 'pedro.sanchez@example.com', 'Paseo del Prado 34, Bilbao');