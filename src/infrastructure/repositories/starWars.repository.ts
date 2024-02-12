import Database from "../storage/database/db";

const tableName: string = process.env.DYNAMODB_TABLE ?? "test";

class StarWarsRepository {
  private readonly database: Database;

  constructor() {
    this.database = new Database("us-east-2", tableName);
  }

  async getEntityById(id: string): Promise<any> {
    try {
      return await this.database.getAllByKey("id", id);
    } catch (error) {
      console.error("Error al obtener el elemento de la base de datos:", error);
      throw error;
    }
  }

  async getEntityByEntityTypeAndCode(entityType: string, code: number): Promise<any> {
    try {
      const keysAndValues = {
        "entity_type": entityType,
        "code": code,
      };

      return await this.database.getOneByKeysAndValues(keysAndValues);

    } catch (error) {
      console.error("Error al obtener el elemento de la base de datos:", error);
      throw error;
    }
  }

  async getEntitiesByType(entityType: string): Promise<any> {
    try {
      return await this.database.getAllByKey("entity_type", entityType, "entityTypeIndex");
    } catch (error) {
      console.error("Error al obtener los elementos de la base de datos:", error);
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
