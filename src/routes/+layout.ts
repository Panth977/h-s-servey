import { EventRef, newsRef, videosRef, type Event, type News, type Video } from '$lib/firebase/db';
import { getDoc, getDocs, limit, query } from 'firebase/firestore';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad<{ event: Event; news: News[]; videos: Video[] }> = async () => {
	try {
		const [res, newsRes, videoRes] = await Promise.all([
			getDoc(EventRef),
			getDocs(query(newsRef, limit(5))),
			getDocs(query(videosRef, limit(5)))
		]);
		const event = res.data();
		if (!event) throw error(404, 'Not found');
		const ret = {
			event,
			news: newsRes.docs.map((x) => x.data()),
			videos: videoRes.docs.map((x) => x.data())
		};
		console.log(ret);
		return ret;
	} catch (e) {
		throw error(500, 'Something Went Wrong = ' + e);
	}
};
export const hydrate = true;
