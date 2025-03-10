<script lang="ts">
	import {goto} from '$app/navigation';
	import {updateTeeTime} from '$lib/api';

	export let data;

	let teeTime = data.teeTime;
	let isLoading = false;
	let error = '';

	async function handleSubmit(event: SubmitEvent) {
		isLoading = true;
		error = '';

		console.log("saving details")
		try {
			if (teeTime) {
				await updateTeeTime(teeTime.id, teeTime);
				await goto('/');
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Edit Tee Time</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-6">Edit Tee Time</h1>

	{#if !teeTime}
		<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
			Tee time not found.
		</div>
		<div class="mt-4">
			<a href="/" class="text-blue-500 hover:text-blue-700">Back to Tee Times</a>
		</div>
	{:else}
		<div class="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
			<form on:submit|preventDefault={handleSubmit} class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
						<input
							id="date"
							type="date"
							disabled
							bind:value={teeTime.date}
							class="w-full px-3 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
				<div>
					<label for="time" class="block text-sm font-medium text-gray-700 mb-1">Time</label>
					<input
						id="time"
						type="text"
						disabled
						bind:value={teeTime.time}
						class="w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				</div>

				<div>
					<label for="price" class="block text-sm font-medium text-gray-700 mb-1">Price</label>
					<input
						id="price"
						type="number"
						step="0.01"
						bind:value={teeTime.price}
						class="w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="min_players" class="block text-sm font-medium text-gray-700 mb-1">Min Players</label>
						<input
							id="min_players"
							type="number"
							min="1"
							max="4"
							bind:value={teeTime.min_players}
							class="w-full px-3 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					<div>
						<label for="max_players" class="block text-sm font-medium text-gray-700 mb-1">Max Players</label>
						<input
							id="max_players"
							type="number"
							min="1"
							max="4"
							bind:value={teeTime.max_players}
							class="w-full px-3 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
				</div>

				<div>
					<label for="holes" class="block text-sm font-medium text-gray-700 mb-1">Holes</label>
					<select
						id="holes"
						bind:value={teeTime.holes}
						class="w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					>
						<option value={9}>9 Holes</option>
						<option value={18}>18 Holes</option>
					</select>
				</div>





				{#if error}
					<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
						{error}
					</div>
				{/if}

				<div class="flex justify-between">
					<a href="/" class="text-blue-500 hover:text-blue-700">Cancel</a>
					<button
						type="submit"
						class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
						disabled={isLoading}
					>
						{isLoading ? 'Saving...' : 'Save Changes'}
					</button>
				</div>
			</form>
		</div>
	{/if}
</div>
