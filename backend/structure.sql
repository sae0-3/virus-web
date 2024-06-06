DROP DATABASE IF EXISTS sansi_web;
CREATE DATABASE sansi_web;
USE sansi_web;


CREATE TABLE USER (
  ID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  mail CHAR(23) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  last_name VARCHAR(30),
  second_name VARCHAR(30),
  profile VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID)
);

CREATE TABLE CONTENT (
  ID INT NOT NULL AUTO_INCREMENT,
  ID_user INT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_user) REFERENCES USER(ID) ON DELETE CASCADE
);

CREATE TABLE TOPIC (
  ID INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT 1,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID) REFERENCES CONTENT(ID) ON DELETE CASCADE
);

CREATE TABLE COMMENT (
  ID INT NOT NULL,
  ID_topic INT NOT NULL,
  salient BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID) REFERENCES CONTENT(ID) ON DELETE CASCADE,
  FOREIGN KEY (ID_topic) REFERENCES TOPIC(ID) ON DELETE CASCADE
);

CREATE TABLE CATEGORY (
  ID INT NOT NULL AUTO_INCREMENT,
  ID_topic INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_topic) REFERENCES TOPIC(ID)
);

CREATE TABLE INTERESTE (
  ID_content INT NOT NULL,
  ID_user INT NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID_content, ID_user),
  FOREIGN KEY (ID_content) REFERENCES CONTENT(ID) ON DELETE CASCADE,
  FOREIGN KEY (ID_user) REFERENCES USER(ID) ON DELETE CASCADE
);

CREATE TABLE SAVE (
  ID_content INT NOT NULL,
  ID_user INT NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID_content, ID_user),
  FOREIGN KEY (ID_content) REFERENCES CONTENT(ID) ON DELETE CASCADE,
  FOREIGN KEY (ID_user) REFERENCES USER(ID) ON DELETE CASCADE
);

CREATE TABLE VISUALIZATION (
  ID INT NOT NULL AUTO_INCREMENT,
  ID_topic INT NOT NULL,
  ID_user INT NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_topic) REFERENCES TOPIC(ID) ON DELETE CASCADE,
  FOREIGN KEY (ID_user) REFERENCES USER(ID) ON DELETE CASCADE
);

CREATE TABLE MESSAGE (
  ID INT NOT NULL AUTO_INCREMENT,
  ID_user_origin INT NOT NULL,
  ID_user_destiny INT NOT NULL,
  content TEXT NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_user_origin) REFERENCES USER(ID) ON DELETE CASCADE,
  FOREIGN KEY (ID_user_destiny) REFERENCES USER(ID) ON DELETE CASCADE
);



-- -- INSERCIONES
INSERT INTO USER (username, password, mail, name, last_name, profile) VALUES 
  ('user1', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user1@example.com', 'John', 'Doe', 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'), -- password
  ('user2', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user2@example.com', 'Jane', 'Smith', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'), -- password
  ('user3', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user3@example.com', 'Michael', 'Johnson', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'), -- password
  ('user4', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user4@example.com', 'Emily', 'Brown', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'), -- password
  ('user5', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user5@example.com', 'William', 'Taylor', ''); -- password
  ('user6', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user5@example.com', 'William', 'Taylor', ''); -- password

INSERT INTO CONTENT (ID_user, description) VALUES
  (1, '## Title 1\n\nEste es un **texto resaltado**. Aquí tienes una tabla:\n\n| Encabezado 1 | Encabezado 2 |\n| ------------ | ------------ |\n| Valor 1      | Valor 2      |\n\nY aquí tienes un bloque de código:\n\n```javascript\nfunction saludar() {\n  console.log("¡Hola, mundo!");\n}\n```'),
  (2, '## Title 2\n\nEste es otro **texto resaltado**. Aquí tienes una lista:\n\n- Item 1\n- Item 2\n\nY aquí tienes otro bloque de código:\n\n```python\nprint("Hola, mundo")\n```'),
  (3, '## Title 3\n\nEste es un *texto en cursiva*. Aquí tienes una lista numerada:\n\n1. Elemento 1\n2. Elemento 2\n\nY aquí tienes un bloque de código:\n\n```java\nSystem.out.println("¡Hola, mundo!");\n```'),
  (4, '## Title 4\n\nEste es un ~~texto tachado~~. Aquí tienes una lista de tareas:\n\n- [x] Tarea 1\n- [ ] Tarea 2\n\nY aquí tienes otro bloque de código:\n\n```c\nprintf("¡Hola, mundo!");\n```'),
  (5, '## Title 5\n\nEste es un enlace a [Google](https://www.google.com/). Aquí tienes una cita:\n\n> Esto es una cita.\n\nY aquí tienes un bloque de código:\n\n```ruby\nputs "¡Hola, mundo!"\n```'),
  (1, '### Comentario 1 en Topic 1\n\nEste es un *comentario* con **texto resaltado**.'),
  (2, '### Comentario 1 en Topic 2\n\nEste es otro *comentario* con **texto resaltado** y un bloque de código:\n\n```java\nSystem.out.println("¡Hola, mundo!");\n```'),
  (1, '### Comentario 1 en Topic 3\n\nEste es un *comentario* con _texto en cursiva_.'),
  (3, '### Comentario 1 en Topic 4\n\nEste es otro *comentario* con ~~texto tachado~~ y una lista de tareas:\n\n- [x] Tarea 1\n- [ ] Tarea 2'),
  (3, '### Comentario 1 en Topic 5\n\nEste es un *comentario* con [un enlace](https://www.example.com) y una cita:\n\n> Esto es una cita.');

INSERT INTO TOPIC (ID, title) VALUES
  (1, 'Title 1'),
  (2, 'Title 2'),
  (3, 'Title 3'),
  (4, 'Title 4'),
  (5, 'Title 5');

INSERT INTO COMMENT (ID, ID_topic) VALUES
  (6, 1),
  (7, 1),
  (8, 1),
  (9, 2),
  (10, 5);

INSERT INTO MESSAGE (ID_user_origin, ID_user_destiny, content) VALUES
  (1, 2, 'Hola, ¿cómo estás?'),
  (2, 3, '¡Todo bien! ¿Y tú?'),
  (3, 1, 'Yo también estoy bien. ¿Qué estás haciendo?'),
  (1, 4, 'No mucho, solo navegando por internet. ¿Y tú?'),
  (4, 3, 'Estoy trabajando en un proyecto nuevo. Es bastante interesante.'),
  (3, 2, '¡Suena genial! ¿De qué trata el proyecto?'),
  (2, 1, 'Es una aplicación para ayudar a las personas a organizar sus tareas.'),
  (1, 3, '¡Eso es muy útil! Me encantaría probarla.'),
  (3, 4, '¡Claro que sí! Te enviaré un enlace cuando esté lista.'),
  (4, 2, '¡Gracias! Espero con ansias verla.'),
  (2, 1, '¿Y qué más estás haciendo hoy?'),
  (1, 4, 'Más tarde voy a ir al gimnasio.'),
  (4, 3, '¡Buena idea! El ejercicio es importante.'),
  (3, 2, 'Sí, lo sé. A veces me da pereza, pero luego me siento mucho mejor después.'),
  (2, 1, '¡Lo mismo me pasa a mí! Pero hay que ser constantes.'),
  (1, 3, '¿Y qué planes tienes para el fin de semana?'),
  (3, 4, 'Todavía no lo sé, pero creo que voy a salir con unos amigos.'),
  (4, 2, '¡Suena divertido! ¿Qué van a hacer?'),
  (2, 1, 'No lo hemos decidido todavía, pero tal vez vayamos al cine o a un restaurante.'),
  (1, 3, '¡Que lo pasen bien! Yo creo que me voy a quedar en casa y relajarme.');
