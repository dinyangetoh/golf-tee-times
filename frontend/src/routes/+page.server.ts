import { getAllTeeTimes } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const teeTimes = await getAllTeeTimes();
		return {
			teeTimes
		};
	} catch (error) {
		console.error('Error loading tee times:', error);
		return {
			teeTimes: []
		};
	}
};
