import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { fetchSinglePost } from '$lib/diary/newt_diary_client';
export const load: PageServerLoad = async ({ params }) => {
	const { _id } = params;

	try {
		const post = await fetchSinglePost(_id);

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
