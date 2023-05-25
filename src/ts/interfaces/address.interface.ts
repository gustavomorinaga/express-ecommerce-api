import { Document, Model } from 'mongoose';

export interface IAddress {
	street: string;
	number: number;
	complement?: string;
	neighborhood: string;
	city: string;
	state: string;
	country: string;
	zipCode: string;
}

export interface IAddressDocument extends IAddress, Document<string> {}
export interface IAddressModel extends Model<IAddressDocument> {}
export interface IAddressMethods extends IAddressDocument {}

export interface IViaCEPAddress {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
}
