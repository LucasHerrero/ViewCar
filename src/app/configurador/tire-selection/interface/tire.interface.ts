import { Model } from "../../../models/interfaces/model.interface";
import { Brand } from "../../brand-selection/interfaces/brand.interface";
import { Package } from "../../package-selection/interface/package.interface";

export interface Tire {

  id: number;
  name: string;
  inches: number;
  material: string;
  color: string;
  image: string;
  price: number;
  description: string;
  circulo: string;
  model: Model;
  package: Package;
  brand: Brand;
}
