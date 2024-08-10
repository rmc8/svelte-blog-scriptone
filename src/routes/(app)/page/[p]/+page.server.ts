import { getArticles, getCategories, getMonthlyPostCounts, getTags } from '$lib/microcms/blogStore';
import type { PageServerLoad } from './$types';
import type { Blog } from '$lib/microcms/microcms';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async ({ params }) => {
	const page = parseInt(params.p, 10) || 1;
	const offset = (page - 1) * ITEMS_PER_PAGE;
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
			currentPage: page,
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
