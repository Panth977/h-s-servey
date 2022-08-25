import { error } from '@sveltejs/kit';
import type  {PageServerLoad} from "./$types";

export const load: PageServerLoad = async function ({ params }) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (params.slug === 'hello-world') {
        return {
            title: 'Hello world!',
            content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
        };
    }
    throw error(404, 'Not found');
}
