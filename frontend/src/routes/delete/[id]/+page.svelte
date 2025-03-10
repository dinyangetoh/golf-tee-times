<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteTeeTime } from '$lib/api';
	
	export let data;
	
	let teeTime = data.teeTime;
	
	let isLoading = false;
	let error = '';
	
	async function handleDelete() {
		isLoading = true;
		error = '';
		
		try {
			if (teeTime) {
				await deleteTeeTime(teeTime.id);
				goto('/');
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Delete Tee Time</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-6">Delete Tee Time</h1>
	
	{#if !teeTime}
		<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
			Tee time not found.
		</div>
		<div class="mt-4">
			<a href="/" class="text-blue-500 hover:text-blue-700">Back to Tee Times</a>
		</div>
	{:else}
		<div class="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
			<div class="mb-6">
				<h2 class="text-xl font-semibold mb-2">Are you sure you want to delete this tee time?</h2>
				<p class="text-gray-600">This action cannot be undone.</p>
			</div>
			
			<div class="bg-gray-100 p-4 rounded mb-6">
				<div class="grid grid-cols-2 gap-2">
					<div class="text-gray-600">Time:</div>
					<div>{teeTime.time}</div>
					
					<div class="text-gray-600">Course:</div>
					<div>{teeTime.golfCourseName}</div>
					
					<div class="text-gray-600">Date:</div>
					<div>{teeTime.date}</div>
					
					<div class="text-gray-600">Price:</div>
					<div>${teeTime.price.toFixed(2)}</div>
					
					<div class="text-gray-600">Players:</div>
					<div>{teeTime.min_players} - {teeTime.max_players}</div>
					
					<div class="text-gray-600">Holes:</div>
					<div>{teeTime.holes}</div>
				</div>
			</div>
			
			{#if error}
				<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			{/if}
			
			<div class="flex justify-between">
				<a href="/" class="text-blue-500 hover:text-blue-700">Cancel</a>
				<button
					on:click={handleDelete}
					class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
					disabled={isLoading}
				>
					{isLoading ? 'Deleting...' : 'Delete Tee Time'}
				</button>
			</div>
		</div>
	{/if}
</div> 