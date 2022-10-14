import { limit, onSnapshot, Query, query } from 'firebase/firestore';
import { writable, type Writable } from 'svelte/store';
import type { Event, News, Video } from './firebase/db';
import type { Config } from './firebase/event';
import { newsRef, videosRef, newsRelated, videoRelated } from './firebase/db';
import { browser } from '$app/env';

const stateInstances: { [stateID: string]: any } = {};

export const config = writable<Config>();

export function eventStore(eventID: string): Writable<Event> {
	return (stateInstances['event-' + eventID] ??= writable());
}

class LatestListner<T> {
	#store: Writable<{
		data: T[];
		readonly loading: boolean;
		readonly askedFor: number;
	}>;
	#ref: Query<T>;
	#askedFor: number;
	#currentlyListningTo: number;
	#unSub?: VoidFunction;

	constructor(ref: Query<T>) {
		this.#store = writable({
			askedFor: 0,
			data: [],
			loading: true
		});
		this.#ref = ref;
		this.#askedFor = 0;
		this.#currentlyListningTo = 0;
	}
	get store() {
		return this.#store;
	}
	get unSub() {
		return () => {
			this.#unSub?.();
			this.#unSub = undefined;
			this.#store.set({ askedFor: 0, data: [], loading: true });
			this.#askedFor = 0;
			this.#currentlyListningTo = 0;
		};
	}

	addIfNot(data: T[]) {
		if (!data.length) return;
		this.#store.update((x) => (x.data.length ? x : { ...x, loading: false, data }));
	}

	seeMore() {
		if (this.#askedFor !== this.#currentlyListningTo) return;
		this.#askedFor += 5;
		this.#store.update((x) => ({ loading: true, data: x.data, askedFor: this.#askedFor }));
		this.#unSub?.();
		const listner = this;
		this.#unSub = onSnapshot(query(this.#ref, limit(this.#askedFor)), {
			next(snap) {
				listner.#currentlyListningTo = snap.docs.length;
				listner.#store.set({
					data: snap.docs.map((x) => x.data()),
					loading: false,
					askedFor: listner.#askedFor
				});
			},
			error(error) {
				console.error(error);
			}
		});
	}
}

export function latestNewsListner(eventID: string): LatestListner<News> {
	return (stateInstances['latestNewsListner-' + eventID] ??= new LatestListner(newsRef(eventID)));
}
export function latestVideosListner(eventID: string): LatestListner<Video> {
	return (stateInstances['latestVideosListner-' + eventID] ??= new LatestListner(
		videosRef(eventID)
	));
}
class SelectiveListner<T> {
	#store: Writable<{
		data: T[];
		readonly loading: boolean;
		readonly askedFor: number;
	}>;
	#ref: (connectID: string) => Query<T>;
	#askedFor: number;
	#currentlyListningTo: number;
	#unSub?: VoidFunction;
	#connectTo?: string;

	constructor(ref: (connectID: string) => Query<T>) {
		this.#store = writable({
			askedFor: 0,
			data: [],
			loading: true
		});
		this.#ref = ref;
		this.#askedFor = 0;
		this.#currentlyListningTo = 0;
	}
	get connectTo() {
		return this.#connectTo;
	}
	set connectTo(newVal: string | undefined) {
		if (newVal === this.#connectTo) return;
		this.#unSub?.();
		this.#unSub = undefined;
		this.#store.set({ askedFor: 0, data: [], loading: false });
		this.#askedFor = 0;
		this.#currentlyListningTo = 0;
		if ((this.#connectTo = newVal)) this.seeMore();
	}
	get store() {
		return this.#store;
	}
	seeMore() {
		if (!this.#connectTo) return;
		if (this.#askedFor !== this.#currentlyListningTo) return;
		this.#askedFor += 5;
		this.#store.update((x) => ({ loading: true, data: x.data, askedFor: this.#askedFor }));
		this.#unSub?.();
		const listner = this;
		this.#unSub = onSnapshot(query(this.#ref(this.#connectTo), limit(this.#askedFor)), {
			next(snap) {
				listner.#currentlyListningTo = snap.docs.length;
				listner.#store.set({
					data: snap.docs.map((x) => x.data()),
					loading: false,
					askedFor: listner.#askedFor
				});
			},
			error(error) {
				console.error(error);
			}
		});
	}
}

export function selectiveNewsListner(eventID: string): SelectiveListner<News> {
	return (stateInstances['selectiveNewsListner-' + eventID] ??= new SelectiveListner((connectID) =>
		newsRelated(eventID, connectID)
	));
}
export function selectiveVideoListner(eventID: string): SelectiveListner<Video> {
	return (stateInstances['selectiveVideoListner-' + eventID] ??= new SelectiveListner((connectID) =>
		videoRelated(eventID, connectID)
	));
}
