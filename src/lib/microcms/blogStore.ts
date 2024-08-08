import { writable } from 'svelte/store';
import type { Blog } from '$lib/microcms';
import { getList } from '$lib/microcms';

export const allBlogs = writable<Blog[]>([]);

export const fetchAllBlogs = async () => {
	let offset = 0;
	const limit = 100;
	let allPosts: Blog[] = [];
	let totalCount = 0;

	do {
		const response = await getList({ limit, offset });
		allPosts = [...allPosts, ...response.contents];
		totalCount = response.totalCount;
		offset += limit;
	} while (offset < totalCount);

	allBlogs.set(allPosts);
};

// ローカルストレージを使用してキャッシュを実装
const CACHE_KEY = 'microcms_blogs';

export const saveBlogsToCache = (blogs: Blog[]) => {
	localStorage.setItem(CACHE_KEY, JSON.stringify(blogs));
};

export const loadBlogsFromCache = (): Blog[] | null => {
	const cached = localStorage.getItem(CACHE_KEY);
	return cached ? JSON.parse(cached) : null;
};
