import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { AddressRepository } from '@repositories';

// Schemas
import { getAddressByZipCodeSchema } from '@schemas';

// --- Utils ---
import { zParse } from '@utils';

/** Responsável por gerenciar os endereços */
const AddressController = Router();

AddressController.get('/:zipCode', async (req, res, next) => {
	try {
		const {
			params: { zipCode },
		} = await zParse(getAddressByZipCodeSchema, req);

		const address = await AddressRepository.searchAddress(zipCode);

		return res.status(statuses.OK).send(address);
	} catch (error) {
		next(error);
	}
});

export { AddressController };
