type url = string;
type percentage = number;
type timestamp = string;

// teamID /^t-\d+$/
export interface TeamDocument {
	name: string;
	acronym: string;
	logo?: url;
	'team chemistry': percentage;
	playerIDs: string[]; // usernames
	'matches played': number;

	M: number;
	W: number;
	L: number;
	P: number;
	GS: number;
	GC: number;
	// GD: Team["GS"] - Team["GC"];
}

// playerID /^p-\d+$/
export interface PlayerDocument {
	teamID: string;
	name: string;
	'display image'?: url;
	position: string;
	'instagram username': string;

	_field: number;

	M: number;
	G: number;
	A: number;
	Y: number;
	R: number;
}

// fixtureID /^\d+$/
export interface Fixture {
	team1ID: string;
	team2ID: string;
	time: timestamp;
	scores?: { team1: number; team2: number };
}

export interface EventDocument {
	'live stream': url;
	fixtures: { [fixtureID: string]: Fixture };
}

export interface NewsDocument {
	image: url;
	caption: string;
	connectionIDs: string[]; // teamID || playerID
	createdAt: timestamp;
}

export interface VideoDocument {
	video: url;
	caption: string;
	connections: string[]; // teamID || playerID
	createdAt: timestamp;
}
