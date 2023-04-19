// TS
import { IAddress, IViaCEPAddress } from '@ts';

const ADDRESS_API = 'https://viacep.com.br/ws';

export const AddressRepository = {
	async searchAddress(cep: string) {
		try {
			const address: IViaCEPAddress = await (
				await fetch(`${ADDRESS_API}/${cep}/json`)
			).json();

			const mappedAddress: Omit<IAddress, 'number'> = {
				street: address.logradouro,
				neighborhood: address.bairro,
				city: address.localidade,
				state: address.uf,
				country: 'Brazil',
				zipCode: address.cep,
			};

			return mappedAddress;
		} catch (error) {
			console.error(error);
		}
	},
};
