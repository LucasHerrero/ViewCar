import { User } from "../../../../administracion/interfaces/user.interfaces";
import { Brand } from "../../../../configurador/brand-selection/interfaces/brand.interface";
import { Engine } from "../../../../configurador/engine-selection/interface/engine-interface";
import { ExteriorColor } from "../../../../configurador/exterior-color-selection/interface/exterior-color.interface";
import { InteriorColor } from "../../../../configurador/interior-color-selection/interfaces/interior-color.interface";
import { Package } from "../../../../configurador/package-selection/interface/package.interface";
import { Tire } from "../../../../configurador/tire-selection/interface/tire.interface";
import { Model } from "../../../../models/interfaces/model.interface";

export interface ConfiguredCar {

  carId: number;
  id: number | null;
  pack: Package | null;
  brand: Brand | null;
  model: Model | null;
  engine: Engine | null;
  extColor: ExteriorColor | null;
  intColor: InteriorColor | null;
  tire: Tire | null;
  user: User | null;
  price: number | null;
  image: string | null;
  creationtime: any;
}
