export enum Messages {
  VOID_RESPONSE = "Void response",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  INVALID_REQUEST_BODY = "Invalid request body format:",
  REQUIRED_PARAMETERS_ERROR = "Both code and entityType are required.",
  ENTITY_TYPE_ENUM_ERROR = "entity_type debe ser uno de los siguientes valores: ",
  ENTITY_TYPE_ENUM_ERROR_1 = "entityType debe ser uno de los siguientes valores: ",
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
  REQUIRED_PARAMETERS_ERROR: {
    message: Messages.REQUIRED_PARAMETERS_ERROR,
    code: HttpStatus.BAD_REQUEST,
  },
};
