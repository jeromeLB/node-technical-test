export interface IMedia {
    name?: string;
    file?: string;
    duration?: number;
    description?: string;
}

export class Media implements IMedia {
    name: string = "";
    file: string = "";
    duration: number = 0;
    description: string = "";
}
