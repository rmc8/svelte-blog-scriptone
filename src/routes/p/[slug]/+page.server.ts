import { getList } from '../../../lib/microcms';
import type { PageServerLoad } from './$types';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async ({ params }) => {
	const page = Number(params.slug) || 1;
	const offset = (page - 1) * ITEMS_PER_PAGE;
	const limit = ITEMS_PER_PAGE;

	return await getList({ offset, limit });
};

export const prerender = true;


