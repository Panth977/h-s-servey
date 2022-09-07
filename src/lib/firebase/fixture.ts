import { runTransaction, deleteField } from '@firebase/firestore';
import { eventRef } from './event';
import { getFirebase } from './firebase';

const { db } = getFirebase();

export interface Fixture<score = number> {
	team1ID: string;
	team2ID: string;
	time: string;
	scores?: { team1: score; team2: score };
}

export function fixtureToString(fixture: Fixture) {
	if (!fixture.scores) return JSON.stringify([fixture.team1ID, fixture.team2ID, fixture.time]);
	return JSON.stringify([
		fixture.team1ID,
		fixture.team2ID,
		fixture.time,
		fixture.scores.team1,
		fixture.scores.team2
	]);
}

export function stringToFixture(val: string): Fixture {
	const [team1ID, team2ID, time, team1, team2] = JSON.parse(val);
	return { team1ID, team2ID, time, scores: team1 === undefined ? undefined : { team1, team2 } };
}

export function setFixture(fixtureID: undefined, data: Fixture<0>): Promise<void>;
export function setFixture(fixtureID: string, time: string): Promise<void>;
export function setFixture(fixtureID: string, team: 1 | 2, inc: 1 | -1): Promise<void>;
export function setFixture(fixtureID: string, data: null): Promise<void>;
export async function setFixture(
	fixtureID: undefined | string,
	data: Fixture | null | 1 | 2 | string,
	inc?: number
) {
	await runTransaction(db, async function (transaction) {
		const event = await transaction.get(eventRef);
		if (!fixtureID) {
			fixtureID =
				'f-' +
				(Math.max(0, ...Object.keys(event.get('fixtures')).map((x) => -(-x.substring(2)))) + 1);
		} else {
			const fixture = stringToFixture(event.get('fixtures.' + fixtureID));
			if (!fixture) return;
			if (data === 1 || data === 2) {
				if (!fixture.scores) {
					fixture.scores = { team1: 0, team2: 0 };
				}
				fixture.scores[data === 1 ? 'team1' : 'team2'] += inc ?? 0;
				data = fixture;
			} else if (typeof data === 'string') {
				fixture.time = data;
				data = fixture;
			}
		}
		transaction.update(eventRef, {
			['fixtures.' + fixtureID]: data ? fixtureToString(data as Fixture) : deleteField()
		});
	});
}
