import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { buildErrorResponse } from "../../utils/responseUtils";
import { savePeople } from "../../domain/services/people.service";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string);
    return await savePeople(reqBody);
  } catch (e) {
    return buildErrorResponse(e);
  }
};
