import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { fetchDiaryPosts } from '$lib/diary/wp_client';

export const load: PageServerLoad = async ({ url, _ }) => {
	// URLからパラメータを取得
	const page = url.searchParams.get('page') || '1';
	const tag = url.searchParams.get('tag') || null;
	const search = url.searchParams.get('s') || null;

	const pageNumber = parseInt(page, 10);
	if (isNaN(pageNumber) || pageNumber < 1) {
		throw error(400, 'Invalid page number');
	}

	const per_page = 30;

	try {
		// fetchPostsを使用して記事を取得
		const { posts, totalPages } = await fetchDiaryPosts(pageNumber, per_page, tag, search);
		return {
			posts: posts,
			currentPage: pageNumber,
			totalPages: totalPages,
			tag: tag,
			search: tag
		};
	} catch (err) {
		console.error('Error fetching posts:', err);
		if (err instanceof Error) {
			throw error(500, err.message);
		} else {
			throw error(500, 'An unknown error occurred while fetching posts');
		}
	}
};

export const prerender = true;
