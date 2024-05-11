DROP DATABASE IF EXISTS sansi_web;
CREATE DATABASE sansi_web;
USE sansi_web;


CREATE TABLE USUARIO (
  ID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  correo_electronico CHAR(23) NOT NULL UNIQUE,
  nombre VARCHAR(50) NOT NULL,
  apellido_paterno VARCHAR(30),
  apellido_materno VARCHAR(30),
  foto_perfil VARCHAR(255) NOT NULL,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID)
);

CREATE TABLE CATEGORIA (
  ID INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE CONTENIDO (
  ID INT NOT NULL AUTO_INCREMENT,
  ID_usuario INT NOT NULL,
  descripcion TEXT NOT NULL,
  fecha_publicacion TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_usuario) REFERENCES USUARIO(ID)
);

CREATE TABLE TEMA (
  ID INT NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT 1,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID) REFERENCES CONTENIDO(ID)
);

CREATE TABLE COMENTARIO (
  ID INT NOT NULL,
  ID_tema INT NOT NULL,
  destacado BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID) REFERENCES CONTENIDO(ID),
  FOREIGN KEY (ID_tema) REFERENCES TEMA(ID)
);

CREATE TABLE ME_INTERESA (
  ID_contenido INT NOT NULL,
  ID_usuario INT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID_contenido, ID_usuario),
  FOREIGN KEY (ID_contenido) REFERENCES CONTENIDO(ID),
  FOREIGN KEY (ID_usuario) REFERENCES USUARIO(ID)
);

CREATE TABLE GUARDADO (
  ID_contenido INT NOT NULL,
  ID_usuario INT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID_contenido, ID_usuario),
  FOREIGN KEY (ID_contenido) REFERENCES CONTENIDO(ID),
  FOREIGN KEY (ID_usuario) REFERENCES USUARIO(ID)
);

CREATE TABLE R_TEMA_CATEGORIA (
  ID_tema INT NOT NULL,
  ID_categoria INT NOT NULL,
  PRIMARY KEY (ID_tema, ID_categoria),
  FOREIGN KEY (ID_tema) REFERENCES TEMA(ID),
  FOREIGN KEY (ID_categoria) REFERENCES CATEGORIA(ID)
);

CREATE TABLE VISUALIZACION (
  ID INT NOT NULL AUTO_INCREMENT,
  ID_tema INT NOT NULL,
  ID_usuario INT NOT NULL,
  fecha_visualizacion TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_tema) REFERENCES TEMA(ID),
  FOREIGN KEY (ID_usuario) REFERENCES USUARIO(ID)
);



-- INSERCIONES
INSERT INTO USUARIO (username, password, correo_electronico, nombre, apellido_paterno, apellido_materno, foto_perfil)
VALUES
  ('usuario1', 'pass1', '2000000001@est.umss.edu', 'Juan', 'Pérez', 'González', 'https://randomuser.me/api/portraits/men/74.jpg'),
  ('usuario2', 'pass2', '2000000002@est.umss.edu', 'María', 'García', 'López', 'https://randomuser.me/api/portraits/women/74.jpg'),
  ('usuario3', 'pass3', '2000000003@est.umss.edu', 'Carlos', 'Martínez', NULL, 'https://randomuser.me/api/portraits/men/30.jpg'),
  ('usuario4', 'pass4', '2000000004@est.umss.edu', 'Laura', 'Fernández', 'Sánchez', 'https://randomuser.me/api/portraits/women/30.jpg'),
  ('usuario5', 'pass5', '2000000005@est.umss.edu', 'Pedro', 'Díaz', 'Gómez', 'https://randomuser.me/api/portraits/men/31.jpg'),
  ('usuario6', 'pass6', '2000000006@est.umss.edu', 'Ana', 'Rodríguez', 'Hernández', 'https://randomuser.me/api/portraits/women/30.jpg'),
  ('usuario7', 'pass7', '2000000007@est.umss.edu', 'Miguel', 'López', NULL, 'https://randomuser.me/api/portraits/men/2.jpg'),
  ('usuario8', 'pass8', '2000000008@est.umss.edu', 'Sofía', 'Pérez', 'Martínez', 'https://randomuser.me/api/portraits/women/2.jpg'),
  ('usuario9', 'pass9', '2000000009@est.umss.edu', 'Javier', 'Gómez', NULL, 'https://randomuser.me/api/portraits/men/10.jpg'),
  ('usuario10', 'pass10', '2000000010@est.umss.edu', 'Elena', 'Sánchez', 'Martínez', 'https://randomuser.me/api/portraits/women/10.jpg');

INSERT INTO CATEGORIA (nombre) VALUES
  ('Matemáticas'),
  ('Física'),
  ('Programación'),
  ('Programación Funcional'),
  ('Estructuras de Datos'),
  ('Algoritmos'),
  ('Redes de Computadoras'),
  ('Sistemas Operativos'),
  ('Ingeniería de Software'),
  ('Bases de Datos'),
  ('Inteligencia Artificial'),
  ('Seguridad Informática'),
  ('Análisis y Diseño de Sistemas'),
  ('Desarrollo Web'),
  ('Desarrollo Móvil'),
  ('Computación en la Nube'),
  ('Arquitectura de Computadores'),
  ('Sistemas Embebidos'),
  ('Ingeniería de Requisitos'),
  ('Interacción Humano-Computadora');

INSERT INTO CONTENIDO (ID_usuario, descripcion) VALUES
  (1, "## Criptografía y Teoría de Números\n\nLa criptografía moderna se basa en principios matemáticos sólidos, especialmente en la teoría de números. En este tema, discutiremos cómo se aplican los conceptos de teoría de números en el diseño de sistemas de cifrado y cómo estas técnicas protegen la información en el mundo digital.\n\n| **Contenido** | **Autor** | **Fecha de Publicación** |\n|---------------|-----------|--------------------------|\n| [Criptografía Post-Clásica: Aplicaciones y Desafíos](https://example.com/criptografia) | Juan Pérez | 2024-05-05 |\n| [Principios de RSA y su Aplicación en la Seguridad Informática](https://example.com/rsa) | María García | 2024-05-06 |\n\n![Imagen de Criptografía](https://isohub.org/wp-content/uploads/2021/10/criptografia_isohub.png)"),
  (4, "## Física cuántica y sus aplicaciones en computación\n\bLa física cuántica está revolucionando el mundo de la computación. En este tema, exploraremos cómo los principios de la mecánica cuántica se aplican en el diseño de computadoras cuánticas y cómo estas pueden resolver problemas que son prácticamente imposibles de abordar para las computadoras clásicas.\n\n| **Contenido** | **Autor** | **Fecha de Publicación** |\n|---------------|-----------|--------------------------|\n| [Computación Cuántica: Del Laboratorio a la Realidad](https://example.com/computacion-cuantica) | Carlos Martínez | 2024-05-07 |\n| [Simulaciones Cuánticas y su Impacto en la Industria](https://example.com/simulaciones-cuanticas) | Laura Fernández | 2024-05-08 |\n\n![Imagen de Física Cuántica](https://planetario.montevideo.gub.uy/sites/planetario.montevideo.gub.uy/files/articulos/imagenes/fisica_cuantica_22.jpg)"),
  (5, "## Introducción a la programación funcional con Haskell\n\nHaskell es un lenguaje de programación funcional puro que ha ganado popularidad en los últimos años. En este tema, aprenderemos los conceptos básicos de Haskell y cómo su enfoque funcional puede conducir a un código más claro y conciso.\n\n| **Contenido** | **Autor** | **Fecha de Publicación** |\n|---------------|-----------|--------------------------|\n| [Fundamentos de Haskell: Sintaxis y Tipos de Datos](https://example.com/fundamentos-haskell) | Pedro Díaz | 2024-05-09 |\n| [Programación Funcional en la Práctica: Ejemplos y Ejercicios](https://example.com/programacion-funcional) | Ana Rodríguez | 2024-05-10 |\n\n![Imagen de Haskell](https://example.com/haskell.jpg)"),
  (7, "Comentario prueba, no tomar importancia!!!"),
  (3, "Comentario prueba, no tomar importancia 2!!!"),
  (1, "Comentario prueba, no tomar importancia 3!!!"),
  (7, "Comentario prueba, no tomar importancia 4!!!"),
  (2, "Comentario prueba, no tomar importancia 5!!!"),
  (9, "Comentario prueba, no tomar importancia 6!!!");

INSERT INTO TEMA (ID, titulo) VALUES
  (1, "Un poco sobre ciptografia"),
  (2, "¿Es realmente importante saber sobre la fisica cuantica?"),
  (3, "¡Desarrollando nuevas habilidades, rompiendo tus fronteras!");

INSERT INTO COMENTARIO (ID, ID_tema) VALUES
  (4, 3),
  (5, 3),
  (6, 3),
  (7, 3),
  (8, 3),
  (9, 3);

INSERT INTO R_TEMA_CATEGORIA (ID_tema, ID_categoria) VALUES
  (1, 1),
  (1, 6),
  (1, 11),
  (1, 12),
  (2, 2),
  (2, 17),
  (3, 3),
  (3, 4),
  (3, 5),
  (3, 6);

INSERT INTO VISUALIZACION (ID_tema, ID_usuario) VALUES
  (1, 10),
  (1, 7),
  (2, 7),
  (2, 1),
  (1, 2),
  (1, 2),
  (3, 8),
  (3, 9),
  (3, 4),
  (3, 8),
  (3, 9),
  (3, 4),
  (3, 8),
  (3, 9),
  (3, 4),
  (1, 7);



-- ACTUALIZACIONES
UPDATE TEMA SET activo = 0 WHERE ID = 2;
