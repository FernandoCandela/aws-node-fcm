import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { buildErrorResponse, buildResponse } from "../../utils/responseUtils";
import { savePeople } from "../../domain/services/people.service";
import { HttpStatus } from "../../utils/constants";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string);
    return buildResponse(HttpStatus.CREATED, await savePeople(reqBody));
  } catch (e) {
    return buildErrorResponse(e);
  }
};
