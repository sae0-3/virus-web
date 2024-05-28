# PLATAFORMA DE DEBATE/AYUDA ESTUDIANTIL `SANSI-WEB`
### GRUPO: VIRUS


****
## TABLA DE CONTENIDO
* [DESCRIPCION](#descripcion)
  * [Foro Principal](#foro-principal)
  * [Chats](#chats)
* [HACER CORRER](#hacer-correr)
  * [Requisitos](#requisitos)
  * [Desarrollo](#desarrollo)
  * [Produccion](#produccion)
* [RECURSOS](#recursos)


****
<a name="descripcion"></a>
## DESCRIPCION

El sistema consiste en un foro/red social para preguntas referentes a ayudas academicas u otros temas relacionados a la universidad.

Al sistema podran registrase con el codigo sis y el proceso sera el siguiente:

- El nuevo usuario introduce su codigo sis
- El sistema envia un mensaje para confirmar el codigo sis a su correo institucional sis_proporcionado@est.umss.edu
- Para seguir con el registro el usuario debera de entrar al link que se le envio a su correo, de no hacerlo no podra seguir con el registro

<a name="foro-principal"></a>
### Foro Principal

Esta seccion va dirigido a la publicacion de hilos/posts de conversacion sobre temas puntuales, un post puede tener un titulo, diferentes tipos de etiquetas (relacionados al tema del que habla el post al estilo de reddit) y una descripcion.

Estos hilos podran estar en dos estados, activo o cerrado, si esta cerrado nadie mas podra comentar hasta que no se vuelva a abrir.

Por otra parte podran remarcarse (agregar algun tipo de distintivo) aquellas respuestas que agreguen mas valos a los posts.

<a name="chats"></a>
### Chats

De momento solo se podran enviar texto.

No existira grupos, solo chats privados.


****
<a name="hacer-correr"></a>
## HACER CORRER

<a name="requisitos"></a>
### Requisitos
  * Tener docker instalado (para windows [wsl2](https://learn.microsoft.com/es-es/windows/wsl/install))

<a name="desarrollo"></a>
### Desarrollo
1. Construir el contenedor
```hs
docker compose -f docker-compose-dev.yml up -d
```

2. Subir la base datos /backend/structure.sql (phpmyadmin activado en el puerto 80: `http://localhost`)

3. Identificar el id que se proporciono a los contenedores de node (`virus-web-nodejs-frontend-1` y `virus-web-nodejs-backend-1`)
```hs
docker container ls
```

4. Ingresar a la terminal interactiva de `virus-web-nodejs-backend-1`
```hs
docker exec -it <id_container> sh
```

5. Instalar pnpm (opcional)
```hs
npm install -g pnpm
```

6. Instalar los paquetes de desarrollo (de no haber instalado pnpm se usa npm)
```hs
pnpm install
```

7. Hacer correr el servidor de desarrollo
```hs
npm run dev
```

8. Abrir otra terminal

9. Volver al paso 3 y ahora hacerlo para `virus-web-nodejs-frontend-1`

10. Eliminar los contenedores
```hs
docker compose -f docker-compose-dev.yml down
```

<a name="produccion"></a>
### Produccion
Ejecutar:

```hs
docker compose up -d
```

****
<a name="recursos"></a>
## RECURSOS
* https://discuss.jsonapi.org/
* https://forum.codeselfstudy.com/
* https://medium.com/@mubashirhussain29/the-screaming-architecture-story-08750691291f

#### MARKDOWN
  * https://commonmark.org/
  * https://www.markdownguide.org/basic-syntax/

#### DOCKER
  * https://imaginaformacion.com/tutoriales/que-es-docker-compose

#### WSL2
  * https://youtu.be/3Tkkk3ePZKo?si=VU8f3UJ_zrznv3nx

#### JS
  * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
