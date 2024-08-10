import { getArticleList } from '$lib/microcms/blogStore';
import type { PageServerLoad } from './$types';
import type { Blog } from '$lib/microcms/microcms';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async ({ params }) => {
	// URLパラメータからページ番号を取得し、数値に変換
	const page = parseInt(params.p, 10) || 1;

	const offset = (page - 1) * ITEMS_PER_PAGE;
	const limit = ITEMS_PER_PAGE;

	try {
		const response = await getArticleList({ offset, limit });
		const blogs: Blog[] = response.contents;
		const totalCount: number = response.totalCount;

		return {
			contents: blogs,
			totalCount,
			currentPage: page,
			itemsPerPage: ITEMS_PER_PAGE
		};
	} catch (error) {
		console.error('データ取得エラー:', error);
		throw error;
	}
};

export const prerender = true;
