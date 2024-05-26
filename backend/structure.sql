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

CREATE TABLE CATEGORY (
  ID INT NOT NULL AUTO_INCREMENT,
  ID_topic INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_topic) REFERENCES TOPIC(ID)
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



-- -- INSERCIONES
INSERT INTO USER (username, password, mail, name, last_name) VALUES 
  ('user1', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user1@example.com', 'John', 'Doe'), -- password
  ('user2', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user2@example.com', 'Jane', 'Smith'), -- password
  ('user3', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user3@example.com', 'Michael', 'Johnson'), -- password
  ('user4', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user4@example.com', 'Emily', 'Brown'), -- password
  ('user5', '$2a$12$WYq.d5ylOCb8X27fECGOAe93AdcqkUFk36gS2MZ3PZOV8lRlTfvCW', 'user5@example.com', 'William', 'Taylor'); -- password

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
