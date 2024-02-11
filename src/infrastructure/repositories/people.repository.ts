import Database from "../storage/database/db";

const tableName: string = process.env.DYNAMODB_TABLE ?? "test";

class PeopleRepository {
  private readonly database: Database;

  constructor() {
    this.database = new Database("us-east-2", tableName);
  }

  async getPeopleById(id: string): Promise<any> {
    try {
      const { Item } = await this.database.getById(id);
      return Item;
    } catch (error) {
      console.error("Error al obtener el elemento de la base de datos:", error);
      throw error;
    }
  }

  async createPeople(elemento: any): Promise<any> {
    try {
      await this.database.putData(elemento);
      return elemento;
    } catch (error) {
      console.error("Error al crear el elemento en la base de datos:", error);
      throw error;
    }
  }
}

export default PeopleRepository;
