import {ErrorMessages, HttpStatus} from "./constants";

export class CustomError extends Error {
    code: HttpStatus;

    constructor(errorMessages: typeof ErrorMessages[keyof typeof ErrorMessages]) {
        super(errorMessages.message);
        this.name = 'CustomError';
        this.code = errorMessages.code;
    }
}
