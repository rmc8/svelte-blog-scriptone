import { getList } from '../../../lib/microcms';
import type { PageServerLoad } from './$types';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async ({ request, params }) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get('page')) || 1;

	const offset = (page - 1) * ITEMS_PER_PAGE;
	const limit = ITEMS_PER_PAGE;
	const slug = params.slug;
	const filters = `tags[contains]${slug}`;

	url.searchParams.delete('limit');
	return await getList({ offset, limit, filters });
};

export const prerender = true;
