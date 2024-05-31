import { Package } from "../../package-selection/interface/package.interface";

export interface InteriorColor {
    id: number;
    color: string;
    image: string;
    price: number;
    circulo: string;
    pack: Package[];
    imageList: string[];
    name: string;
}
