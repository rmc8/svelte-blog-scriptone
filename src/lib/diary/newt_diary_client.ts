import { NEWT_API_KEY, NEWT_SPACE_UID } from '$env/static/private';

const APP_ID = 'diary';
const MODEL_ID = 'article';
const NEWT_CDN_BASE_URL = `https://${NEWT_SPACE_UID}.cdn.newt.so/v1/${APP_ID}/${MODEL_ID}`;

export interface Post {
	_id: string;
	_sys: {
		createdAt: string;
		updatedAt: string;
		customOrder: number;
	};
	title: string;
	slug: string;
	body: string;
	meta: {
		title: string;
		description: string;
		ogImage: string | null;
	};
	coverImage: string | null;
	category: {
		_id: string;
		name: string;
	}[];
	tags: {
		_id: string;
		name: string;
	};
}

export async function fetchDiaryPosts(
	page: number,
	perPage = 10,
	tag?: string,
	search?: string
): Promise<{ posts: Post[]; totalPages: number }> {
	let url = `${NEWT_CDN_BASE_URL}?limit=${perPage}&skip=${(page - 1) * perPage}`;

	if (tag) {
		url += `&tags=${encodeURIComponent(tag)}`;
	}

	if (search) {
		url += `&q=${encodeURIComponent(search)}`;
	}

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${NEWT_API_KEY}`
		}
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	const posts = data.items as Post[];
	const totalPages = Math.ceil(data.total / perPage);
	return { posts, totalPages };
}

export async function fetchSinglePost(contentId: string): Promise<Post | null> {
	const url = `${NEWT_CDN_BASE_URL}/${contentId}`;
	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${NEWT_API_KEY}`
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const post = (await response.json()) as Post;
		return post;
	} catch (error) {
		console.error('Error fetching single post:', error);
		throw error;
	}
}
