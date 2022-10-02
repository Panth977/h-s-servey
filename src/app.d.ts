// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
/// <reference types="@sveltejs/adapter-cloudflare-workers" />
declare namespace App {
	interface Platform {
		env?: {
			YOUR_KV_NAMESPACE: KVNamespace;
			YOUR_DURABLE_OBJECT_NAMESPACE: DurableObjectNamespace;
		};
		context: {
			waitUntil(promise: Promise<any>): void;
		};
		caches: CacheStorage & { default: Cache };
	}

	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}
