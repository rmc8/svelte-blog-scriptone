import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { fetchDiaryPosts } from '$lib/diary/newt_diary_client';

export const load: PageServerLoad = async () => {
	const page = 1;

	const pageNumber = parseInt(page.toString(), 10);
	if (isNaN(pageNumber) || pageNumber < 1) {
		throw error(400, 'Invalid page number');
	}

	const per_page = 30;

	try {
		const { posts, totalPages } = await fetchDiaryPosts(pageNumber, per_page);
		return {
			posts,
			currentPage: pageNumber,
			totalPages
		};
	} catch (err) {
		console.error('Error fetching posts:', err);
		if (err instanceof Error) {
			throw error(500, `Error fetching posts: ${err.message}`);
		} else {
			throw error(500, 'An unknown error occurred while fetching posts');
		}
	}
};

export const prerender = true;
