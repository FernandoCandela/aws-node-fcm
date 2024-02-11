import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { buildErrorResponse, buildResponse } from "../../utils/responseUtils";
import { getEntity, saveEntity } from "../../domain/services/starWars.service";
import { HttpStatus } from "../../utils/constants";

export const handlerPost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string);
    return buildResponse(HttpStatus.CREATED, await saveEntity(reqBody));
  } catch (e) {
    return buildErrorResponse(e);
  }
};
export const handlerGet = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const code: string = event.queryStringParameters?.code as string;
    const entityType: string = event.queryStringParameters?.entityType as string;

    return buildResponse(HttpStatus.OK, await getEntity(entityType, code));
  } catch (e) {
    return buildErrorResponse(e);
  }
};
