import { CollectionReference, doc, limit, onSnapshot, Query, query } from 'firebase/firestore';
import { writable, type Writable } from 'svelte/store';
import type { Event } from './firebase/db';
import { newsRef, videosRef, newsRelated, videoRelated, NewsColl, VideoColl } from './firebase/db';

export const event = writable<Event>({
	fixtures: [],
	liveStream: undefined,
	players: {},
	sortedGoalkeepers: [],
	sortedPlayers: [],
	sortedTeams: [],
	teams: {},
	upcommingFixtures: []
});

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
		return this.#unSub;
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
			}
		});
	}
}

export const latestNewsListner = new LatestListner(newsRef);
export const latestVideosListner = new LatestListner(videosRef);

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
			complete() {
				listner.#store.set({ askedFor: 0, data: [], loading: false });
				listner.#askedFor = 0;
				listner.#currentlyListningTo = 0;
			}
		});
	}
}

export const selectiveNewsListner = new SelectiveListner(newsRelated);
export const selectiveVideoListner = new SelectiveListner(videoRelated);

class DocListner<T> {
	#store: Writable<T | undefined | null>;
	#ref: CollectionReference<T>;
	#unSub?: VoidFunction;
	#id?: string;

	constructor(ref: CollectionReference<T>) {
		this.#store = writable();
		this.#ref = ref;
	}
	get id() {
		return this.#id;
	}
	set id(newID: string | undefined) {
		if (this.#id === newID) return;
		this.#unSub?.();
		if ((this.#id = newID)) {
			const listner = this;
			this.#unSub = onSnapshot(doc(this.#ref, this.#id), {
				next(snap) {
					listner.#store.set(snap.exists() ? snap.data() : null);
				},
				complete() {
					listner.#store.set(undefined);
				}
			});
		} else {
			this.#unSub = undefined;
		}
	}
	get store() {
		return this.#store;
	}
	get unSub() {
		return this.#unSub;
	}
}

export const newsListner = new DocListner(NewsColl);
export const videoListner = new DocListner(VideoColl);
