import { runTransaction, deleteField } from '@firebase/firestore';
import { getFirebase } from './firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { eventID, eventRef } from './event';

const { db, str } = getFirebase();

export interface Team<logo = string> {
	name: string;
	acronym: string;
	logo: logo;
	teamChemistry: number;
	color: string;
}

export function teamToString(team: Team) {
	return JSON.stringify([team.name, team.acronym, team.logo, team.teamChemistry, team.color]);
}

export function stringToTeam(val: string): Team {
	const [name, acronym, logo, teamChemistry, color] = JSON.parse(val);
	return { teamChemistry, acronym, name, logo, color };
}

export function setTeam(teamID: undefined, data: Team<File>): Promise<string>;
export function setTeam(teamID: string, data: Team<File | string>): Promise<string>;
export function setTeam(teamID: string, data: null): Promise<string>;
export async function setTeam(teamID: undefined | string, data: Team<File | string> | null) {
	if (data) data = { ...data };
	await runTransaction(db, async function (transaction) {
		const event = await transaction.get(eventRef);
		if (!teamID) {
			teamID =
				't-' + (Math.max(0, ...Object.keys(event.get('teams')).map((x) => -(-x.substring(2)))) + 1);
		} else if (!event.get('teams.' + teamID)) return;
		const logo = ref(str, 'Event/' + eventID + '/Teams/' + teamID);
		if (data === null) {
			await deleteObject(logo);
		} else if (typeof data.logo !== 'string') {
			await uploadBytes(logo, data.logo);
			data.logo = await getDownloadURL(logo);
		}
		transaction.update(eventRef, {
			['teams.' + teamID]: data ? teamToString(data as Team) : deleteField()
		});
	});
	return teamID;
}
