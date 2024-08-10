import {
	fetchAllBlogs,
	getArticleList,
	getBlogsByTag,
	getBlogsByCategory,
	getBlogsByCategoryAndTag,
	getBlogsByDate
} from '$lib/microcms/blogStore';
import type { PageServerLoad } from './$types';
import type { Blog } from '$lib/microcms/microcms';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async ({ url }) => {
	await fetchAllBlogs();

	const page = Number(url.searchParams.get('p')) || 1;
	const tag = url.searchParams.get('t') || null;
	const category = url.searchParams.get('c') || null;
	const date_str = url.searchParams.get('d') || null;

	const offset = (page - 1) * ITEMS_PER_PAGE;
	const limit = ITEMS_PER_PAGE;

	let blogs: Blog[] = [];
	let totalCount = 0;

	if (tag && category) {
		blogs = getBlogsByCategoryAndTag(category, tag);
	} else if (tag) {
		blogs = getBlogsByTag(tag);
	} else if (category) {
		blogs = getBlogsByCategory(category);
	} else if (date_str && /^\d{4}-\d{2}$/.test(date_str)) {
		const [year, month] = date_str.split('-').map(Number);
		blogs = getBlogsByDate(year, month);
	} else {
		try {
			const response = await getArticleList({ offset, limit });
			blogs = response.contents;
			totalCount = response.totalCount;
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
	}

	totalCount = blogs.length;
	blogs = blogs.slice(offset, offset + limit);

	return {
		contents: blogs,
		totalCount,
		currentPage: page,
		itemsPerPage: ITEMS_PER_PAGE,
		tag,
		category,
		date: date_str
	};
};

export const prerender = 'auto';
