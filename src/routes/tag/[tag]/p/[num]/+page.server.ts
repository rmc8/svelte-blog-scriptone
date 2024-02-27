import { getList } from '../../../../../lib/microcms';
import type { PageServerLoad } from './$types';

const ITEMS_PER_PAGE = 6;

export const load: PageServerLoad = async ({ params }) => {
	const tagSlug = params.tag;
	const pageSlug = params.num;

	const page = Number(pageSlug) || 1;
	const offset = (page - 1) * ITEMS_PER_PAGE;
	const limit = ITEMS_PER_PAGE;
	const filters = `tags[contains]${tagSlug}`;

	return await getList({ offset, limit, filters });
};

export const ssr = true;
