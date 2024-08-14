import fs from 'fs';
import Database from 'better-sqlite3';
import { get, writable } from 'svelte/store';
import type { Database as Db } from 'better-sqlite3';
import type { Blog } from '$lib/microcms/microcms';
import { getList } from '$lib/microcms/microcms';

export const dbStore = writable<Db | null>(null);
export const allBlogs = writable<Blog[]>([]);
export const allBlogsCount = writable<number>(1);
export const totalCount = writable<number>(1);
export const categories = writable<{ id: string; name: string; count: number }[]>([]);
export const tags = writable<{ id: string; name: string; count: number }[]>([]);
export const monthlyPosts = writable<{ yearMonth: string; count: number }[]>([]);

const DB_PATH = './blogs.sqlite';

const initDB = () => {
	dbStore.update((currentDb) => {
		if (!currentDb) {
			const newDb = new Database(DB_PATH);
			newDb.exec('CREATE TABLE IF NOT EXISTS blogs (id TEXT PRIMARY KEY, data TEXT)');
			return newDb;
		}
		return currentDb;
	});
};

export const fetchAllBlogs = async (): Promise<void> => {
	let allPosts: Blog[] = [];
	initDB();
	const db = get(dbStore);

	if (fs.existsSync(DB_PATH)) {
		const rows = db.prepare('SELECT * FROM blogs').all();
		allPosts = rows.map((row) => JSON.parse(row.data));
		console.log("Exists 'blogs.sqlite'");
	} else {
		let offset = 0;
		const limit = 100;
		do {
			const response = await getList({ limit, offset });
			allPosts = [...allPosts, ...response.contents];
			totalCount.set(response.totalCount);
			offset += limit;
		} while (offset < get(totalCount));

		allBlogs.set(allPosts);

		allPosts.forEach((post) => {
			if (db !== null) {
				db.prepare('INSERT OR REPLACE INTO blogs VALUES (?, ?)').run(post.id, JSON.stringify(post));
			}
		});
	}
	// 全ての記事の数をカウントする
	const articlesCount = allPosts.length;
	allBlogsCount.set(articlesCount);

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

export const getArticles = ({
	offset = 0,
	limit = 10
}: {
	offset?: number;
	limit?: number;
}): { contents: Blog[]; totalCount: number } => {
	try {
		initDB();
		const db = get(dbStore);
		if (!db) throw new Error('Database not initialized');

		const query =
			"SELECT data FROM blogs ORDER BY json_extract(data, '$.publishedAt') DESC LIMIT ? OFFSET ?";
		const rows = db.prepare(query).all(limit, offset);
		const countQuery = 'SELECT count(*) as count FROM blogs';
		const allRecCount = db.prepare(countQuery).all()[0].count;
		const contents = rows.map((row: any) => JSON.parse(row.data));

		return { contents, totalCount: allRecCount };
	} catch (error) {
		console.error('Error in getArticleList:', error);
		return { contents: [], totalCount: 0 };
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
		console.error('Error in getBlogsByDate:', `${error}, ${year}, ${month}`);
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
