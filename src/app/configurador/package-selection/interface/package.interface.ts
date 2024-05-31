import { Model } from "../../../models/interfaces/model.interface";

export interface Package {
    id: number;
    name: string;
    bumper: string;
    headlights: string;
    bodywork: string;
    seats: string;
    imageList: string[];
    model: Model;
    price: number;
    description: string;
}
