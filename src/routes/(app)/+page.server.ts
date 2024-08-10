import { getArticles, getCategories, getMonthlyPostCounts, getTags } from '$lib/microcms/blogStore';
import type { PageServerLoad } from './$types';
import type { Blog } from '$lib/microcms/microcms';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async () => {
	const offset = 0;
	const limit = ITEMS_PER_PAGE;

	try {
		const response = getArticles({ offset, limit });
		const blogs: Blog[] = response.contents;
		const categories = getCategories();
		const monthlyPostCounts = getMonthlyPostCounts();
		const tags = getTags();
		return {
			contents: blogs,
			totalCount: response.totalCount,
			currentPage: 1,
			itemsPerPage: ITEMS_PER_PAGE,
			categories,
			monthly_post_counts: monthlyPostCounts,
			tags
		};
	} catch (error) {
		console.error('データ取得エラー:', error);
		throw error;
	}
};

export const prerender = true;
