import { schema } from "../models/starWars.model";
import StarWarsRepository from "../../infrastructure/repositories/starWars.repository";
import { Personas, personasSchema } from "../models/people.model";
import { Entities } from "../../utils/constants";
import { Pelicula, peliculaSchema } from "../models/films.model";
import { Planeta, planetaSchema } from "../models/planets.model";
import { Especie, especieSchema } from "../models/species.model";
import { NaveEstelar, naveEstelarSchema } from "../models/starships.model";
import { Vehiculo, vehiculoSchema } from "../models/vehicles.model";

const starWarsRepository: StarWarsRepository = new StarWarsRepository();

export async function saveEntity(entity: any): Promise<any> {
  await validateEntity(entity);
  entity.code = null;

  return await starWarsRepository.createEntity(entity);
}

async function validateEntity(entity: any): Promise<void> {
  await schema.validate(entity, { abortEarly: false });

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
