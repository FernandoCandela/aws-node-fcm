export enum Messages {
    VOID_RESPONSE = 'Void response',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    INVALID_REQUEST_BODY = 'Invalid request body format : %s',
}

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
}

export const ErrorMessages = {
    INTERNAL_SERVER_ERROR: {
        message: Messages.INTERNAL_SERVER_ERROR,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
    },
}