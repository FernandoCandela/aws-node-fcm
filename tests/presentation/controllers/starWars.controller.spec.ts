import { APIGatewayProxyEvent } from "aws-lambda";
import {
  getAllEntities,
  getEntitiesByType,
  getEntity,
  getEntityById,
  saveEntity,
} from "../../../src/domain/services/starWars.service";
import { HttpStatus, Origin } from "../../../src/utils/constants";
import { handlerGet, handlerPost } from "../../../src/presentation/controllers/starWarsController";


jest.mock("../../../src/domain/services/starWars.service");

describe("Star Wars Controller", () => {
  let event: APIGatewayProxyEvent;

  beforeEach(() => {
    jest.resetAllMocks();
    event = {
      body: JSON.stringify({ entity_type: "PEOPLE", entity: {} }),
      queryStringParameters: null,
    } as APIGatewayProxyEvent;
  });

  it("should create a new entity", async () => {
    (saveEntity as jest.Mock).mockResolvedValue({ entity_type: "PEOPLE", entity: {}, origin: Origin.LOCAL });

    const result = await handlerPost(event);

    expect(result.statusCode).toEqual(HttpStatus.CREATED);
    expect(saveEntity).toHaveBeenCalledWith({ entity_type: "PEOPLE", entity: {}, origin: Origin.LOCAL, code: null });
  });

  it("should handle error when creating a new entity", async () => {
    (saveEntity as jest.Mock).mockRejectedValue(new Error("Error"));

    const result = await handlerPost(event);

    expect(result.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it("should get an entity by id", async () => {
    event.queryStringParameters = { id: "1" };
    (getEntityById as jest.Mock).mockResolvedValue({ id: "1", entity_type: "PEOPLE", entity: {} });

    const result = await handlerGet(event);

    expect(result.statusCode).toEqual(HttpStatus.OK);
    expect(getEntityById).toHaveBeenCalledWith("1");
  });

  it("should get all entities", async () => {
    (getAllEntities as jest.Mock).mockResolvedValue([{ id: "1", entity_type: "PEOPLE", entity: {} }]);

    const result = await handlerGet(event);

    expect(result.statusCode).toEqual(HttpStatus.OK);
    expect(getAllEntities).toHaveBeenCalled();
  });

  it("should get entities by type", async () => {
    event.queryStringParameters = { entityType: "PEOPLE" };
    (getEntitiesByType as jest.Mock).mockResolvedValue([{ id: "1", entity_type: "PEOPLE", entity: {} }]);

    const result = await handlerGet(event);

    expect(result.statusCode).toEqual(HttpStatus.OK);
    expect(getEntitiesByType).toHaveBeenCalledWith("PEOPLE");
  });

  it("should get an entity by type and code", async () => {
    event.queryStringParameters = { entityType: "PEOPLE", code: "1" };
    (getEntity as jest.Mock).mockResolvedValue({ entity_type: "PEOPLE", code: "1", entity: {} });

    const result = await handlerGet(event);

    expect(result.statusCode).toEqual(HttpStatus.OK);
    expect(getEntity).toHaveBeenCalledWith("PEOPLE", "1");
  });

  it("should handle error when getting entities", async () => {
    (getAllEntities as jest.Mock).mockRejectedValue(new Error("Error"));

    const result = await handlerGet(event);

    expect(result.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
