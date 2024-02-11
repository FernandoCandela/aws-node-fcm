import Database from "../storage/database/db";

const tableName: string = process.env.DYNAMODB_TABLE ?? "test";

class StarWarsRepository {
  private readonly database: Database;

  constructor() {
    this.database = new Database("us-east-2", tableName);
  }

  async getEntityById(id: string): Promise<any> {
    try {
      return await this.database.getById(id);
    } catch (error) {
      console.error("Error al obtener el elemento de la base de datos:", error);
      throw error;
    }
  }

  async getEntityByCode(code: string): Promise<any> {
    try {
      return await this.database.getOneByKey("code", code);
    } catch (error) {
      console.error("Error al obtener el elemento de la base de datos:", error);
      throw error;
    }
  }

  async createEntity(elemento: any): Promise<any> {
    try {
      return await this.database.putData(elemento);
    } catch (error) {
      console.error("Error al crear el elemento en la base de datos:", error);
      throw error;
    }
  }

  async findAllEntities(): Promise<any> {
    try {
      return await this.database.listData();
    } catch (error) {
      console.error("Error al obtener los elementos en la base de datos:", error);
      throw error;
    }
  }
}

export default StarWarsRepository;
