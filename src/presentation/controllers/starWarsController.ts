import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { buildErrorResponse, buildResponse } from "../../utils/responseUtils";
import {
  getAllEntities,
  getEntitiesByType,
  getEntity,
  getEntityById,
  saveEntity,
} from "../../domain/services/starWars.service";
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
    const id: string = event.queryStringParameters?.id as string;

    let result;
    if (id) {
      result = await getEntityById(id);
    } else if (!code && !entityType) {
      result = await getAllEntities();
    } else if (!code) {
      result = await getEntitiesByType(entityType);
    } else {
      result = await getEntity(entityType, code);
    }
    return buildResponse(HttpStatus.OK, result);

  } catch (e) {
    return buildErrorResponse(e);
  }
};
