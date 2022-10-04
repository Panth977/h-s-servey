import { VideoColl, type Video } from '$lib/firebase/db';
import { doc, getDoc } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad<Video> = async ({ params }) => {
	try {
		const res = await getDoc(doc(VideoColl, params.videoID));
		const video = res.data();
		if (!video) throw error(404, 'Not found');
		return video;
	} catch (e) {
		throw error(404, 'Not found');
	}
};
export const hydrate = true;
