
import { Engine } from './../../configurador/engine-selection/interface/engine-interface';
import { Package } from './../../configurador/package-selection/interface/package.interface';
import { Model } from '../../models/interfaces/model.interface';
import { Tire } from './../../configurador/tire-selection/interface/tire.interface';
import { ExteriorColor, Brand } from './../../configurador/exterior-color-selection/interface/exterior-color.interface';
import { User } from "./user.interfaces";
import { InteriorColor } from '../../configurador/interior-color-selection/interfaces/interior-color.interface';

 export interface Coche {
  id: number;
  creationtime: Date;
  pack: Package;
  brand: Brand;
  model: Model;
  engine: Engine;
  extColor: ExteriorColor;
  intColor: InteriorColor;
  tire: Tire;
  user: User;
  price: number;
}
