import { writable } from 'svelte/store';
import type { News, Event, Video } from './db';

export const event = writable<Event>();
export const news = writable<News[]>();
export const videos = writable<Video[]>();
export const auth = writable(false);
