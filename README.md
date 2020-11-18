# vue-teams-test

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Notas del enunciando

- En esta vista será necesario poder buscar o filtrar y ordenar los equipos mostrados
- El usuario pueda añadir a favoritos tantos equipos como quiera.
  - En esta acción de favorito, añadir nota como comentario
- Click en los equipos vera a equipo con toda la info que la API nos ofrece
- Una vista de favoritos con los comentario que el usuario agregó
- También puede eliminar de favoritos

## Vistas:

### Listado de Equipos

Un listado de cards, con los siguientes datos, por lo menos: logo, colegio y color, o
colores (mostrarlo visualmente no el código hexadecimal).
Además, marcar de manera visual si está añadido a favoritos o no.
En las vistas de listado se podrá ordenar y filtrar y/o buscar.

### Listado de Favoritos

Este listado que sea similar al listado de Equipos, pero añadiendo los comentarios del usuario.
Que desde aquí se pueda eliminar cualquier equipo de favoritos.
En las vistas de listado se podrá ordenar y filtrar y/o buscar.

### Vista Individual

Una vista individual con toda la información posible que nos da la API.
Colegio, mascota, abreviatura, nombre alternativo, conferencia, división, colores y logo.
