import { getBlogsByDate } from '$lib/microcms/blogStore';
import type { PageServerLoad } from './$types';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async ({ params }) => {
	const dt = params.d;
	const page = parseInt(params.p, 10) || 1;

	const offset = (page - 1) * ITEMS_PER_PAGE;
	const limit = ITEMS_PER_PAGE;
	const [year, month] = dt.split('-').map(Number);
	try {
		const allTaggedBlogs = getBlogsByDate(year, month);
		const totalCount = allTaggedBlogs.length;
		const blogs = allTaggedBlogs.slice(offset, offset + limit);

		return {
			contents: blogs,
			totalCount,
			currentPage: page,
			itemsPerPage: ITEMS_PER_PAGE,
			dt
		};
	} catch (error) {
		console.error('データ取得エラー:', error);
		throw error;
	}
};

export const prerender = true;
