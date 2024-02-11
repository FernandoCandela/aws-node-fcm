export enum Messages {
  VOID_RESPONSE = "Void response",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  INVALID_REQUEST_BODY = "Invalid request body format:",
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Entities {
  PEOPLE = "people",
  FILMS = "films",
  STARSHIPS = "starships",
  VEHICLES = "vehicles",
  SPECIES = "species",
  PLANETS = "planets",
}

export enum Origin {
  SWAPI = "swapi",
  LOCAL = "local",
}

export const ErrorMessages = {
  INTERNAL_SERVER_ERROR: {
    message: Messages.INTERNAL_SERVER_ERROR,
    code: HttpStatus.INTERNAL_SERVER_ERROR,
  },
};
