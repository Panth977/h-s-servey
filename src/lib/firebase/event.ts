import { doc, updateDoc, deleteField, collection } from '@firebase/firestore';
import { getFirebase } from './firebase';

const { db } = getFirebase();

export interface EventDocument {
	liveStream?: string;
	fixtures: { [fixtureID: string]: string };
	teams: { [teamID: string]: string };
	players: { [playerID: string]: string };
}

interface EventsInConfigDocument {
	title: string;
	hidden?: boolean;
	poster: string;
	time: string;
}

interface EventInfo extends EventsInConfigDocument {
	id: string;
	displayTime: string;
	displayDate: string;
	isUpcomming: boolean;
}

interface FormInConfig {
	url: string;
	title: string;
	poster: string;
}

export interface ConfigDocument {
	events: { [eventID: string]: EventsInConfigDocument };
	forms: { [path: string]: FormInConfig };
}

export interface Config {
	events: { [eventID: string]: EventInfo };
	forms: { [path: string]: FormInConfig };
	sortedEvent: EventInfo[];
}

export function now() {
	function in2dig(x: number, p = 0) {
		x += p;
		if (x < 10) return '0' + x;
		return x;
	}
	const d = new Date();
	return (
		d.getFullYear() +
		'-' +
		in2dig(d.getMonth(), 1) +
		'-' +
		in2dig(d.getDate()) +
		'T' +
		in2dig(d.getHours()) +
		':' +
		in2dig(d.getMinutes())
	);
}

export function parseConfigDocument(data: ConfigDocument): Config {
	const sortedEvent: EventInfo[] = [];
	const events: { [eventID: string]: EventInfo } = {};
	const _now = now();

	for (const eventID in data.events) {
		const event = data.events[eventID];
		const date = new Date(event.time);
		sortedEvent.push(
			(events[eventID] = {
				...event,
				id: eventID,
				displayTime: date.toLocaleTimeString(),
				displayDate: date.toLocaleDateString(),
				isUpcomming: event.time.localeCompare(_now) > 0
			})
		);
	}
	sortedEvent.sort((x, y) => x.time.localeCompare(y.time));
	return {
		forms: data.forms,
		events,
		sortedEvent
	};
}

export const configRef = doc(db, 'Config/Config');

export const eventColl = collection(db, 'Event');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

export function randomStr(length = 10) {
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export async function setLiveStream(eventID: string, url: null | string) {
	await updateDoc(doc(eventColl, eventID), {
		liveStream: url ?? deleteField()
	});
}
