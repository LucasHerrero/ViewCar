export interface User {
  id: number;
  password: string;
  rol: string;
  email: string;
  dni: null | string;
  firstName: string;
  secondLastName: string;
  birthday: null | string;
  phone: null | string;
  address: null | string;
  country: null | string;
  province: null | string;
  registrationDate: string;
}
