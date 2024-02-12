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
  let statusCode: HttpStatus;
  let bodyResponse: string;

  if (e instanceof yup.ValidationError) {
    statusCode = HttpStatus.BAD_REQUEST;
    bodyResponse = JSON.stringify({ errors: e.errors });
  } else if (e instanceof SyntaxError) {
    statusCode = HttpStatus.BAD_REQUEST;
    bodyResponse = JSON.stringify({ error: `${Messages.INVALID_REQUEST_BODY} ${e.message}` });
  } else if (e instanceof CustomError) {
    statusCode = e.code;
    bodyResponse = JSON.stringify({ error: e.message });
  } else if (e instanceof Error) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    bodyResponse = e.message;
  } else {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    bodyResponse = Messages.INTERNAL_SERVER_ERROR;
  }

  return {
    statusCode,
    headers,
    body: bodyResponse,
  };
}
