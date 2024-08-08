import { getDetail } from '$lib/microcms';
import type { PageServerLoad } from './$types';

import { get } from 'svelte/store';
import { allBlogs, fetchAllBlogs } from '$lib/microcms/blogStore';
import type { Blog, Tag } from '$lib/microcms';

function shuffleArray(array: Blog[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function getRelatedPosts(currentPost: Blog, count = 6): Blog[] {
	const blogs = get(allBlogs);
	let relatedPosts: Blog[] = [];

	// タグが一致する記事を抽出
	const tagRelatedPosts = blogs.filter(
		(post: Blog) =>
			post.id !== currentPost.id &&
			post.tags.some((tag: Tag) => currentPost.tags.some((t: Tag) => t.id === tag.id))
	);
	relatedPosts = tagRelatedPosts.slice(0, count);

	// 同じカテゴリーの記事を抽出（もし必要な場合）
	if (relatedPosts.length < count) {
		const categoryRelatedPosts = blogs.filter(
			(post: Blog) =>
				post.id !== currentPost.id &&
				post.category.id === currentPost.category.id &&
				!relatedPosts.some((rp: Blog) => rp.id === post.id)
		);
		relatedPosts = [...relatedPosts, ...categoryRelatedPosts.slice(0, count - relatedPosts.length)];
	}

	// ブログ全体からランダムに抽出（もし必要な場合）
	if (relatedPosts.length < count) {
		const remainingPosts = blogs.filter(
			(post: Blog) =>
				post.id !== currentPost.id && !relatedPosts.some((rp: Blog) => rp.id === post.id)
		);
		relatedPosts = [...relatedPosts, ...remainingPosts.slice(0, count - relatedPosts.length)];
	}

	shuffleArray(relatedPosts);
	return relatedPosts.slice(0, count);
}


function getRecentPosts(currentPost: Blog, count = 6): Blog[] {
	const blogs = get(allBlogs);
	const recentPosts = blogs
		.filter((post: Blog) => post.id !== currentPost.id)
		.slice(0, count);
	return recentPosts;
}


export const load: PageServerLoad = async ({ params }) => {
	await fetchAllBlogs();
	const blogData = await getDetail(params.slug);
	const res = {
		blog: blogData,
		recentPosts: getRecentPosts(blogData),
		relatedPosts: getRelatedPosts(blogData)
	};
	return res;
};

export const prerender = true;
