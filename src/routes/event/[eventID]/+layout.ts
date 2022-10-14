import { newsRef, videosRef, type News, type Video } from '$lib/firebase/db';
import { doc, getDoc, getDocs, limit, query } from 'firebase/firestore';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
import { eventColl } from '$lib/firebase/event';

export const load: LayoutLoad<{ event: any; news: News[]; videos: Video[] }> = async ({
	params
}) => {
	try {
		const [res, newsRes, videoRes] = await Promise.all([
			getDoc(doc(eventColl, params.eventID)),
			getDocs(query(newsRef(params.eventID), limit(5))),
			getDocs(query(videosRef(params.eventID), limit(5)))
		]);
		const event = res.data();
		if (!event) throw error(404, 'Not found');
		const ret = {
			event,
			news: newsRes.docs.map((x) => x.data()),
			videos: videoRes.docs.map((x) => x.data())
		};
		return ret;
	} catch (e) {
		throw error(500, 'Something Went Wrong = ' + e);
	}
};
export const hydrate = true;
