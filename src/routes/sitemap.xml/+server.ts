import { getList } from '../../lib/microcms';

// APIレスポンスの型定義
interface Item {
	tags: Tag[];
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	title: string;
	body_markdown: string;
	category: Category;
	eyecatch: string;
	description: string;
	toc: boolean;
}

interface Category {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	name: string;
}

interface Tag {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	name: string;
}

interface ItemListResponse {
	contents: Item[];
	totalCount: number;
	offset: number;
	limit: number;
}

// 全てのアイテムを取得する関数
async function getAllItems(): Promise<Item[]> {
	let items: Item[] = [];
	let offset = 0;
	const limit = 100; // 一度に取得するアイテムの数
	while (true) {
		const response: ItemListResponse = await getList({ offset, limit });
		items = items.concat(response.contents);
		if (items.length >= response.totalCount) {
			// 全てのアイテムを取得した場合、ループを終了
			break;
		}
		offset += limit;
	}
	return items;
}

const domain = 'rmc-8.com';

const hardcodedUrls = [
	`https://${domain}/`,
	`https://${domain}/about`,
	`https://${domain}/moyouSky`,
	`https://${domain}/project_sekai`,
	`https://${domain}/project_sekai/event_point_calculator`,
	`https://${domain}/project_sekai/simple_efficiency_table_for_prsk_music`,
	`https://${domain}/project_sekai/multi_live_score_up_multiplier`
];

export async function GET(): Promise<Response> {
	const items = await getAllItems();

	// APIから取得したURLに更新日を含める
	const itemUrls = items.map((item) => ({
		loc: `https://${domain}/${item.id}`,
		lastmod: item.updatedAt
	}));

	// 手書きのURLとAPIから取得したURLを組み合わせる
	const urls = hardcodedUrls.map((url) => ({ loc: url })).concat(itemUrls);

	// XMLサイトマップの生成
	const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
					.map(
						(url) => `
            <url>
                <loc>${url.loc}</loc>
                ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
            </url>
        `
					)
					.join('')}
    </urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
