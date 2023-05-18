import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { AddressRepository } from '@repositories';

// Schemas
import { addressSchema } from '@schemas';

// --- Utils ---
import { zParse } from '@utils';

/** Responsável por gerenciar a autenticação dos usuários */
const AddressController = Router();

AddressController.get('/:cep', async (req, res) => {
	try {
		const {
			params: { cep },
		} = await zParse(addressSchema, req);

		const address = await AddressRepository.searchAddress(cep);

		return res.status(statuses.OK).send(address);
	} catch (error) {
		console.error(error);
	}
});

export { AddressController };
