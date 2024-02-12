import { DynamoDB } from "aws-sdk";
import { v4 } from "uuid";

class Database {
  private readonly dynamoDB: DynamoDB.DocumentClient;
  private readonly tableName: string;

  constructor(region: string, tableName: string) {
    this.dynamoDB = new DynamoDB.DocumentClient({ region });
    this.tableName = tableName;
  }

  async getAllByKey(key: string, value: string, indexName?: string): Promise<any> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
      IndexName: indexName ?? undefined,
      FilterExpression: `#${key} = :${key}`,
      ExpressionAttributeNames: {
        [`#${key}`]: key,
      },
      ExpressionAttributeValues: {
        [`:${key}`]: value,
      },
    };

    try {
      const { Items } = await this.dynamoDB.scan(params).promise();
      return Items;
    } catch (error) {
      console.error("Error al obtener el elemento de la base de datos:", error);
      throw error;
    }
  }

  async getOneByKeysAndValues(keys: { [key: string]: any }, indexName?: string): Promise<any> {
    const ExpressionAttributeNames: { [key: string]: string } = {};
    const ExpressionAttributeValues: { [key: string]: any } = {};
    let FilterExpression = "";

    Object.keys(keys).forEach((key, index) => {
      ExpressionAttributeNames[`#${key}`] = key;
      ExpressionAttributeValues[`:${key}`] = keys[key];
      if (index > 0) FilterExpression += " AND ";
      FilterExpression += `#${key} = :${key}`;
    });

    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
      IndexName: indexName ?? undefined,
      FilterExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      Limit: 1,
    };

    try {
      const { Items } = await this.dynamoDB.scan(params).promise();
      return Items ? Items[0] : null;
    } catch (error) {
      console.error("Error al obtener el elemento de la base de datos:", error);
      throw error;
    }
  }

  async putData(data: any): Promise<any> {
    const element = {
      ...data,
      id: v4(),
    };

    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: element,
    };

    try {
      await this.dynamoDB.put(params).promise();
      return element;
    } catch (error) {
      console.error("Error al crear el elemento en la base de datos:", error);
      throw error;
    }
  }

  async listData(): Promise<any> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    try {
      const { Items } = await this.dynamoDB.scan(params).promise();
      return Items;
    } catch (error) {
      console.error("Error al obtener los elementos de la base de datos:", error);
      throw error;
    }
  }
}

export default Database;
