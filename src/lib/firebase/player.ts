import { runTransaction, deleteField, doc } from '@firebase/firestore';
import { getFirebase } from './firebase';
import { getDownloadURL, ref, uploadBytes, deleteObject } from '@firebase/storage';
import { eventColl } from './event';
const { db, storager } = getFirebase();

export interface Player<image = string> {
	teamID: string;
	jerseyNum: string;
	name: string;
	displayImage: image;
	position: 'Forward' | 'Midfield' | 'Defence' | 'Goalkeeper';
	instagramUsername: string;
	place: string;
}

export function playerToString(player: Player) {
	return JSON.stringify([
		player.teamID,
		player.jerseyNum,
		player.name,
		player.displayImage,
		player.position,
		player.instagramUsername,
		player.place
	]);
}
export function stringToPlayer(val: string): Player {
	const [teamID, jerseyNum, name, displayImage, position, instagramUsername, place] =
		JSON.parse(val);
	return {
		teamID,
		jerseyNum,
		name,
		displayImage,
		position,
		instagramUsername,
		place
	};
}
export function setPlayer(
	eventID: string,
	playerID: undefined,
	data: Player<File>
): Promise<string>;
export function setPlayer(
	eventID: string,
	playerID: string,
	data: Player<File | string>
): Promise<string>;
export function setPlayer(eventID: string, playerID: string, data: null): Promise<string>;
export async function setPlayer(
	eventID: string,
	playerID: undefined | string,
	data: Player<File | string> | null
) {
	if (data) data = { ...data };
	const eventRef = doc(eventColl, eventID);
	await runTransaction(db, async function (transaction) {
		const event = await transaction.get(eventRef);
		if (!playerID) {
			playerID =
				'p-' +
				(Math.max(0, ...Object.keys(event.get('players')).map((x) => -(-x.substring(2)))) + 1);
		} else if (!event.get('players.' + playerID)) return;
		const image = ref(storager, 'Event/' + eventID + '/Players/' + playerID);
		if (data === null) {
			await deleteObject(image);
		} else if ('displayImage' in data) {
			if (typeof data.displayImage !== 'string') {
				await uploadBytes(image, data.displayImage);
				data.displayImage = await getDownloadURL(image);
			}
		}
		transaction.update(eventRef, {
			['players.' + playerID]: data ? playerToString(data as Player) : deleteField()
		});
	});
	return playerID;
}
