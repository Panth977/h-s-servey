import type { Fixture } from './fixture';
import { setFixture, stringToFixture } from './fixture';
import type { VideoDocument } from './video';
import { setVideo, videoColl } from './video';
import type { NewsDocument } from './news';
import { newsColl, setNews } from './news';
import type { EventDocument } from './event';
import { eventRef, setLiveStream } from './event';
import type { Player } from './player';
import { setPlayer, stringToPlayer } from './player';
import type { Team } from './team';
import { setTeam, stringToTeam } from './team';
import { orderBy, query, where } from '@firebase/firestore';

export interface EventFixture extends Fixture {
	id: string;
	displayTime: string;
	displayDate: string;
	team1: Team;
	team2: Team;
}

export interface EventTeam extends Team {
	id: string;
	players: EventPlayer[];
	matchesPlayed: number;
	won: number;
	loss: number;
	goalScored: number;
	goalConceived: number;
	attack: number;
	possession: number;
	defence: number;
	points: number;
	score: number;
	goalDifference: number;
}

export interface EventPlayer extends Player {
	id: string;
	team: EventTeam;
	_attack: number;
	_possession: number;
	_defence: number;
	attack: number;
	possession: number;
	conceiveRate: number;
	defence: number;
	score: number;
	goalkeeperPoints: number;
	isGoalkeeper: boolean;
}

interface Event {
	upcommingFixtures: EventFixture[];
	liveStream: string | undefined;
	fixtures: EventFixture[];
	teams: { [teamID: string]: EventTeam };
	players: { [playerID: string]: EventPlayer };
	sortedPlayers: EventPlayer[];
	sortedGoalkeepers: EventPlayer[];
	sortedTeams: EventTeam[];
}

function parseEventDocument(doc: EventDocument): Event {
	const teams: { [teamID: string]: EventTeam } = {};
	const players: { [playerID: string]: EventPlayer } = {};
	const fixtures: EventFixture[] = Object.entries(doc.fixtures)
		.map(function (x): EventFixture {
			const fixture = stringToFixture(x[1]);
			let team1: EventTeam | undefined;
			let team2: EventTeam | undefined;
			const date = new Date(fixture.time);
			return {
				...fixture,
				id: x[0],
				displayTime: date.toLocaleTimeString(),
				displayDate: date.toLocaleDateString(),
				get team1() {
					return (team1 ??= teams[this.team1ID]);
				},
				get team2() {
					return (team2 ??= teams[this.team2ID]);
				}
			};
		})
		.sort((x, y) => x.time.localeCompare(y.time));
	const sortedTeams: EventTeam[] = Object.entries(doc.teams)
		.map(function (x) {
			const id = x[0];
			const data: { [key in keyof EventTeam]?: EventTeam[key] } = {};

			function initFixtures() {
				data.won = 0;
				data.loss = 0;
				data.matchesPlayed = 0;
				data.goalScored = 0;
				data.goalConceived = 0;
				for (const fixture of fixtures) {
					if (fixture.scores) {
						if (id === fixture.team1ID) {
							data.matchesPlayed += 1;
							data.goalScored += fixture.scores.team1;
							data.goalConceived += fixture.scores.team2;
							if (fixture.scores.team1 > fixture.scores.team2) {
								data.won += 1;
							} else {
								data.loss += 1;
							}
						} else if (id === fixture.team2ID) {
							data.matchesPlayed += 1;
							data.goalScored += fixture.scores.team2;
							data.goalConceived += fixture.scores.team1;
							if (fixture.scores.team2 > fixture.scores.team1) {
								data.won += 1;
							} else {
								data.loss += 1;
							}
						}
					}
				}
			}

			return (teams[id] = {
				id,
				...stringToTeam(x[1]),
				players: [],
				get matchesPlayed() {
					if (!('matchesPlayed' in data)) initFixtures();
					return data.matchesPlayed;
				},
				get won() {
					if (!('won' in data)) initFixtures();
					return data.won;
				},
				get loss() {
					if (!('loss' in data)) initFixtures();
					return data.loss;
				},
				get goalScored() {
					if (!('goalScored' in data)) initFixtures();
					return data.goalScored;
				},
				get goalConceived() {
					if (!('goalConceived' in data)) initFixtures();
					return data.goalConceived;
				},
				get attack() {
					return (data.attack ??=
						this.players.reduce((p, c) => p + c.attack, 0) / this.players.length);
				},
				get possession() {
					return (data.possession ??=
						this.players.reduce((p, c) => p + c.possession, 0) / this.players.length);
				},
				get defence() {
					return (data.defence ??=
						this.players.reduce((p, c) => p + c.defence, 0) / this.players.length);
				},
				get score() {
					return (data.score ??= (this.attack + this.possession + this.defence) / 3);
				},
				get points() {
					return (data.points ??= this.won - this.loss + this.matchesPlayed);
				},
				get goalDifference() {
					return (data.goalDifference ??= this.goalScored - this.goalConceived);
				}
			} as EventTeam);
		})
		.sort((a, b) => b.points - a.points);
	let maxAttack = 1;
	let maxPossession = 1;
	let maxDefence = 1;
	const sortedPlayers: EventPlayer[] = Object.entries(doc.players)
		.map(function (x) {
			const id = x[0];
			const data: { [key in keyof EventPlayer]?: EventPlayer[key] } = {};
			const player = stringToPlayer(x[1]);
			const common = player.goals * 40 + player.assists * 20 + player.passes * 0.2;
			const _attack = common + player.shots * 6;
			const _possession = common + player.dribbles * 0.5;
			const _defence = common + player.tackles * 4;
			if (_attack > maxAttack) maxAttack = _attack;
			if (_possession > maxPossession) maxPossession = _possession;
			if (_defence > maxDefence) maxDefence = _defence;
			return (players[id] = {
				...player,
				id,
				team: teams[player.teamID],
				_attack,
				_defence,
				_possession,
				get isGoalkeeper() {
					return (data.isGoalkeeper ??= this.position === 'Goalkeeper');
				},
				get attack() {
					return (data.attack ??= (99 * this._attack) / maxAttack);
				},
				get possession() {
					return (data.possession ??= (99 * this._possession) / maxPossession);
				},
				get defence() {
					return (data.defence ??= (99 * this._defence) / maxDefence);
				},
				get conceiveRate() {
					return (data.defence ??= (100 * this.goalConceived) / this.goalSaved);
				},
				get score() {
					return (data.score ??= (this.attack + this.possession + this.defence) / 3);
				},
				get goalkeeperPoints() {
					return (data.goalkeeperPoints ??=
						(this.conceiveRate + this.possession + this.handling) / 3);
				}
			});
		})
		.sort((a, b) => b.goals * 1000 + b.assists - a.goals * 1000 - a.assists);
	const sortedGoalkeepers = [...sortedPlayers]
		.filter(function (x) {
			x.team.players.push(x);
			return x.isGoalkeeper;
		})
		.sort((a, b) => b.handling - a.handling);
	let upcommingFixtures: EventFixture[];
	return {
		liveStream: doc.liveStream,
		fixtures,
		teams,
		players,
		sortedPlayers,
		sortedGoalkeepers,
		sortedTeams,
		get upcommingFixtures() {
			if (!upcommingFixtures?.length) {
				const now = new Date().toISOString();
				upcommingFixtures = fixtures.filter((f) => f.time.localeCompare(now) > 0);
			}
			return upcommingFixtures;
		}
	};
}

export const EventRef = eventRef.withConverter<Event>({
	fromFirestore(snapshot) {
		return parseEventDocument(snapshot.data() as EventDocument);
	},
	toFirestore() {
		throw 'unimplemented';
	}
});
interface Video extends VideoDocument {
	id: string;
	content: content;
}
export const VideoColl = videoColl.withConverter<Video>({
	fromFirestore(snapshot) {
		let content: content;
		return {
			...(snapshot.data() as VideoDocument),
			id: snapshot.id,
			get content() {
				return (content ??= getContent(this.caption));
			}
		};
	},
	toFirestore() {
		throw 'unimplemented';
	}
});
export const videosRef = query(VideoColl, orderBy('createdAt', 'desc'));

export function videoRelated(id: string) {
	return query(videosRef, where('connectionIDs', 'array-contains', id));
}

type content = (
	| { type: 'text'; text: (string | null)[] }
	| { type: 'player'; playerID: string }
	| { type: 'team'; teamID: string }
)[];

interface News extends NewsDocument {
	id: string;
	content: content;
}

function getContent(str: string): content {
	var re = / (@p|#t)-\d+ /g;
	let match: RegExpExecArray | null;
	const val: content = [];
	let lastIndex = 0;
	while ((match = re.exec(str)) != null) {
		if (match[1] === '@p') {
			const proxy = str.substring(lastIndex, match.index).split('\n');
			const text: (string | null)[] = [];
			for (let i = 0; i < proxy.length; i++) {
				text.push(proxy[i], null);
			}
			text.pop();
			val.push({ type: 'text', text }, { type: 'player', playerID: match[0].trim().substring(1) });
			lastIndex = match.index + match[0].length;
		} else if (match[1] === '#t') {
			const proxy = str.substring(lastIndex, match.index).split('\n');
			const text: (string | null)[] = [];
			for (let i = 0; i < proxy.length; i++) {
				text.push(proxy[i], null);
			}
			text.pop();
			val.push({ type: 'text', text }, { type: 'team', teamID: match[0].trim().substring(1) });
			lastIndex = match.index + match[0].length;
		}
	}
	const proxy = str.substring(lastIndex).split('\n');
	const text: (string | null)[] = [];
	for (let i = 0; i < proxy.length; i++) {
		text.push(proxy[i], null);
	}
	text.pop();
	val.push({ type: 'text', text });
	return val;
}
export const NewsColl = newsColl.withConverter<News>({
	fromFirestore(snapshot) {
		let content: content;
		return {
			...(snapshot.data() as NewsDocument),
			id: snapshot.id,
			get content() {
				return (content ??= getContent(this.caption));
			}
		};
	},
	toFirestore() {
		throw 'unimplemented';
	}
});

export const newsRef = query(NewsColl, orderBy('createdAt', 'desc'));
export function newsRelated(id: string) {
	return query(newsRef, where('connectionIDs', 'array-contains', id));
}

export type { Event, Video, News };
export { setTeam, setPlayer, setVideo, setFixture, setNews, setLiveStream };
