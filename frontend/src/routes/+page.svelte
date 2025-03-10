<script lang="ts">
	import { goto } from '$app/navigation';
	import { getTeeTimesByDate } from '$lib/api';
	import type { PageData } from './$types';
	
	let { data } = $props();
	
	let selectedDate = $state(new Date().toISOString().split('T')[0]);

	$effect(() => {
	
		if(selectedDate){
			console.log('selectedDate', selectedDate);
			// Use a regular function that calls the async function
			// TODO: Filter by date
		}
	});
	
	function formatTime(time: string): string {
		return time;
	}

	function formatDate(date: string): string {
		return (new Date(date)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
	}
	
	function formatPrice(price: number): string {
		return `$${price.toFixed(2)}`;
	}
	
	async function handleDateChange() {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('date', selectedDate);
		const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
		window.history.pushState({}, '', newUrl);
		data.teeTimes = await getTeeTimesByDate(selectedDate);
	}
</script>

<svelte:head>
	<title>Golf Tee Times</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-6">Golf Tee Times</h1>
	
	<div class="mb-6 flex items-center">
		<label for="date-select" class="mr-2">Filter by date:</label>
		<input 
			id="date-select"
			type="date" 
			bind:value={selectedDate} 
			class="border rounded px-2 py-1 mr-2"
		/>
		<button 
			onclick={handleDateChange}
			class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
		>
			Filter
		</button>
		
		
		
		<a href="/create" class="ml-auto bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 rounded">
			Create Tee Time
		</a>
	</div>
	
	{#if !data.teeTimes || data.teeTimes.length === 0}
		<div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
			No tee times found. Try selecting a different date or scraping new tee times.
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.teeTimes as teeTime}
				<div class="border rounded-lg shadow-sm overflow-hidden">
					<div class="p-4">
						<div class="flex justify-between">
							<div class="text-gray-700 mb-2">{formatDate(teeTime.date)}</div>
							<div class="text-xl font-bold mb-1">{formatTime(teeTime.time)}</div>
							
						</div>
						
						<div class="flex justify-between mb-3">
							<div class="flex items-center mr-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
									<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
								</svg>
								<span>{teeTime.min_players} - {teeTime.max_players}</span>
							</div>
							
							<div class="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
								</svg>
								<span>{teeTime.holes} Holes</span>
							</div>
						</div>

						<div class="my-5">
							<div class="text-gray-700 font-semibold text-center mb-2">{teeTime.golfCourseName}</div>
							
							<div class="text-lg text-center font-semibold text-green-700 mb-3">{formatPrice(teeTime.price)}</div>
						</div>
						
						<div class="flex space-x-2">
							
							<a 
								href={`/delete/${teeTime.id}`}
								class="flex-1 bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded"
							>
								Delete
							</a>
							<a 
								href={`/edit/${teeTime.id}`}
								class="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded"
							>
								Edit
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
