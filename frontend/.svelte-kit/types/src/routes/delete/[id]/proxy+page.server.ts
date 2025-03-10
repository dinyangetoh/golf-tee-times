// @ts-nocheck
import { getTeeTimeById } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
	try {
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
