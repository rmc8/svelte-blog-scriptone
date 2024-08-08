import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { fetchSinglePost } from '$lib/diary/wp_client'; // この関数は別途実装が必要です

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	try {
		const post = await fetchSinglePost(slug);

		if (!post) {
			throw error(404, 'Post not found');
		}
		return {
			post: post
		};
	} catch (err) {
		console.error('Error fetching post:', err);
		throw error(500, 'Failed to load post');
	}
};
