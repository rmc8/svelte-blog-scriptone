import { getCategories, getMonthlyPostCounts, getTags } from '$lib/microcms/blogStore';

export const load = async () => {
	const categories = getCategories();
	const monthlyPostCounts = getMonthlyPostCounts();
	const tags = getTags();
	return { categories, tags, monthly_post_counts: monthlyPostCounts };
};
