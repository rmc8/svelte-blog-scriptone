import fetch from 'node-fetch';
import https from 'https';

export const WP_URL = `https://rmc8.wpxblog.jp/`;
export const BASE_URL = `${WP_URL}/wp-json/wp/v2/`;

export interface Post {
	id: number;
	date: string;
	date_gmt: string;
	guid: {
		rendered: string;
	};
	modified: string;
	modified_gmt: string;
	slug: string;
	status: string;
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	content: {
		rendered: string;
		protected: boolean;
	};
	excerpt: {
		rendered: string;
		protected: boolean;
	};
	author: number;
	featured_media: number;
	comment_status: string;
	ping_status: string;
	sticky: boolean;
	template: string;
	format: string;
	meta: {
		footnotes: string;
	};
	categories: number[];
	tags: [];
	class_list: string[];
	_links: {
		self: [];
		collection: [];
		about: [];
		author: [];
		replies: [];
		'version-history': [];
		'predecessor-version'?: [];
		'wp:attachment': [];
		'wp:term': [];
		curies: [];
	};
}

export async function fetchDiaryPosts(
	page: number,
	perPage = 10,
	t?: string,
	s?: string
): Promise<{ posts: Post[]; totalPages: number }> {
	let url = `${BASE_URL}posts?page=${page}&per_page=${perPage}&categories=1`;

	if (t) {
		url += `&tags=${t}`;
	}

	if (s) {
		url += `&search=${encodeURIComponent(s)}`;
	}

	const agent = new https.Agent({
		rejectUnauthorized: true
	});

	const response = await fetch(url, {
		agent,
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
			'Access-Control-Request-Method': 'GET',
			'Access-Control-Request-Headers': 'Content-Type'
		}
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const posts = (await response.json()) as Post[];
	const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
	console.log(posts);

	return { posts, totalPages };
}

export async function fetchSinglePost(slug: string): Promise<Post | null> {
	let url = `${BASE_URL}posts?slug=${slug}`;
	const agent = new https.Agent({
		rejectUnauthorized: true
	});

	try {
		const response = await fetch(url, {
			agent,
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
				'Access-Control-Request-Method': 'GET',
				'Access-Control-Request-Headers': 'Content-Type'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const posts = (await response.json()) as Post[];

		// slugでフィルタリングすると、通常は1つの投稿のみが返されます
		// 最初の投稿を返すか、投稿が見つからない場合はnullを返します
		return posts.length > 0 ? posts[0] : null;
	} catch (error) {
		console.error('Error fetching single post:', error);
		throw error;
	}
}
