export interface IAPIError {
    error: number,
    message: string;
}

export class APIError implements IAPIError {
    error: number;
    message: string;

    constructor(error: number, message: string) {
        this.error = error;
        this.message = message;
    }
}
