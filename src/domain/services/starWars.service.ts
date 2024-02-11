import { getInputSchema, postInputSchema } from "../models/starWars.model";
import StarWarsRepository from "../../infrastructure/repositories/starWars.repository";
import { Personas, personasSchema } from "../models/people.model";
import { Entities, Origin } from "../../utils/constants";
import { Pelicula, peliculaSchema } from "../models/films.model";
import { Planeta, planetaSchema } from "../models/planets.model";
import { Especie, especieSchema } from "../models/species.model";
import { NaveEstelar, naveEstelarSchema } from "../models/starships.model";
import { Vehiculo, vehiculoSchema } from "../models/vehicles.model";
import { getEntityById } from "../../infrastructure/integrations/swapi";

const starWarsRepository: StarWarsRepository = new StarWarsRepository();

export async function saveEntity(entity: any): Promise<any> {
  await validateEntity(entity);

  return await starWarsRepository.createEntity(entity);
}

export async function getEntity(entityType: string, codeStr: string): Promise<any> {
  const code: number = parseInt(codeStr);
  await getInputSchema.validate({ entityType, code }, { abortEarly: false });

  const response = await starWarsRepository.getEntityByEntityTypeAndCode(entityType, code);

  if (!response) {
    const swapiResponse: any = await getEntityById(entityType, code);
    const translatedData = await translateData(swapiResponse, entityType);
    const entity = {
      entity_type: entityType,
      code,
      entity: translatedData,
      origin: Origin.SWAPI,
    };
    return await saveEntity(entity);
  }

  return response;
}

async function translateData(entity: any, entityType: string): Promise<any> {
  switch (entityType) {
    case Entities.PEOPLE :
      return translatePeople(entity);
    case Entities.FILMS:
      return translateFilm(entity);
    case Entities.PLANETS:
      return translatePlanet(entity);
    case Entities.SPECIES:
      return translateSpecies(entity);
    case Entities.STARSHIPS:
      return translateStarship(entity);
    case Entities.VEHICLES:
      return translateVehicle(entity);
    default:
      throw new Error(`Unsupported entity type: ${entity.entity_type}`);
  }
}

async function validateEntity(entity: any): Promise<void> {
  await postInputSchema.validate(entity, { abortEarly: false });

  switch (entity.entity_type) {
    case Entities.PEOPLE :
      entity.entity = entity.entity as Personas;
      await personasSchema.validate(entity.entity, { abortEarly: false });
      break;
    case Entities.FILMS:
      entity.entity = entity.entity as Pelicula;
      await peliculaSchema.validate(entity.entity, { abortEarly: false });
      break;
    case Entities.PLANETS:
      entity.entity = entity.entity as Planeta;
      await planetaSchema.validate(entity.entity, { abortEarly: false });
      break;
    case Entities.SPECIES:
      entity.entity = entity.entity as Especie;
      await especieSchema.validate(entity.entity, { abortEarly: false });
      break;
    case Entities.STARSHIPS:
      entity.entity = entity.entity as NaveEstelar;
      await naveEstelarSchema.validate(entity.entity, { abortEarly: false });
      break;
    case Entities.VEHICLES:
      entity.entity = entity.entity as Vehiculo;
      await vehiculoSchema.validate(entity.entity, { abortEarly: false });
      break;
  }
}

function translatePeople(people: any): Personas {
  return {
    nombre: people.name,
    altura: people.height,
    masa: people.mass,
    color_cabello: people.hair_color,
    color_piel: people.skin,
    color_ojos: people.eye_color,
    anio_nacimiento: people.birth_year,
    genero: people.gender,
    planeta_natal: people.homeworld,
    peliculas: people.films,
    especies: people.species,
    vehiculos: people.vehicles,
    naves_estelares: people.starships,
    creado: people.created,
    editado: people.edited,
    url: people.url,
  };
}

function translateFilm(film: any): Pelicula {
  return {
    titulo: film.title,
    episodio_id: film.episode_id,
    introduccion: film.opening_crawl,
    director: film.director,
    productor: film.producer,
    fecha_lanzamiento: film.release_date,
    personajes: film.characters,
    planetas: film.planets,
    naves_estelares: film.starships,
    vehiculos: film.vehicles,
    especies: film.species,
    creado: film.created,
    editado: film.edited,
    url: film.url,
  };
}

function translatePlanet(planet: any): Planeta {
  return {
    nombre: planet.name,
    diametro: planet.diameter,
    clima: planet.climate,
    agua_superficie: planet.surface_water,
    periodo_rotacion: planet.rotation_period,
    periodo_orbital: planet.orbital_period,
    poblacion: planet.population,
    terreno: planet.terrain,
    creado: planet.created,
    editado: planet.edited,
    url: planet.url,
    peliculas: planet.films,
    residentes: planet.residents,
    gravedad: planet.gravity,
  };
}

function translateSpecies(species: any): Especie {
  return {
    nombre: species.name,
    clasificacion: species.classification,
    designacion: species.designation,
    altura_promedio: species.average_height,
    colores_piel: species.skin,
    colores_cabello: species.hair,
    colores_ojos: species.eye_colors,
    esperanza_vida_promedio: species.average_lifespan,
    planeta_origen: species.homeworld,
    lenguaje: species.language,
    personas: species.people,
    peliculas: species.films,
    creado: species.created,
    editado: species.edited,
    url: species.url,
  };
}

function translateStarship(starship: any): NaveEstelar {
  return {
    nombre: starship.name,
    modelo: starship.model,
    fabricante: starship.manufacturer,
    costo_en_creditos: starship.cost_in_credits,
    longitud: starship.length,
    velocidad_max_atmosferica: starship.max_atmosphering_speed,
    tripulacion: starship.crew,
    pasajeros: starship.passengers,
    capacidad_carga: starship.cargo_capacity,
    consumibles: starship.consumables,
    calificacion_hiperimpulsor: starship.hyperdrive_rating,
    MGLT: starship.MGLT,
    clase_nave_estelar: starship.starship_class,
    pilotos: starship.pilots,
    peliculas: starship.films,
    creado: starship.created,
    editado: starship.edited,
    url: starship.url,

  };
}

function translateVehicle(vehicle: any): Vehiculo {
  return {
    nombre: vehicle.nombre,
    modelo: vehicle.model,
    fabricante: vehicle.manufacturer,
    costo_en_creditos: vehicle.cost_in_credits,
    longitud: vehicle.length,
    velocidad_max_atmosferica: vehicle.max_atmosphering_speed,
    tripulacion: vehicle.crew,
    pasajeros: vehicle.passengers,
    capacidad_carga: vehicle.cargo_capacity,
    consumibles: vehicle.consumables,
    clase_vehiculo: vehicle.vehicle_class,
    pilotos: vehicle.pilots,
    peliculas: vehicle.films,
    creado: vehicle.created,
    editado: vehicle.edited,
    url: vehicle.url,
  };
}
