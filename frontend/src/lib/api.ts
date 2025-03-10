import type {TeeTime} from '$lib/types';

const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		const errorMessage =
			errorData.error || errorData.message || `Error: ${response.status} ${response.statusText}`;
		throw new Error(errorMessage);
	}

	try {
		const data = await response.json();

		return (data.data !== undefined ? data.data : data) as T;
	} catch (error) {
		console.error('Failed to parse response:', error);
		return {} as T;
	}
}

// Common fetch options to handle CORS
const getCommonOptions = (method = 'GET', body?: object): RequestInit => ({
	method,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	},
	credentials: 'include',
	mode: 'cors', // Explicitly set CORS mode
	...(body ? { body: JSON.stringify(body) } : {})
});

export async function getAllTeeTimes(): Promise<TeeTime[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/tee-times`, getCommonOptions());
		return handleResponse<TeeTime[]>(response);
	} catch (error) {
		console.error('Failed to fetch tee times:', error);
		throw error;
	}
}

export async function getTeeTimesByDate(date: string): Promise<TeeTime[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/tee-times/date/${date}`, getCommonOptions());
		return handleResponse<TeeTime[]>(response);
	} catch (error) {
		console.error(`Failed to fetch tee times for date ${date}:`, error);
		throw error;
	}
}

export async function getTeeTimeById(id: string): Promise<TeeTime> {
	try {
		const response = await fetch(`${API_BASE_URL}/tee-times/${id}`, getCommonOptions());
		return handleResponse<TeeTime>(response);
	} catch (error) {
		console.error(`Failed to fetch tee time with ID ${id}:`, error);
		throw error;
	}
}

export async function createTeeTime(teeTime: Omit<TeeTime, 'id'>): Promise<TeeTime> {
	try {
		const response = await fetch(`${API_BASE_URL}/tee-times`, getCommonOptions('POST', teeTime));
		return handleResponse<TeeTime>(response);
	} catch (error) {
		console.error('Failed to create tee time:', error);
		throw error;
	}
}

export async function updateTeeTime(id: string, teeTime: Partial<TeeTime>): Promise<TeeTime> {
	try {
		console.log("Updating tee time with ID",id, teeTime)
		const response = await fetch(
			`${API_BASE_URL}/tee-times/${id}`,
			getCommonOptions('PUT', teeTime)
		);

		console.log("Some response",response);
		return handleResponse<TeeTime>(response);
	} catch (error) {
		console.error(`Failed to update tee time with ID ${id}:`, error);
		throw error;
	}
}

export async function deleteTeeTime(id: string): Promise<void> {
	try {
		const response = await fetch(`${API_BASE_URL}/tee-times/${id}`, getCommonOptions('DELETE'));
		await handleResponse<void>(response);
	} catch (error) {
		console.error(`Failed to delete tee time with ID ${id}:`, error);
		throw error;
	}
}

export async function scrapeTeeTimesForDate(url: string, date: string): Promise<TeeTime[]> {
	try {
		const response = await fetch(
			`${API_BASE_URL}/tee-times/scrape`,
			getCommonOptions('POST', { url, date })
		);
		return handleResponse<TeeTime[]>(response);
	} catch (error) {
		console.error(`Failed to scrape tee times for date ${date}:`, error);
		throw error;
	}
}
