import * as yup from "yup";

export class Especie {
  editado: string;
  nombre: string;
  clasificacion: string;
  personas: string[];
  colores_ojos: string;
  creado: string;
  designacion: string;
  colores_piel: string;
  lenguaje: string;
  url: string;
  colores_cabello: string;
  planeta_origen: string;
  peliculas: string[];
  esperanza_vida_promedio: string;
  altura_promedio: string;

  constructor(data: {
    editado: string;
    nombre: string;
    clasificacion: string;
    personas: string[];
    colores_ojos: string;
    creado: string;
    designacion: string;
    colores_piel: string;
    lenguaje: string;
    url: string;
    colores_cabello: string;
    planeta_origen: string;
    peliculas: string[];
    esperanza_vida_promedio: string;
    altura_promedio: string;
  }) {
    this.editado = data.editado;
    this.nombre = data.nombre;
    this.clasificacion = data.clasificacion;
    this.personas = data.personas;
    this.colores_ojos = data.colores_ojos;
    this.creado = data.creado;
    this.designacion = data.designacion;
    this.colores_piel = data.colores_piel;
    this.lenguaje = data.lenguaje;
    this.url = data.url;
    this.colores_cabello = data.colores_cabello;
    this.planeta_origen = data.planeta_origen;
    this.peliculas = data.peliculas;
    this.esperanza_vida_promedio = data.esperanza_vida_promedio;
    this.altura_promedio = data.altura_promedio;
  }
}


export const especieSchema = yup.object().shape({
  editado: yup.string().required(),
  nombre: yup.string().required(),
  clasificacion: yup.string().required(),
  personas: yup.array().of(yup.string().required()).required(),
  colores_ojos: yup.string().required(),
  creado: yup.string().required(),
  designacion: yup.string().required(),
  colores_piel: yup.string().required(),
  lenguaje: yup.string().required(),
  url: yup.string().required(),
  colores_cabello: yup.string().required(),
  planeta_origen: yup.string().required(),
  peliculas: yup.array().of(yup.string().required()).required(),
  esperanza_vida_promedio: yup.string().required(),
  altura_promedio: yup.string().required(),
});
