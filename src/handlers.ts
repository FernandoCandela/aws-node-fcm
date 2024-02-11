import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

const docClient = new AWS.DynamoDB.DocumentClient();
import { v4 } from "uuid";
import * as yup from "yup";
import { buildErrorResponse, buildResponse } from "./utils/responseUtils";
import { HttpStatus } from "./utils/constants";

const tableName: string = process.env.DYNAMODB_TABLE ?? "test";

const headers = {
  "content-type": "application/json",
};

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  available: yup.bool().required(),
});
export const createProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string);

    await schema.validate(reqBody, { abortEarly: false });

    const product = {
      ...reqBody,
      id: v4(),
    };

    await docClient
      .put({
        TableName: tableName,
        Item: product,
      })
      .promise();

    return  buildResponse(HttpStatus.OK, product);
  } catch (e) {
    return buildErrorResponse(e);
  }
};


