import * as yup from "yup";

export class Vehiculo {
  clase_vehiculo: string;
  pasajeros: string;
  pilotos: string[];
  nombre: string;
  creado: string;
  url: string;
  capacidad_carga: string;
  editado: string;
  consumibles: string;
  velocidad_max_atmosferica: string;
  tripulacion: string;
  longitud: string;
  peliculas: string[];
  modelo: string;
  costo_en_creditos: string;
  fabricante: string;

  constructor(data: {
    clase_vehiculo: string;
    pasajeros: string;
    pilotos: string[];
    nombre: string;
    creado: string;
    url: string;
    capacidad_carga: string;
    editado: string;
    consumibles: string;
    velocidad_max_atmosferica: string;
    tripulacion: string;
    longitud: string;
    peliculas: string[];
    modelo: string;
    costo_en_creditos: string;
    fabricante: string;
  }) {
    this.clase_vehiculo = data.clase_vehiculo;
    this.pasajeros = data.pasajeros;
    this.pilotos = data.pilotos;
    this.nombre = data.nombre;
    this.creado = data.creado;
    this.url = data.url;
    this.capacidad_carga = data.capacidad_carga;
    this.editado = data.editado;
    this.consumibles = data.consumibles;
    this.velocidad_max_atmosferica = data.velocidad_max_atmosferica;
    this.tripulacion = data.tripulacion;
    this.longitud = data.longitud;
    this.peliculas = data.peliculas;
    this.modelo = data.modelo;
    this.costo_en_creditos = data.costo_en_creditos;
    this.fabricante = data.fabricante;
  }
}


export const vehiculoSchema = yup.object().shape({
  clase_vehiculo: yup.string().required(),
  pasajeros: yup.string().required(),
  pilotos: yup.array().of(yup.string().required()).required(),
  nombre: yup.string().required(),
  creado: yup.string().required(),
  url: yup.string().required(),
  capacidad_carga: yup.string().required(),
  editado: yup.string().required(),
  consumibles: yup.string().required(),
  velocidad_max_atmosferica: yup.string().required(),
  tripulacion: yup.string().required(),
  longitud: yup.string().required(),
  peliculas: yup.array().of(yup.string().required()).required(),
  modelo: yup.string().required(),
  costo_en_creditos: yup.string().required(),
  fabricante: yup.string().required(),
});
