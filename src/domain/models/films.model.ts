import * as yup from "yup";

export class Pelicula {
  naves_estelares: string[];
  editado: string;
  planetas: string[];
  productor: string;
  titulo: string;
  url: string;
  fecha_lanzamiento: string;
  vehiculos: string[];
  episodio_id: number;
  director: string;
  creado: string;
  introduccion: string;
  personajes: string[];
  especies: string[];

  constructor(data: {
    naves_estelares: string[];
    editado: string;
    planetas: string[];
    productor: string;
    titulo: string;
    url: string;
    fecha_lanzamiento: string;
    vehiculos: string[];
    episodio_id: number;
    director: string;
    creado: string;
    introduccion: string;
    personajes: string[];
    especies: string[];
  }) {
    this.naves_estelares = data.naves_estelares;
    this.editado = data.editado;
    this.planetas = data.planetas;
    this.productor = data.productor;
    this.titulo = data.titulo;
    this.url = data.url;
    this.fecha_lanzamiento = data.fecha_lanzamiento;
    this.vehiculos = data.vehiculos;
    this.episodio_id = data.episodio_id;
    this.director = data.director;
    this.creado = data.creado;
    this.introduccion = data.introduccion;
    this.personajes = data.personajes;
    this.especies = data.especies;
  }
}


export const peliculaSchema = yup.object().shape({
  naves_estelares: yup.array().of(yup.string().required()).required(),
  editado: yup.string().required(),
  planetas: yup.array().of(yup.string().required()).required(),
  productor: yup.string().required(),
  titulo: yup.string().required(),
  url: yup.string().required(),
  fecha_lanzamiento: yup.string().required(),
  vehiculos: yup.array().of(yup.string().required()).required(),
  episodio_id: yup.number().required(),
  director: yup.string().required(),
  creado: yup.string().required(),
  introduccion: yup.string().required(),
  personajes: yup.array().of(yup.string().required()).required(),
  especies: yup.array().of(yup.string().required()).required(),
});
