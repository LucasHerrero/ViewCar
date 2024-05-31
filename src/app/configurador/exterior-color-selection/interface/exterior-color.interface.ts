export interface ExteriorColor {
  id:          number;
  color:        string;
  imageList: string[];
  price:       number;
  circulo: string;
  pack:        Package;
  }

export interface Package {
  id:         number;
  name:       string;
  bumper:     string;
  headlights: string;
  bodywork:   string;
  seats:      string;
  imageList:  string[];
  model:      Model;
  price:      number;
  }

export interface Model {
  id:    number;
  model: string;
  image: string;
  brand: Brand;
  price: string;
  }

export interface Brand {
  id:        number;
  brandName: string;
  image:     string;
}
