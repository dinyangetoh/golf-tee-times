/// <reference types="@sveltejs/kit" />

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

// Add this to declare the $app modules
declare module '$app/navigation' {
	export function goto(url: string, options?: { replaceState?: boolean }): Promise<void>;
}
