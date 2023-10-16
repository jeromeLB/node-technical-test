export interface IMediaError {
    error: number,
    message: string;
}

export class MediaError implements IMediaError {
    error: number;
    message: string;

    constructor(error: number, message: string) {
        this.error = error;
        this.message = message;
    }
}
