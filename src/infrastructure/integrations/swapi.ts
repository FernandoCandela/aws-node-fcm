import axios from "axios";

const SWAPI_BASE_URL: string = "https://swapi.py4e.com/api";

export async function getEntityById(entity: string, id: number) {
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/${entity}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el personaje de SWAPI:", error);
    throw error;
  }
}
