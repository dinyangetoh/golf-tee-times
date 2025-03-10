<script lang="ts">
	import { goto } from '$app/navigation';
	import { createTeeTime } from '$lib/api';
	
	// Initialize a new tee time object with default values
	let teeTime = $state({
		time: '',
		price: 80.00,
		min_players: 1,
		max_players: 4,
		holes: 18,
		golfCourseName: 'CommonGround Golf Course',
		courseUrl: 'https://commonground-golf-course.book.teeitup.com/',
		date: new Date().toISOString().split('T')[0]
	});
	
	let isLoading = $state(false);
	let error = $state('');
	
	async function handleSubmit() {
		isLoading = true;
		error = '';
		
		try {
			await createTeeTime(teeTime);
			goto('/');
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Create Tee Time</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-6">Create New Tee Time</h1>
	
	<div class="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
		<form onsubmit={handleSubmit} class="space-y-4">
			
			
			<div>
				<label for="golfCourseName" class="block text-sm font-medium text-gray-700 mb-1">Golf Course</label>
				<input
					id="golfCourseName"
					type="text"
                    disabled
					bind:value={teeTime.golfCourseName}
					class="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md"
					required
				/>
			</div>
            <div>
				<label for="courseUrl" class="block text-sm font-medium text-gray-700 mb-1">Course URL</label>
				<input
					id="courseUrl"
					type="url"
                    disabled
					bind:value={teeTime.courseUrl}
					class="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md"
					required
				/>
			</div>
			
            <div class="grid grid-cols-2 gap-4">
				<div>
					<label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
					<input
						id="date"
						type="date"
						bind:value={teeTime.date}
						class="w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				
				<div>
					<label for="time" class="block text-sm font-medium text-gray-700 mb-1">Time</label>
					<input
						id="time"
						type="time"
						bind:value={teeTime.time}
						class="w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
			</div>
			<div>
				<label for="price" class="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
				<input
					id="price"
					type="number"
					step="0.01"
					min="0"
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
					onclick={handleSubmit}
					class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
					disabled={isLoading}
				>
					{isLoading ? 'Creating...' : 'Create Tee Time'}
				</button>
			</div>
		</form>
	</div>
</div>
