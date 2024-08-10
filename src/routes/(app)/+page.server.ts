import { getArticleList } from '$lib/microcms/blogStore';
import type { PageServerLoad } from './$types';
import type { Blog } from '$lib/microcms/microcms';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async () => {
	const page = 1;
	const offset = (page - 1) * ITEMS_PER_PAGE;
	const limit = ITEMS_PER_PAGE;
	let blogs: Blog[] = [];
	let totalCount = 0;
	try {
		const response = await getArticleList({ offset, limit });
		blogs = response.contents;
		totalCount = response.totalCount;
		return {
			contents: blogs,
			totalCount,
			currentPage: 1,
			itemsPerPage: ITEMS_PER_PAGE
		};
	} catch (error) {
		console.error('データ取得エラー:', error);
		throw error;
	}
};

export const prerender = true;
