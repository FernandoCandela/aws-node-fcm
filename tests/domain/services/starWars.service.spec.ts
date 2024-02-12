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
  let peopleEntity: {};
  let swapiPeopleEntity: {};
  let filmsEntity: {};
  let swapiFilmsEntity: {};
  beforeEach(() => {
    jest.resetAllMocks();
    peopleEntity = {
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

    swapiPeopleEntity = {
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

    filmsEntity = {
      "titulo": "A New Hope",
      "episodio_id": 4,
      "introduccion": "test",
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
        "https://swapi.py4e.com/api/people/81/",
      ],
      "planetas": [
        "https://swapi.py4e.com/api/planets/1/",
        "https://swapi.py4e.com/api/planets/2/",
        "https://swapi.py4e.com/api/planets/3/",
      ],
      "naves_estelares": [
        "https://swapi.py4e.com/api/starships/2/",
        "https://swapi.py4e.com/api/starships/3/",
        "https://swapi.py4e.com/api/starships/5/",
        "https://swapi.py4e.com/api/starships/9/",
        "https://swapi.py4e.com/api/starships/10/",
        "https://swapi.py4e.com/api/starships/11/",
        "https://swapi.py4e.com/api/starships/12/",
        "https://swapi.py4e.com/api/starships/13/",
      ],
      "vehiculos": [
        "https://swapi.py4e.com/api/vehicles/4/",
        "https://swapi.py4e.com/api/vehicles/6/",
        "https://swapi.py4e.com/api/vehicles/7/",
        "https://swapi.py4e.com/api/vehicles/8/",
      ],
      "especies": [
        "https://swapi.py4e.com/api/species/1/",
        "https://swapi.py4e.com/api/species/2/",
        "https://swapi.py4e.com/api/species/3/",
        "https://swapi.py4e.com/api/species/4/",
        "https://swapi.py4e.com/api/species/5/",
      ],
      "creado": "2014-12-10T14:23:31.880000Z",
      "editado": "2014-12-20T19:49:45.256000Z",
      "url": "https://swapi.py4e.com/api/films/1/",
    };

    swapiFilmsEntity = {
      "title": "A New Hope",
      "episode_id": 4,
      "opening_crawl": "test",
      "director": "George Lucas",
      "producer": "Gary Kurtz, Rick McCallum",
      "release_date": "1977-05-25",
      "characters": [
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
        "https://swapi.py4e.com/api/people/81/",
      ],
      "planets": [
        "https://swapi.py4e.com/api/planets/1/",
        "https://swapi.py4e.com/api/planets/2/",
        "https://swapi.py4e.com/api/planets/3/",
      ],
      "starships": [
        "https://swapi.py4e.com/api/starships/2/",
        "https://swapi.py4e.com/api/starships/3/",
        "https://swapi.py4e.com/api/starships/5/",
        "https://swapi.py4e.com/api/starships/9/",
        "https://swapi.py4e.com/api/starships/10/",
        "https://swapi.py4e.com/api/starships/11/",
        "https://swapi.py4e.com/api/starships/12/",
        "https://swapi.py4e.com/api/starships/13/",
      ],
      "vehicles": [
        "https://swapi.py4e.com/api/vehicles/4/",
        "https://swapi.py4e.com/api/vehicles/6/",
        "https://swapi.py4e.com/api/vehicles/7/",
        "https://swapi.py4e.com/api/vehicles/8/",
      ],
      "species": [
        "https://swapi.py4e.com/api/species/1/",
        "https://swapi.py4e.com/api/species/2/",
        "https://swapi.py4e.com/api/species/3/",
        "https://swapi.py4e.com/api/species/4/",
        "https://swapi.py4e.com/api/species/5/",
      ],
      "created": "2014-12-10T14:23:31.880000Z",
      "edited": "2014-12-20T19:49:45.256000Z",
      "url": "https://swapi.py4e.com/api/films/1/",
    };

  });

  it("should save a valid peopleEntity", async () => {
    const mockEntity = { entity_type: Entities.PEOPLE, code: 1, entity: peopleEntity, origin: Origin.LOCAL };
    (StarWarsRepository.prototype.createEntity as jest.Mock).mockResolvedValue(mockEntity);

    const result = await saveEntity(mockEntity);

    expect(result).toEqual(mockEntity);
    expect(StarWarsRepository.prototype.createEntity).toHaveBeenCalledWith(mockEntity);
  });

  it("should throw an error when saving an invalid peopleEntity", async () => {
    const mockEntity = { entity_type: "INVALID", code: 1, entity: {} };

    await expect(saveEntity(mockEntity)).rejects.toThrow();
  });

  it("should get an peopleEntity by type and code", async () => {
    const mockEntity = { entity_type: Entities.PEOPLE, code: 1, entity: {} };
    (StarWarsRepository.prototype.getEntityByEntityTypeAndCode as jest.Mock).mockResolvedValue(mockEntity);

    const result = await getEntity(Entities.PEOPLE, "1");

    expect(result).toEqual(mockEntity);
    expect(StarWarsRepository.prototype.getEntityByEntityTypeAndCode).toHaveBeenCalledWith(Entities.PEOPLE, 1);
  });

  it("should get an peopleEntity by id", async () => {
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

  it("should fetch from SWAPI when peopleEntity is not found in the database", async () => {
    const mockEntity = { entity_type: Entities.PEOPLE, code: 1, entity: peopleEntity, origin: Origin.SWAPI };
    (StarWarsRepository.prototype.getEntityByEntityTypeAndCode as jest.Mock).mockResolvedValue(null);
    (getSwapiEntityById as jest.Mock).mockResolvedValue(swapiPeopleEntity);
    (StarWarsRepository.prototype.createEntity as jest.Mock).mockResolvedValue(mockEntity);

    const result = await getEntity(Entities.PEOPLE, "1");

    expect(result).toEqual(mockEntity);
    expect(getSwapiEntityById).toHaveBeenCalledWith(Entities.PEOPLE, 1);
    expect(StarWarsRepository.prototype.createEntity).toHaveBeenCalledWith(mockEntity);
  });

  it("should throw an error when trying to fetch an unsupported peopleEntity type from SWAPI", async () => {
    const unsupportedEntityType = "UNSUPPORTED";

    await expect(getEntity(unsupportedEntityType, "1")).rejects.toThrow();
  });

  it("should return null when trying to get an peopleEntity by non-existing id", async () => {
    (StarWarsRepository.prototype.getEntityById as jest.Mock).mockResolvedValue(null);

    const result = await getEntityById("non-existing-id");

    expect(result).toBeNull();
    expect(StarWarsRepository.prototype.getEntityById).toHaveBeenCalledWith("non-existing-id");
  });

  it("should return empty array when there are no entities of a given type", async () => {
    (StarWarsRepository.prototype.getEntitiesByType as jest.Mock).mockResolvedValue([]);

    const result = await getEntitiesByType(Entities.PEOPLE);

    expect(result).toEqual([]);
    expect(StarWarsRepository.prototype.getEntitiesByType).toHaveBeenCalledWith(Entities.PEOPLE);
  });

  it("should return empty array when there are no entities at all", async () => {
    (StarWarsRepository.prototype.findAllEntities as jest.Mock).mockResolvedValue([]);

    const result = await getAllEntities();

    expect(result).toEqual([]);
    expect(StarWarsRepository.prototype.findAllEntities).toHaveBeenCalled();
  });

  it("should not fetch from SWAPI when peopleEntity is found in the database", async () => {
    const mockEntity = { entity_type: Entities.PEOPLE, code: 1, entity: peopleEntity, origin: Origin.LOCAL };
    (StarWarsRepository.prototype.getEntityByEntityTypeAndCode as jest.Mock).mockResolvedValue(mockEntity);

    const result = await getEntity(Entities.PEOPLE, "1");

    expect(result).toEqual(mockEntity);
    expect(getSwapiEntityById).not.toHaveBeenCalled();
    expect(StarWarsRepository.prototype.createEntity).not.toHaveBeenCalled();
  });

  it("should throw an error when trying to save an peopleEntity with an invalid type", async () => {
    const mockEntity = { entity_type: "INVALID", code: 1, entity: {} };

    await expect(saveEntity(mockEntity)).rejects.toThrow();
  });

  it("should throw an error when trying to get an peopleEntity with an invalid type", async () => {
    const invalidEntityType = "INVALID";

    await expect(getEntity(invalidEntityType, "1")).rejects.toThrow();
  });

  it("should throw an error when trying to save an peopleEntity without a code", async () => {
    const mockEntity = { entity_type: Entities.PEOPLE, entity: {} };

    await expect(saveEntity(mockEntity)).rejects.toThrow();
  });

  it("should throw an error when trying to save an peopleEntity with a non-unique code", async () => {
    const mockEntity = { entity_type: Entities.PEOPLE, code: 1, entity: {} };
    (StarWarsRepository.prototype.getEntityByEntityTypeAndCode as jest.Mock).mockResolvedValue(mockEntity);

    await expect(saveEntity(mockEntity)).rejects.toThrow();
  });

  it("should correctly translate a people peopleEntity from SWAPI", async () => {
    const mockEntity = { entity_type: Entities.PEOPLE, code: 1, entity: peopleEntity, origin: Origin.SWAPI };
    (StarWarsRepository.prototype.getEntityByEntityTypeAndCode as jest.Mock).mockResolvedValue(null);
    (getSwapiEntityById as jest.Mock).mockResolvedValue(swapiPeopleEntity);
    (StarWarsRepository.prototype.createEntity as jest.Mock).mockResolvedValue(mockEntity);

    const result = await getEntity(Entities.PEOPLE, "1");

    expect(result.entity).toEqual(peopleEntity);
    expect(getSwapiEntityById).toHaveBeenCalledWith(Entities.PEOPLE, 1);
    expect(StarWarsRepository.prototype.createEntity).toHaveBeenCalledWith(mockEntity);
  });

  it("should correctly translate a films filmsEntity from SWAPI", async () => {
    const mockEntity = { entity_type: Entities.FILMS, code: 1, entity: filmsEntity, origin: Origin.SWAPI };
    (StarWarsRepository.prototype.getEntityByEntityTypeAndCode as jest.Mock).mockResolvedValue(null);
    (getSwapiEntityById as jest.Mock).mockResolvedValue(swapiFilmsEntity);
    (StarWarsRepository.prototype.createEntity as jest.Mock).mockResolvedValue(mockEntity);

    const result = await getEntity(Entities.FILMS, "1");

    expect(result.entity).toEqual(filmsEntity);
    expect(getSwapiEntityById).toHaveBeenCalledWith(Entities.FILMS, 1);
    expect(StarWarsRepository.prototype.createEntity).toHaveBeenCalledWith(mockEntity);
  });
});
