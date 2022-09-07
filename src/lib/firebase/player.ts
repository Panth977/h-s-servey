import { runTransaction, deleteField } from '@firebase/firestore';
import { getFirebase } from './firebase';
import { getDownloadURL, ref, uploadBytes, deleteObject } from '@firebase/storage';
import { eventID, eventRef } from './event';
const { db, str } = getFirebase();

export interface PlayerProfile<image = string> {
	teamID: string;
	jerseyNum: string;
	name: string;
	displayImage: image;
	position: string;
	instagramUsername: string;
}

export interface PlayerStats<matchesPlayed = number> {
	goals: number; // APD, 40
	assists: number; // APD, 20
	passes: number; // APD, .2
	tackles: number; // D, 4
	dribbles: number; // P, .5
	shots: number; // A, 6
	yellowCard: number;
	redCard: number;
	matchesPlayed: matchesPlayed;
	/// position === "Goalkeeper"
	goalConceived: number;
	goalSaved: number;
	handling: number;
}

export interface Player<image = string, matchesPlayed = number>
	extends PlayerProfile<image>,
		PlayerStats<matchesPlayed> {}

export function playerToString(player: Player) {
	return JSON.stringify([
		player.teamID,
		player.jerseyNum,
		player.name,
		player.displayImage,
		player.position,
		player.instagramUsername,
		player.matchesPlayed,
		player.goals,
		player.assists,
		player.passes,
		player.tackles,
		player.dribbles,
		player.shots,
		player.yellowCard,
		player.redCard,
		player.goalConceived,
		player.goalSaved,
		player.handling
	]);
}
export function stringToPlayer(val: string): Player {
	const [
		teamID,
		jerseyNum,
		name,
		displayImage,
		position,
		instagramUsername,
		matchesPlayed,
		goals,
		assists,
		passes,
		tackles,
		dribbles,
		shots,
		yellowCard,
		redCard,
		goalConceived,
		goalSaved,
		handling
	] = JSON.parse(val);
	return {
		teamID,
		jerseyNum,
		name,
		displayImage,
		position,
		instagramUsername,
		matchesPlayed,
		goals,
		assists,
		passes,
		tackles,
		dribbles,
		shots,
		yellowCard,
		redCard,
		goalConceived,
		goalSaved,
		handling
	};
}
export function setPlayer(playerID: undefined, data: PlayerProfile<File>): Promise<string>;
export function setPlayer(playerID: string, data: PlayerProfile<File | string>): Promise<string>;
export function setPlayer(playerID: string, data: PlayerStats<1 | 0 | -1>): Promise<string>;
export function setPlayer(playerID: string, data: null): Promise<string>;
export async function setPlayer(
	playerID: undefined | string,
	data: PlayerProfile<File | string> | PlayerStats | null
) {
	if (data) data = { ...data };
	await runTransaction(db, async function (transaction) {
		const event = await transaction.get(eventRef);
		if (!playerID) {
			playerID =
				'p-' +
				(Math.max(0, ...Object.keys(event.get('players')).map((x) => -(-x.substring(2)))) + 1);
			if (data) {
				data = {
					...data,
					goals: 0,
					assists: 0,
					passes: 0,
					tackles: 0,
					dribbles: 0,
					shots: 0,
					yellowCard: 0,
					redCard: 0,
					matchesPlayed: 0
				};
			}
		} else {
			const player = stringToPlayer(event.get('players.' + playerID));
			if (!player) return;
			if (data && 'matchesPlayed' in data) {
				if (data.matchesPlayed == 0) {
					data.matchesPlayed = player.matchesPlayed;
				} else {
					data.goals += player.goals;
					data.assists += player.assists;
					data.passes += player.passes;
					data.tackles += player.tackles;
					data.dribbles += player.dribbles;
					data.shots += player.shots;
					data.yellowCard += player.yellowCard;
					data.redCard += player.redCard;
					data.matchesPlayed += player.matchesPlayed;
					data.goalConceived += player.goalConceived;
					data.goalSaved += player.goalSaved;
					data.handling += player.handling;
				}
				data = { ...player, ...data };
			}
		}
		const image = ref(str, 'Event/' + eventID + '/Players/' + playerID);
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
