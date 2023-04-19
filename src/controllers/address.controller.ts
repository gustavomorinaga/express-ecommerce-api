import { Router } from 'express';

// Repositories
import { AddressRepository } from '@repositories';

// Middlewares
import { validate } from '@middlewares';

// Schemas
import { addressSchema } from '@schemas';

/** Responsável por gerenciar a autenticação dos usuários */
const AddressController = Router();

AddressController.get('/:cep', validate(addressSchema), async (req, res) => {
	try {
		const { cep } = req.params;

		const address = await AddressRepository.searchAddress(cep);

		return res.status(200).send(address);
	} catch (error) {
		console.error(error);
	}
});

export { AddressController };
