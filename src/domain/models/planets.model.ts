import * as yup from "yup";

export class Planeta {
  diametro: string;
  clima: string;
  agua_superficie: string;
  nombre: string;
  creado: string;
  url: string;
  periodo_rotacion: string;
  editado: string;
  terreno: string;
  gravedad: string;
  periodo_orbital: string;
  peliculas: string[];
  residentes: string[];
  poblacion: string;

  constructor(data: {
    diametro: string;
    clima: string;
    agua_superficie: string;
    nombre: string;
    creado: string;
    url: string;
    periodo_rotacion: string;
    editado: string;
    terreno: string;
    gravedad: string;
    periodo_orbital: string;
    peliculas: string[];
    residentes: string[];
    poblacion: string;
  }) {
    this.diametro = data.diametro;
    this.clima = data.clima;
    this.agua_superficie = data.agua_superficie;
    this.nombre = data.nombre;
    this.creado = data.creado;
    this.url = data.url;
    this.periodo_rotacion = data.periodo_rotacion;
    this.editado = data.editado;
    this.terreno = data.terreno;
    this.gravedad = data.gravedad;
    this.periodo_orbital = data.periodo_orbital;
    this.peliculas = data.peliculas;
    this.residentes = data.residentes;
    this.poblacion = data.poblacion;
  }
}

export const planetaSchema = yup.object().shape({
  diametro: yup.string().required(),
  clima: yup.string().required(),
  agua_superficie: yup.string().required(),
  nombre: yup.string().required(),
  creado: yup.string().required(),
  url: yup.string().required(),
  periodo_rotacion: yup.string().required(),
  editado: yup.string().required(),
  terreno: yup.string().required(),
  gravedad: yup.string().required(),
  periodo_orbital: yup.string().required(),
  peliculas: yup.array().of(yup.string().required()).required(),
  residentes: yup.array().of(yup.string().required()).required(),
  poblacion: yup.string().required(),
});
