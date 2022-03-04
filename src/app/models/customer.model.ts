import { Address } from './address.model';

export class Customer {
  _id!: string;
  businessKey!: string;
  name!: string;
  birthday!: Date;
  email!: string;
  phone!: string;
  cpf!: string;
  rg!: string;
  gender!: string;
  address!: Address;
  about!: string;
}
