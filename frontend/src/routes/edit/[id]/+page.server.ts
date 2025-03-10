import {getTeeTimeById} from '$lib/api';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		console.log('Loading tee time with ID:', params.id);
		const { id } = params;
		const teeTime = await getTeeTimeById(id);
		return {
			teeTime
		};
	} catch (error) {
		console.error(`Error loading tee time with ID ${params.id}:`, error);
		return {
			teeTime: null
		};
	}
};
