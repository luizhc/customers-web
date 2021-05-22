import { Address } from './address.model';

export class Customer {
    id!: number;
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
