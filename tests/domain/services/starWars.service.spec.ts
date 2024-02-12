import StarWarsRepository from "../../../src/infrastructure/repositories/starWars.repository";
import {
  getAllEntities,
  getEntitiesByType,
  getEntity,
  getEntityById,
  saveEntity,
} from "../../../src/domain/services/starWars.service";
import { Entities, Origin } from "../../../src/utils/constants";
import { getSwapiEntityById } from "../../../src/infrastructure/integrations/swapi";

jest.mock("../../../src/infrastructure/repositories/starWars.repository");
jest.mock("../../../src/infrastructure/integrations/swapi");

describe("Star Wars Service", () => {
  let entity: {};
  let swapiEntity: {};
  beforeEach(() => {
    jest.resetAllMocks();
    entity = {
      "naves_estelares": [
        "https://swapi.py4e.com/api/starships/12/",
        "https://swapi.py4e.com/api/starships/22/",
      ],
      "editado": "2014-12-20T21:17:56.891000Z",
      "nombre": "Luke Skywalker",
      "creado": "2014-12-09T13:50:51.644000Z",
      "url": "https://swapi.py4e.com/api/people/1/",
      "genero": "male",
      "vehiculos": [
        "https://swapi.py4e.com/api/vehicles/14/",
        "https://swapi.py4e.com/api/vehicles/30/",
      ],
      "color_piel": "fair",
      "color_cabello": "blond",
      "altura": "172",
      "color_ojos": "blue",
      "masa": "77",
      "peliculas": [
        "https://swapi.py4e.com/api/films/1/",
        "https://swapi.py4e.com/api/films/2/",
        "https://swapi.py4e.com/api/films/3/",
        "https://swapi.py4e.com/api/films/6/",
        "https://swapi.py4e.com/api/films/7/",
      ],
      "especies": [
        "https://swapi.py4e.com/api/species/1/",
      ],
      "planeta_natal": "https://swapi.py4e.com/api/planets/1/",
      "anio_nacimiento": "19BBY",
    };

    swapiEntity = {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "hair_color": "blond",
      "skin_color": "fair",
      "eye_color": "blue",
      "birth_year": "19BBY",
      "gender": "male",
      "homeworld": "https://swapi.py4e.com/api/planets/1/",
      "films": [
        "https://swapi.py4e.com/api/films/1/",
        "https://swapi.py4e.com/api/films/2/",
        "https://swapi.py4e.com/api/films/3/",
        "https://swapi.py4e.com/api/films/6/",
        "https://swapi.py4e.com/api/films/7/",
      ],
      "species": [
        "https://swapi.py4e.com/api/species/1/",
      ],
      "vehicles": [
        "https://swapi.py4e.com/api/vehicles/14/",
        "https://swapi.py4e.com/api/vehicles/30/",
      ],
      "starships": [
        "https://swapi.py4e.com/api/starships/12/",
        "https://swapi.py4e.com/api/starships/22/",
      ],
      "created": "2014-12-09T13:50:51.644000Z",
      "edited": "2014-12-20T21:17:56.891000Z",
      "url": "https://swapi.py4e.com/api/people/1/",
    };


  });

  it("should save a valid entity", async () => {
    const mockEntity = { entity_type: Entities.PEOPLE, code: 1, entity: entity, origin: Origin.LOCAL };
    (StarWarsRepository.prototype.createEntity as jest.Mock).mockResolvedValue(mockEntity);

    const result = await saveEntity(mockEntity);

    expect(result).toEqual(mockEntity);
    expect(StarWarsRepository.prototype.createEntity).toHaveBeenCalledWith(mockEntity);
  });

  it("should throw an error when saving an invalid entity", async () => {
    const mockEntity = { entity_type: "INVALID", code: 1, entity: {} };

    await expect(saveEntity(mockEntity)).rejects.toThrow();
  });

  it("should get an entity by type and code", async () => {
    const mockEntity = { entity_type: Entities.PEOPLE, code: 1, entity: {} };
    (StarWarsRepository.prototype.getEntityByEntityTypeAndCode as jest.Mock).mockResolvedValue(mockEntity);

    const result = await getEntity(Entities.PEOPLE, "1");

    expect(result).toEqual(mockEntity);
    expect(StarWarsRepository.prototype.getEntityByEntityTypeAndCode).toHaveBeenCalledWith(Entities.PEOPLE, 1);
  });

  it("should get an entity by id", async () => {
    const mockEntity = { id: "1", entity_type: Entities.PEOPLE, code: 1, entity: {} };
    (StarWarsRepository.prototype.getEntityById as jest.Mock).mockResolvedValue(mockEntity);

    const result = await getEntityById("1");

    expect(result).toEqual(mockEntity);
    expect(StarWarsRepository.prototype.getEntityById).toHaveBeenCalledWith("1");
  });

  it("should get all entities", async () => {
    const mockEntities = [{ id: "1", entity_type: Entities.PEOPLE, code: 1, entity: {} }];
    (StarWarsRepository.prototype.findAllEntities as jest.Mock).mockResolvedValue(mockEntities);

    const result = await getAllEntities();

    expect(result).toEqual(mockEntities);
    expect(StarWarsRepository.prototype.findAllEntities).toHaveBeenCalled();
  });

  it("should get entities by type", async () => {
    const mockEntities = [{ id: "1", entity_type: Entities.PEOPLE, code: 1, entity: {} }];
    (StarWarsRepository.prototype.getEntitiesByType as jest.Mock).mockResolvedValue(mockEntities);

    const result = await getEntitiesByType(Entities.PEOPLE);

    expect(result).toEqual(mockEntities);
    expect(StarWarsRepository.prototype.getEntitiesByType).toHaveBeenCalledWith(Entities.PEOPLE);
  });

  it("should fetch from SWAPI when entity is not found in the database", async () => {
    const mockEntity = { entity_type: Entities.PEOPLE, code: 1, entity: entity, origin: Origin.SWAPI };
    (StarWarsRepository.prototype.getEntityByEntityTypeAndCode as jest.Mock).mockResolvedValue(null);
    (getSwapiEntityById as jest.Mock).mockResolvedValue(swapiEntity);
    (StarWarsRepository.prototype.createEntity as jest.Mock).mockResolvedValue(mockEntity);

    const result = await getEntity(Entities.PEOPLE, "1");

    expect(result).toEqual(mockEntity);
    expect(getSwapiEntityById).toHaveBeenCalledWith(Entities.PEOPLE, 1);
    expect(StarWarsRepository.prototype.createEntity).toHaveBeenCalledWith(mockEntity);
  });
});
