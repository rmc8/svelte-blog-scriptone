import {
	fetchAllBlogs,
	getCategories,
	getMonthlyPostCounts,
	getTags
} from '$lib/microcms/blogStore';

export const load = async () => {
	await fetchAllBlogs();
	const categories = getCategories();
	const monthlyPostCounts = getMonthlyPostCounts();
	const tags = getTags();
	return { categories, tags, monthly_post_counts: monthlyPostCounts };
};
