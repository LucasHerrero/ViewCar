import { Brand } from "../../configurador/brand-selection/interfaces/brand.interface";

export interface ModelResponse {
    models: Model[];
}

export interface Model {
    id: number;
    model: string;
    brand: Brand;
    price: number;
    image: string;
    emissions: string;
    fuel: string;
    description: string;
    status: string;
    isUpdating: boolean;
}
