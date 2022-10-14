import { eventColl, randomStr } from './event';
import { collection, deleteDoc, doc, setDoc, serverTimestamp } from '@firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { getFirebase } from './firebase';
import type { Timestamp } from 'firebase/firestore';
const { storager } = getFirebase();

export const newsColl = (eventID: string) => collection(doc(eventColl, eventID), 'News/');

export interface NewsProps<image = string> {
	title: string;
	image: image;
	caption: string;
	connectionIDs: string[]; // teamID || playerID
}
export interface NewsDocument<image = string> extends NewsProps<image> {
	createdAt: Timestamp;
}

export function setNews(eventID: string, newsID: undefined, data: NewsProps<File>): Promise<string>;
export function setNews(
	eventID: string,
	newsID: string,
	data: NewsProps<File | string>
): Promise<string>;
export function setNews(eventID: string, newsID: string, data: null): Promise<string>;
export async function setNews(
	eventID: string,
	newsID: string | undefined,
	data: NewsProps<File | string> | null
) {
	if (newsID === undefined) {
		newsID = randomStr();
		(data as any).createdAt = serverTimestamp();
	}
	const image = ref(storager, 'Event/' + eventID + '/News/' + newsID);
	const newsRef = doc(newsColl(eventID), newsID);
	if (data !== null) {
		if (typeof data.image !== 'string') {
			await uploadBytes(image, data.image);
			data = { ...data, image: await getDownloadURL(image) };
		}
		await setDoc(newsRef, data, { merge: true });
	} else {
		await deleteObject(image);
		await deleteDoc(newsRef);
	}
	return newsID;
}
