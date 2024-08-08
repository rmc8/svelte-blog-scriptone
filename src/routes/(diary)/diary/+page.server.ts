import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { fetchDiaryPosts } from '$lib/diary/newt_diary_client';

export const load: PageServerLoad = async ({ url }) => {
	const page = url.searchParams.get('page') || '1';
	const tag: string | null = url.searchParams.get('tag') || null;
	const search: string | null = url.searchParams.get('s') || null;

	const pageNumber = parseInt(page, 10);
	if (isNaN(pageNumber) || pageNumber < 1) {
		throw error(400, 'Invalid page number');
	}

	const per_page = 30;

	try {
		const { posts, totalPages } = await fetchDiaryPosts(pageNumber, per_page, tag, search);
		return {
			posts,
			currentPage: pageNumber,
			totalPages,
			tag,
			search
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
