import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { buildErrorResponse, buildResponse } from "../../utils/responseUtils";
import { getAllEntities, getEntitiesByType, getEntity, saveEntity } from "../../domain/services/starWars.service";
import { HttpStatus, Origin } from "../../utils/constants";

export const handlerPost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string);
    reqBody.code = null;
    reqBody.origin = Origin.LOCAL;
    return buildResponse(HttpStatus.CREATED, await saveEntity(reqBody));
  } catch (e) {
    return buildErrorResponse(e);
  }
};
export const handlerGet = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const code: string = event.queryStringParameters?.code as string;
    const entityType: string = event.queryStringParameters?.entityType as string;

    if (!code && !entityType) {
      // If both code and entityType are null or undefined, return all entities
      return buildResponse(HttpStatus.OK, await getAllEntities());
    } else if (!code) {
      // If only entityType is provided, return all entities of that type
      return buildResponse(HttpStatus.OK, await getEntitiesByType(entityType));
    }

    return buildResponse(HttpStatus.OK, await getEntity(entityType, code));
  } catch (e) {
    return buildErrorResponse(e);
  }
};
