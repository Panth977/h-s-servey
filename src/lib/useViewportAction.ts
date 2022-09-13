import type { Action } from 'svelte/types/runtime/action';
let intersectionObserver: IntersectionObserver;

const viewport: Action<HTMLElement, {}> = (element: Element) => {
	intersectionObserver ??= new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			entry.target.dispatchEvent(
				new CustomEvent(entry.isIntersecting ? 'enterViewport' : 'exitViewport')
			);
		});
	});

	intersectionObserver.observe(element);

	return {
		destroy() {
			intersectionObserver.unobserve(element);
		}
	};
};
export default viewport;
