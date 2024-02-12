import * as yup from "yup";

export class Personas {
  naves_estelares: string[];
  editado: string;
  nombre: string;
  creado: string;
  url: string;
  genero: string;
  vehiculos: string[];
  color_piel: string;
  color_cabello: string;
  altura: string;
  color_ojos: string;
  masa: string;
  peliculas: string[];
  especies: string[];
  planeta_natal: string;
  anio_nacimiento: string;

  constructor(data: {
    naves_estelares: string[];
    editado: string;
    nombre: string;
    creado: string;
    url: string;
    genero: string;
    vehiculos: string[];
    color_piel: string;
    color_cabello: string;
    altura: string;
    color_ojos: string;
    masa: string;
    peliculas: string[];
    especies: string[];
    planeta_natal: string;
    anio_nacimiento: string;
  }) {
    this.naves_estelares = data.naves_estelares;
    this.editado = data.editado;
    this.nombre = data.nombre;
    this.creado = data.creado;
    this.url = data.url;
    this.genero = data.genero;
    this.vehiculos = data.vehiculos;
    this.color_piel = data.color_piel;
    this.color_cabello = data.color_cabello;
    this.altura = data.altura;
    this.color_ojos = data.color_ojos;
    this.masa = data.masa;
    this.peliculas = data.peliculas;
    this.especies = data.especies;
    this.planeta_natal = data.planeta_natal;
    this.anio_nacimiento = data.anio_nacimiento;
  }
}

export const personasSchema = yup.object().shape({
  naves_estelares: yup.array().of(yup.string().required()).required(),
  editado: yup.string().required(),
  nombre: yup.string().required(),
  creado: yup.string().required(),
  url: yup.string().required(),
  genero: yup.string().required(),
  vehiculos: yup.array().of(yup.string().required()).required(),
  color_piel: yup.string().required(),
  color_cabello: yup.string().required(),
  altura: yup.string().required(),
  color_ojos: yup.string().required(),
  masa: yup.string().required(),
  peliculas: yup.array().of(yup.string().required()).required(),
  especies: yup.array().of(yup.string().required()).required(),
  planeta_natal: yup.string().required(),
  anio_nacimiento: yup.string().required(),
});

