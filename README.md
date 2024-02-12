# Serverless - AWS Node.js Typescript

Back end integrado con la API SWAPI en serverless framework.

## Prerrequisitos

- [`serverless-framework`](https://github.com/serverless/serverless)
- [`node.js`](https://nodejs.org)
- [`npm`](https://www.npmjs.com/)

## Instalación

Sigue estos pasos para instalar el proyecto:

1. Clona el repositorio en tu máquina local usando `git clone https://github.com/FernandoCandela/aws-node-fcm.git`.
2. Navega al directorio del proyecto con `cd aws-node-fcm`.
3. Instala las dependencias del proyecto con `npm install`.
4. Crea una copia del archivo `.env.example` y renómbralo a `.env`. Luego, rellena las variables de entorno necesarias.

## Ejecución local

Para ejecutar el proyecto localmente, utiliza: `npm run dev`.

Ahora, el servidor debería estar corriendo en `http://localhost:3000`.

## Pruebas

Para ejecutar las pruebas, utiliza `npm run test`.

## Despliegue de Stack en AWS

Para desplegar el proyecto, usa el siguiente comando: `npm run deploy`.

## Remover Stack en AWS

Para remover el stack de aws, usa el siguiente comando: `npm run remove`.

## API Endpoints

### `POST /entity/`

Este endpoint almacena la entidad dependiendo del el tipo de entidad elegido.

**Parámetros:**

- `entityType`: El tipo de entidad. Debe ser uno de los siguientes: 'people', 'films', 'planets', 'species', '
  starships', 'vehicles'.
- `entity`: Entidad a guardar. Esta tiene que tener la estructura de la entidad correspondiente.

**Ejemplo de solicitud:**

```json
[
  {
    "entity_type": "people",
    "entity": {
      "naves_estelares": [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
      ],
      "editado": "2014-12-20T21:17:56.891000Z",
      "nombre": "Luke Skywalker",
      "creado": "2014-12-09T13:50:51.644000Z",
      "url": "https://swapi.dev/api/people/1/",
      "genero": "masculino",
      "vehiculos": [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
      ],
      "color_piel": "clara",
      "color_cabello": "rubio",
      "altura": "172",
      "color_ojos": "azules",
      "masa": "77",
      "peliculas": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
      ],
      "especies": [
        "https://swapi.dev/api/species/1/"
      ],
      "planeta_natal": "https://swapi.dev/api/planets/1/",
      "anio_nacimiento": "19 BBY"
    }
  }
]
```

**Ejemplo de respuesta:**

```json
[
  {
    "entity_type": "people",
    "entity": {
      "naves_estelares": [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
      ],
      "editado": "2014-12-20T21:17:56.891000Z",
      "nombre": "Luke Skywalker",
      "creado": "2014-12-09T13:50:51.644000Z",
      "url": "https://swapi.dev/api/people/1/",
      "genero": "masculino",
      "vehiculos": [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
      ],
      "color_piel": "clara",
      "color_cabello": "rubio",
      "altura": "172",
      "color_ojos": "azules",
      "masa": "77",
      "peliculas": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
      ],
      "especies": [
        "https://swapi.dev/api/species/1/"
      ],
      "planeta_natal": "https://swapi.dev/api/planets/1/",
      "anio_nacimiento": "19 BBY"
    },
    "code": null,
    "origin": "local",
    "id": "8fb267fb-6880-4f28-99b3-37f5755e91fb"
  }
]
```

### `GET /entity?entityType=films&code=1&id=8fb267fb-6880-4f28-99b3-37f5755e91fb`

Este endpoint devuelve una entidad o lista segun los parametros ingresados.

- Si no se ingresan parametros, devuelve todas las entidades guardadas.
- Si solo se ingresa entityType, se buscará en la BD las entidades de ese tipo.
- Si se ingresa id, se buscará en la BD la entidad con ese id.
- Si se ingresa code y entityType, se buscará en la BD los datos, si estos datos no se encuentran. Esta búsqueda se
  realizará en la API SWAPI y se almacenará para futuras búsquedas.

**Parámetros:**

- `entityType`: (Opcional) El tipo de entidad. Debe ser uno de los siguientes: 'people', 'films', 'planets', '
  species', 'starships', 'vehicles'.
- `code`: (Opcional) Codigo de la API SWAPI.
- `id`: (Opcional) Id de la entidad a buscar (Id retornada en el metodo POST en formato uuid).

**Ejemplo de respuesta:**

```json
[
  {
    "entity_type": "films",
    "code": 1,
    "entity": {
      "titulo": "A New Hope",
      "episodio_id": 4,
      "introduccion": "....",
      "director": "George Lucas",
      "productor": "Gary Kurtz, Rick McCallum",
      "fecha_lanzamiento": "1977-05-25",
      "personajes": [
        "https://swapi.py4e.com/api/people/1/",
        "https://swapi.py4e.com/api/people/2/",
        "https://swapi.py4e.com/api/people/3/",
        "https://swapi.py4e.com/api/people/4/",
        "https://swapi.py4e.com/api/people/5/",
        "https://swapi.py4e.com/api/people/6/",
        "https://swapi.py4e.com/api/people/7/",
        "https://swapi.py4e.com/api/people/8/",
        "https://swapi.py4e.com/api/people/9/",
        "https://swapi.py4e.com/api/people/10/",
        "https://swapi.py4e.com/api/people/12/",
        "https://swapi.py4e.com/api/people/13/",
        "https://swapi.py4e.com/api/people/14/",
        "https://swapi.py4e.com/api/people/15/",
        "https://swapi.py4e.com/api/people/16/",
        "https://swapi.py4e.com/api/people/18/",
        "https://swapi.py4e.com/api/people/19/",
        "https://swapi.py4e.com/api/people/81/"
      ],
      "planetas": [
        "https://swapi.py4e.com/api/planets/1/",
        "https://swapi.py4e.com/api/planets/2/",
        "https://swapi.py4e.com/api/planets/3/"
      ],
      "naves_estelares": [
        "https://swapi.py4e.com/api/starships/2/",
        "https://swapi.py4e.com/api/starships/3/",
        "https://swapi.py4e.com/api/starships/5/",
        "https://swapi.py4e.com/api/starships/9/",
        "https://swapi.py4e.com/api/starships/10/",
        "https://swapi.py4e.com/api/starships/11/",
        "https://swapi.py4e.com/api/starships/12/",
        "https://swapi.py4e.com/api/starships/13/"
      ],
      "vehiculos": [
        "https://swapi.py4e.com/api/vehicles/4/",
        "https://swapi.py4e.com/api/vehicles/6/",
        "https://swapi.py4e.com/api/vehicles/7/",
        "https://swapi.py4e.com/api/vehicles/8/"
      ],
      "especies": [
        "https://swapi.py4e.com/api/species/1/",
        "https://swapi.py4e.com/api/species/2/",
        "https://swapi.py4e.com/api/species/3/",
        "https://swapi.py4e.com/api/species/4/",
        "https://swapi.py4e.com/api/species/5/"
      ],
      "creado": "2014-12-10T14:23:31.880000Z",
      "editado": "2014-12-20T19:49:45.256000Z",
      "url": "https://swapi.py4e.com/api/films/1/"
    },
    "origin": "swapi",
    "id": "785cc4b2-9818-481e-be4b-bac09f32a1fb"
  }
]
```
