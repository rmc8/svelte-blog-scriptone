import { getCategories, getMonthlyPostCounts, getTags } from '$lib/microcms/blogStore';
export const load = () => {
	const categories = getCategories();
	const monthlyPostCounts = getMonthlyPostCounts();
	const tags = getTags();
	// const
	return { categories, tags, monthly_post_counts: monthlyPostCounts };
};
