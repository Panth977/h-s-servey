import { NewsColl, type News } from '$lib/firebase/db';
import { doc, getDoc } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad<News> = async ({ params }) => {
	try {
		const res = await getDoc(doc(NewsColl, params.newsID));
		const news = res.data();
		if (!news) throw error(404, 'Not found');
		return news;
	} catch (e) {
		throw error(404, 'Not found');
	}
};
