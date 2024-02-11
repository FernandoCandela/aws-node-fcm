import { APIGatewayProxyResult } from "aws-lambda";
import { HttpStatus, Messages } from "./constants";
import * as yup from "yup";
import { CustomError } from "./customError";

const headers = {
  "content-type": "application/json",
};

export function buildResponse(statusCode: HttpStatus, body: any = null): APIGatewayProxyResult {
  let bodyResponse: string = Messages.VOID_RESPONSE;

  if (body !== null) {
    bodyResponse = JSON.stringify(statusCode >= 200 && statusCode <= 299
      ? body
      : { error: body });
  }

  return {
    statusCode: statusCode,
    headers,
    body: bodyResponse,
  };
}

export function buildErrorResponse(e: unknown): APIGatewayProxyResult {
  if (e instanceof yup.ValidationError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      headers,
      body: JSON.stringify({
        errors: e.errors,
      }),
    };
  }

  if (e instanceof SyntaxError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      headers,
      body: JSON.stringify({ error: `${Messages.INVALID_REQUEST_BODY} ${e.message}` }),
    };
  }

  if (e instanceof CustomError) {
    let bodyResponse: string = JSON.stringify({ error: e.message });
    return {
      statusCode: e.code,
      headers,
      body: bodyResponse,
    };
  }

  throw e;
}
