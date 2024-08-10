import { get } from 'svelte/store';
import Database from 'better-sqlite3';
import { writable } from 'svelte/store';
import type { Database as Db } from 'better-sqlite3';
import type { Blog } from '$lib/microcms/microcms';
import { getList } from '$lib/microcms/microcms';

export const dbStore = writable<Db | null>(null);
export const allBlogs = writable<Blog[]>([]);
export const categories = writable<{ id: string; name: string; count: number }[]>([]);
export const tags = writable<{ id: string; name: string; count: number }[]>([]);
export const monthlyPosts = writable<{ yearMonth: string; count: number }[]>([]);

const initDB = () => {
	dbStore.update((currentDb) => {
		if (!currentDb) {
			const newDb = new Database('./blogs.sqlite');
			newDb.exec('CREATE TABLE IF NOT EXISTS blogs (id TEXT PRIMARY KEY, data TEXT)');
			return newDb;
		}
		return currentDb;
	});
};

export const fetchAllBlogs = async (): Promise<void> => {
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

	initDB();
	const db = get(dbStore);

	// 全ての投稿をdbにinsertする
	allPosts.forEach((post) => {
		if (db !== null) {
			db.prepare('INSERT OR REPLACE INTO blogs VALUES (?, ?)').run(post.id, JSON.stringify(post));
		}
	});

	// カテゴリーを取得してストアに格納
	const categoryData = getCategories();
	categories.set(categoryData);

	// タグを取得してストアに格納
	const tagData = getTags();
	tags.set(tagData);

	// 月別投稿を取得してストアに格納
	const monthlyPostsData = getMonthlyPostCounts();
	monthlyPosts.set(monthlyPostsData);
};

export const getArticleList = async ({
	offset = 0,
	limit = 10,
	tag = null,
	category = null
}: {
	offset?: number;
	limit?: number;
	tag?: string | null;
	category?: string | null;
}): Promise<{ contents: Blog[]; totalCount: number }> => {
	try {
		initDB();
		const db = get(dbStore);

		let query = 'SELECT data FROM blogs';
		let countQuery = 'SELECT COUNT(*) as count FROM blogs';
		const whereConditions: string[] = [];
		const params: any[] = [];

		if (tag) {
			whereConditions.push("json_extract(data, '$.tags') LIKE ?");
			params.push(`%"id":"${tag}"%`);
		}

		if (category) {
			whereConditions.push("json_extract(data, '$.category.id') = ?");
			params.push(category);
		}

		if (whereConditions.length > 0) {
			const whereClause = whereConditions.join(' AND ');
			query += ` WHERE ${whereClause}`;
			countQuery += ` WHERE ${whereClause}`;
		}

		query += " ORDER BY json_extract(data, '$.publishedAt') DESC LIMIT ? OFFSET ?";
		params.push(limit, offset);

		const rows = db!.prepare(query).all(...params);
		const countResult = db!.prepare(countQuery).get(...params.slice(0, -2));

		const contents = rows.map((row: any) => JSON.parse(row.data));
		const totalCount = countResult.count;

		return { contents, totalCount };
	} catch (error) {
		console.error('Error in getArticleList:', error);
		return { contents: [], totalCount: 0 };
	}
};

export const getAllBlogs = (): Blog[] => {
	try {
		initDB();
		const rows = db!.prepare('SELECT data FROM blogs').all();
		return rows.map((row: any) => JSON.parse(row.data));
	} catch (error) {
		console.error('Error in getAllBlogs:', error);
		return [];
	}
};

export const getBlogsByCategory = (categoryId: string): Blog[] => {
	try {
		initDB();
		const db = get(dbStore);
		const rows = db!
			.prepare("SELECT data FROM blogs WHERE json_extract(data, '$.category.id') = ?")
			.all(categoryId);
		return rows.map((row: any) => JSON.parse(row.data));
	} catch (error) {
		console.error('Error in getBlogsByCategory:', error);
		return [];
	}
};

export const getBlogsByTag = (tagId: string): Blog[] => {
	try {
		initDB();
		const db = get(dbStore);
		const rows = db!
			.prepare("SELECT data FROM blogs WHERE json_extract(data, '$.tags') LIKE ?")
			.all(`%"id":"${tagId}"%`);
		return rows.map((row: any) => JSON.parse(row.data));
	} catch (error) {
		console.error('Error in getBlogsByTag:', error);
		return [];
	}
};

export const getBlogsByDate = (year: number, month?: number): Blog[] => {
	try {
		initDB();
		const db = get(dbStore);
		const startDate = new Date(year, month ? month - 1 : 0, 1).toISOString();
		const endDate = new Date(year, month ? month : 12, 0).toISOString();

		const rows = db!
			.prepare("SELECT data FROM blogs WHERE json_extract(data, '$.publishedAt') BETWEEN ? AND ?")
			.all(startDate, endDate);
		return rows.map((row: any) => JSON.parse(row.data));
	} catch (error) {
		console.error('Error in getBlogsByDate:', error);
		return [];
	}
};

export const getTagsWithCount = (): { tag: string; count: number }[] => {
	try {
		initDB();
		const db = get(dbStore);
		const rows = db!
			.prepare(
				`
                SELECT json_extract(data, '$.tags[].name') as tags, COUNT(*) as count
                FROM blogs
                GROUP BY tags
            `
			)
			.all();

		return rows.flatMap((row: any) => {
			const tags = JSON.parse(row.tags);
			return tags.map((tag: string) => ({ tag, count: row.count }));
		});
	} catch (error) {
		console.error('Error in getTagsWithCount:', error);
		return [];
	}
};

export const getMonthlyPostCounts = (): { yearMonth: string; count: number }[] => {
	try {
		initDB();
		const db = get(dbStore);
		const rows = db!
			.prepare(
				`
                SELECT 
                    strftime('%Y-%m', json_extract(data, '$.publishedAt')) as yearMonth,
                    COUNT(*) as count
                FROM blogs
                GROUP BY yearMonth
                ORDER BY yearMonth DESC
                `
			)
			.all();

		return rows.map((row: any) => ({
			yearMonth: row.yearMonth,
			count: row.count
		}));
	} catch (error) {
		console.error('Error in getMonthlyPostCounts:', error);
		return [];
	}
};

export const getCategories = (): { id: string; name: string; count: number }[] => {
	try {
		initDB();
		const db = get(dbStore);
		const rows = db!
			.prepare(
				`
                WITH RAW_DATA AS (
                    SELECT
                        json_extract(data, '$.category.id') as id,
                        json_extract(data, '$.category.name') as name
                    FROM blogs
                    WHERE json_extract(data, '$.category.id') IS NOT NULL
                )
                SELECT
                    id,
                    name,
                    COUNT(*) as count
                FROM RAW_DATA
                GROUP BY id, name
                ORDER BY count DESC, name ASC
                `
			)
			.all();

		return rows.map((row: any) => ({
			id: row.id.replace(/^"|"$/g, ''), // 前後のダブルクォートを削除
			name: row.name.replace(/^"|"$/g, ''), // 前後のダブルクォートを削除
			count: row.count
		}));
	} catch (error) {
		console.error('Error in getCategories:', error);
		return [];
	}
};

export const getTags = (): { id: string; name: string; count: number }[] => {
	try {
		initDB();
		const db = get(dbStore);
		const rows = db!
			.prepare(
				`
                WITH RAW_DATA AS (
                    SELECT
                        json_extract(value, '$.id') as id,
                        json_extract(value, '$.name') as name
                    FROM blogs, json_each(json_extract(blogs.data, '$.tags'))
                    WHERE json_extract(value, '$.id') IS NOT NULL
                )
                SELECT
                    id,
                    name,
                    COUNT(*) as count
                FROM RAW_DATA
                GROUP BY id, name
                ORDER BY count DESC, name ASC
                `
			)
			.all();

		return rows.map((row: any) => ({
			id: row.id.replace(/^"|"$/g, ''), // 前後のダブルクォートを削除
			name: row.name.replace(/^"|"$/g, ''), // 前後のダブルクォートを削除
			count: row.count
		}));
	} catch (error) {
		console.error('Error in getTags:', error);
		return [];
	}
};

export const getMonthlyPosts = (): { yearMonth: string; posts: Blog[]; count: number }[] => {
	try {
		initDB();
		const db = get(dbStore);
		const rows = db!
			.prepare(
				`
                SELECT 
                    strftime('%Y-%m', json_extract(data, '$.publishedAt')) as yearMonth,
                    GROUP_CONCAT(data) as posts,
                    COUNT(*) as count
                FROM blogs
                GROUP BY yearMonth
                ORDER BY yearMonth DESC
                `
			)
			.all();

		return rows.map((row: any) => ({
			yearMonth: row.yearMonth,
			posts: row.posts.split(',').map((post: string) => JSON.parse(post)),
			count: row.count
		}));
	} catch (error) {
		console.error('Error in getMonthlyPosts:', error);
		return [];
	}
};
