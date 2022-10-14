import { getDoc } from 'firebase/firestore';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
import { configRef, type ConfigDocument } from '$lib/firebase/event';

export const load: LayoutLoad<ConfigDocument> = async ({}) => {
	try {
		return (await getDoc(configRef)).data();
	} catch (e) {
		throw error(500, 'Something Went Wrong = ' + e);
	}
};

export const hydrate = true;
