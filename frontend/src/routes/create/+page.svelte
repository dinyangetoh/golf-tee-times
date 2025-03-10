<script lang="ts">
	import {goto} from '$app/navigation';
	import {createTeeTime} from '$lib/api';

	// Initialize a new tee time object with default values
	let teeTime = {
		time: '',
		price: 80.00,
		min_players: 1,
		max_players: 4,
		holes: 18,
		golfCourseName: 'CommonGround Golf Course',
		courseUrl: 'https://commonground-golf-course.book.teeitup.com/',
		date: new Date().toISOString().split('T')[0]
	};

	// Replace $state with regular variables
	let isLoading = false;
	let error = '';

	async function handleSubmit(event) {
		event.preventDefault();
		isLoading = true;
		error = '';

		try {
			await createTeeTime(teeTime);
			await goto('/');
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
		<form class="space-y-4" on:submit={handleSubmit}>


			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1" for="golfCourseName">Golf Course</label>
				<input
					bind:value={teeTime.golfCourseName}
					class="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md"
                    disabled
					id="golfCourseName"
					required
					type="text"
				/>
			</div>
            <div>
				<label class="block text-sm font-medium text-gray-700 mb-1" for="courseUrl">Course URL</label>
				<input
					bind:value={teeTime.courseUrl}
					class="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md"
                    disabled
					id="courseUrl"
					required
					type="url"
				/>
			</div>

            <div class="grid grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="date">Date</label>
					<input
						bind:value={teeTime.date}
						class="w-full px-3 py-2 border border-gray-300 rounded-md"
						id="date"
						required
						type="date"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="time">Time</label>
					<input
						bind:value={teeTime.time}
						class="w-full px-3 py-2 border border-gray-300 rounded-md"
						id="time"
						required
						type="time"
					/>
				</div>
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1" for="price">Price ($)</label>
				<input
					bind:value={teeTime.price}
					class="w-full px-3 py-2 border border-gray-300 rounded-md"
					id="price"
					min="0"
					required
					step="0.01"
					type="number"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="min_players">Min Players</label>
					<input
						bind:value={teeTime.min_players}
						class="w-full px-3 py-2 border border-gray-300 rounded-md"
						id="min_players"
						max="4"
						min="1"
						required
						type="number"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="max_players">Max Players</label>
					<input
						bind:value={teeTime.max_players}
						class="w-full px-3 py-2 border border-gray-300 rounded-md"
						id="max_players"
						max="4"
						min="1"
						required
						type="number"
					/>
				</div>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1" for="holes">Holes</label>
				<select
					bind:value={teeTime.holes}
					class="w-full px-3 py-2 border border-gray-300 rounded-md"
					id="holes"
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
				<a class="text-blue-500 hover:text-blue-700" href="/">Cancel</a>
				<button
					class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
					disabled={isLoading}
					on:click={handleSubmit}
					type="submit"
				>
					{isLoading ? 'Creating...' : 'Create Tee Time'}
				</button>
			</div>
		</form>
	</div>
</div>
