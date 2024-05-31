export interface CustomJwtPayload {
    sub: string;
    authorities: string[];
    name: string;
    surname: string;
    id : number;
}
