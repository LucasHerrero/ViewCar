
export interface Engine {
  id:           number;
  name:         string;
  fuel:         Fuel;
  power:        number;
  emission:     number;
  consumption:  number;
  transmission: Transmission;
  model:        Model;
  price: number;
  description: string;
}

export enum Fuel {
  Diésel = "Diésel",
  Gasolina = "Gasolina",
  Híbrido = "Híbrido",
}

export interface Model {
  id:    number;
  model: string;
  image: string;
  brand: Brand;
  price: number;
}

export interface Brand {
  id:        number;
  brandName: string;
  image:     string;
}

export enum Transmission {
  Automatico = "Automatico",
  Manual = "Manual",
}
