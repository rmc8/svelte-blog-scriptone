import { getList } from '../lib/microcms';
import type { PageServerLoad } from './$types';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async ({ request }) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get('page')) || 1;

	const offset = (page - 1) * ITEMS_PER_PAGE;
	const limit = ITEMS_PER_PAGE;

	url.searchParams.delete('limit');
	return await getList({ offset, limit });
};

export const prerender = false;
