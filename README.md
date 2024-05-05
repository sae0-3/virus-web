# Plataforma de Debate/Ayuda Estudiantil

## Grupo: VIRUS

## Descripcion

El sistema consiste en un foro/red social para preguntas referentes a ayudas academicas u otros temas relacionados a la universidad.
La pagina de inicio mostrara tres secciones: en la primera parte los nuevos anuncios, luego los nuevos posts, y por ultimo los usuarios destacados (aquellos que brindan informacion de relevancia).

Al sistema podran registrase con el codigo sis y el proceso sera el siguiente:

- El nuevo usuario introduce su codigo sis
- El sistema envia un mensaje para confirmar el codigo sis a su correo institucional sis_proporcionado@est.umss.edu
- Para seguir con el registro el usuario debera de entrar al link que se le envio a su correo, de no hacerlo no podra seguir con el registro

Dicho sistema se separa en tres secciones:

#### 1. Foro Principal

Esta seccion va dirigido a la publicacion de hilos/posts de conversacion sobre temas puntuales, un post puede tener un titulo, diferentes tipos de etiquetas (relacionados al tema del que habla el post al estilo de reddit) y una descripcion.

Estos hilos podran estar en dos estados, activo o cerrado, si esta cerrado nadie mas podra comentar hasta que no se vuelva a abrir.

Por otra parte podran remarcarse (agregar algun tipo de distintivo) aquellas respuestas que agreguen mas valos a los posts.

Los posts y comentarios podran contener unicamente texto e imagenes.

#### 2. Anuncios sobre ayudas (exclusivo para materias)

La seccion se centra en publicacion anuncios especificos para solicitar ayuda sobre una materia y tema en especifico.

Para la publicacion de estos anuncios se tendra un formulario especifico el cual pida el ingreso de la materia, el tema, uan descripcion sobre el problema, enlaces de referencia y si se tiene la intencion de brindar una remuneracion economica a aquellos que decidan contactarse.

Estos anuncios no podran ser comentados, tendran un boton el cual cree una conversacion (en la seccion de chats) con el que publico el anuncio para ver mas detalles por privado y llegar a un acuerdo.

#### 3. Chats

De momento solo se podran enviar texto e imagenes.

No existira grupos, solo chats privados.


****
## HACER CORRER
#### REQUISITOS
  * Tener docker instalado (para windows [wsl2](https://learn.microsoft.com/es-es/windows/wsl/install))

#### DESARROLLO
1. Construir el contenedor
```hs
docker compose -f docker-compose-dev.yml up -d
```

2. Identificar el id que se proporciono a los contenedores de node (`virus-web-nodejs-frontend-1` y `virus-web-nodejs-backend-1`)
```hs
docker container ls
```

3. Ingresar a la terminal interactiva de `virus-web-nodejs-backend-1`
```hs
docker exec -it <id_container> sh
```

4. Instalar pnpm (opcional)
```hs
npm install -g pnpm
```

5. Instalar los paquetes de desarrollo (de no haber instalado pnpm se usa npm)
```hs
pnpm install
```

6. Hacer correr el servidor de desarrollo
```hs
npm run dev
```

7. Abrir otra terminal

8. Volver al paso 3 y ahora hacerlo para `virus-web-nodejs-frontend-1`

9. Eliminar los contenedores
```hs
docker compose -f docker-compose-dev.yml down
```

#### PRODUCCION
Ejecutar:

```hs
docker compose up -d
```

****

## RECURSOS FRONTEND - BACKEND
* https://discuss.jsonapi.org/
* https://forum.codeselfstudy.com/

#### MARKDOWN
  * https://commonmark.org/
  * https://www.markdownguide.org/basic-syntax/

#### DOCKER
  * https://imaginaformacion.com/tutoriales/que-es-docker-compose

#### WSL2
  * https://youtu.be/3Tkkk3ePZKo?si=VU8f3UJ_zrznv3nx
