// TS
import { IAddress, IViaCEPAddress } from '@ts';

const ADDRESS_API = 'https://viacep.com.br/ws';

export const AddressRepository = {
	async searchAddress(zipCode: string) {
		const address: IViaCEPAddress = await fetch(`${ADDRESS_API}/${zipCode}/json`).then(
			res => res.json()
		);

		const mappedAddress: Omit<IAddress, 'number'> = {
			street: address.logradouro,
			neighborhood: address.bairro,
			city: address.localidade,
			state: address.uf,
			country: 'Brazil',
			zipCode: address.cep,
		};

		return mappedAddress;
	},
};
