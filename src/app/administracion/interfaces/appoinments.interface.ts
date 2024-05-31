import { Car } from './../../cuenta/pages/configured-car/interface/car.interface';
import { Coche } from './coche.interface';


export interface Appoinments {
  id: number;
  date: number;
  time: string;
  creationtime: string;
  car: Coche;

}
