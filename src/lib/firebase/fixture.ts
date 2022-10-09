import { runTransaction, deleteField } from '@firebase/firestore';
import { eventRef } from './event';
import { getFirebase } from './firebase';

const { db } = getFirebase();

export interface Stats {
	goals: number; // APD, 40
	assists: number; // APD, 20
	passes: number; // APD, .2
	tackles: number; // D, 4
	dribbles: number; // P, .5
	shots: number; // A, 6
	yellowCard: number;
	redCard: number;
	goalConceived: number;
	goalSaved: number;
	handling: number;
}

export interface PlayerStats extends Stats {
	teamID: string;
}

export interface Fixture<score = number> {
	team1ID: string;
	team2ID: string;
	time: string;
	scores?: { team1: score; team2: score };
	stats?: { [playerID: string]: PlayerStats };
}

export function fixtureToString(fixture: Fixture) {
	return JSON.stringify([
		fixture.team1ID,
		fixture.team2ID,
		fixture.time,
		fixture.scores?.team1,
		fixture.scores?.team2,
		...Object.entries(fixture.stats ?? {}).map(
			([
				key,
				{
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
					handling,
					teamID
				}
			]) => [
				key,
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
				handling,
				teamID
			]
		)
	]);
}

export function stringToFixture(val: string): Fixture {
	const [team1ID, team2ID, time, team1, team2, ...stats] = JSON.parse(val);
	return {
		team1ID,
		team2ID,
		time,
		scores: team1 == undefined ? undefined : { team1, team2 },
		stats: stats.length
			? (stats as any[]).reduce(
					(
						prv,
						[
							key,
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
							handling,
							teamID
						]
					) => {
						prv[key] = {
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
							handling,
							teamID
						};
						return prv;
					},
					{}
			  )
			: undefined
	};
}

export function setFixture(fixtureID: undefined, data: Fixture<0>): Promise<void>;
export function setFixture(fixtureID: string, time: string): Promise<void>;
export function setFixture(fixtureID: string, team: 1 | 2, inc: 1 | -1): Promise<void>;
export function setFixture(
	fixtureID: string,
	playerID: string,
	stats: PlayerStats | null
): Promise<void>;
export function setFixture(fixtureID: string, data: null): Promise<void>;
export async function setFixture(
	fixtureID: undefined | string,
	data: Fixture | null | 1 | 2 | string,
	inc?: number | PlayerStats | null
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
				if (!fixture.scores) fixture.scores = { team1: 0, team2: 0 };
				fixture.scores[data === 1 ? 'team1' : 'team2'] += inc as number;
			} else if (typeof data === 'string') {
				if (typeof inc === 'object') {
					if (inc !== null) (fixture.stats ??= {})[data] = inc;
					else delete (fixture.stats ??= {})[data];
				} else {
					fixture.time = data;
				}
			}
			data = fixture;
		}
		transaction.update(eventRef, {
			['fixtures.' + fixtureID]: data ? fixtureToString(data as Fixture) : deleteField()
		});
	});
}
