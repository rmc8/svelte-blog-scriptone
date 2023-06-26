import { getList } from '../../../../../lib/microcms';
import type { PageServerLoad } from './$types';

const ITEMS_PER_PAGE = 6;

function extractCategorySlug(url: string) {
	const parts = url.split('/');
	const categoryIndex = parts.indexOf('tag');
	if (categoryIndex !== -1 && categoryIndex + 1 < parts.length) {
		return parts[categoryIndex + 1];
	}
	return '';
}

export const load: PageServerLoad = async ({ params, request }) => {
	const tagSlug = extractCategorySlug(request.url);
	console.log(tagSlug);
	const pageSlug = params.slug;

	const page = Number(pageSlug) || 1;
	const offset = (page - 1) * ITEMS_PER_PAGE;
	const limit = ITEMS_PER_PAGE;
	const filters = `tags[contains]${tagSlug}`;

	return await getList({ offset, limit, filters });
};

export const prerender = true;
