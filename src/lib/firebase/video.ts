import { eventColl, randomStr } from './event';
import { collection, deleteDoc, doc, setDoc, serverTimestamp } from '@firebase/firestore';
import type { Timestamp } from '@firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { getFirebase } from './firebase';

const { storager } = getFirebase();

export const videoColl = (eventID: string) => collection(doc(eventColl, eventID), 'Video/');

export interface VideoProps<video = string> {
	title: string;
	video: video;
	caption: string;
	connectionIDs: string[]; // teamID || playerID
}
export interface VideoDocument<image = string> extends VideoProps<image> {
	createdAt: Timestamp;
}

export function setVideo(
	eventID: string,
	videoID: undefined,
	data: VideoProps<File>
): Promise<string>;
export function setVideo(
	eventID: string,
	videoID: string,
	data: VideoProps<File | string>
): Promise<string>;
export function setVideo(eventID: string, videoID: string, data: null): Promise<string>;
export async function setVideo(
	eventID: string,
	videoID: string | undefined,
	data: VideoProps<File | string> | null
) {
	if (videoID === undefined) {
		videoID = randomStr();
		(data as any).createdAt = serverTimestamp();
	}
	const image = ref(storager, 'Event/' + eventID + '/Video/' + videoID);
	const videoRef = doc(videoColl(eventID), videoID);
	if (data !== null) {
		if (typeof data.video !== 'string') {
			await uploadBytes(image, data.video);
			data = { ...data, video: await getDownloadURL(image) };
		}
		await setDoc(videoRef, data, { merge: true });
	} else {
		await deleteObject(image);
		await deleteDoc(videoRef);
	}
	return videoID;
}
