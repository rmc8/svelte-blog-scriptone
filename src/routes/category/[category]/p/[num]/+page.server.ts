import { getList } from '../../../../../lib/microcms';
import type { PageServerLoad } from './$types';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async ({ params }) => {
	const categorySlug = params.category;
	const pageSlug = params.num;
	console.log(categorySlug);
	console.log(pageSlug);

	const page = Number(pageSlug) || 1;
	const offset = (page - 1) * ITEMS_PER_PAGE;
	const limit = ITEMS_PER_PAGE;
	const filters = `category[equals]${categorySlug}`;

	return await getList({ offset, limit, filters });
};

export const prerender = true;
