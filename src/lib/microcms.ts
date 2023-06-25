import { createClient, type MicroCMSQueries, type MicroCMSImage } from 'microcms-js-sdk';
import { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } from '$env/static/private';
const client = createClient({
	serviceDomain: MICROCMS_SERVICE_DOMAIN,
	apiKey: MICROCMS_API_KEY
});

//型定義
export type Blog = {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	title: string;
	content: string;
	category: string;
	tag: any;
	eyecatch?: MicroCMSImage;
};
export type BlogResponse = {
	totalCount: number;
	offset: number;
	limit: number;
	contents: Blog[];
};

export const getList = async (queries?: MicroCMSQueries) => {
	return await client.get<BlogResponse>({ endpoint: 'blogs', queries });
};

export const getCategory = async (queries?: MicroCMSQueries) => {
	return await client.get<BlogResponse>({ endpoint: 'categories', queries });
};

export const getTag = async (queries?: MicroCMSQueries) => {
	return await client.get<BlogResponse>({ endpoint: 'tags', queries });
};

export const getDetail = async (contentId: string, queries?: MicroCMSQueries) => {
	return await client.getListDetail<Blog>({
		endpoint: 'blogs',
		contentId,
		queries
	});
};
