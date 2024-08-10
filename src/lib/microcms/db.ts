import Database from 'better-sqlite3';
import { writable } from 'svelte/store';
import type { Database as Db } from 'better-sqlite3';
import type { Blog } from '$lib/microcms/microcms';
import { getList } from '$lib/microcms/microcms';

let db: Db | undefined;
export const allBlogs = writable<Blog[]>([]);

const initDB = () => {
	if (!db) {
		db = new Database('./blogs.sqlite');
		db.exec('CREATE TABLE IF NOT EXISTS blogs (id TEXT PRIMARY KEY, data TEXT)');
	}
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

	allBlogs.set(allPosts); // ストアを更新
};

export const getAllBlogs = (): Blog[] => {
	initDB();
	const rows = db!.prepare('SELECT data FROM blogs').all();
	return rows.map((row: any) => JSON.parse(row.data));
};

export const getBlogById = (id: string): Blog | null => {
	initDB();
	const row = db!.prepare('SELECT data FROM blogs WHERE id = ?').get(id);
	return row ? JSON.parse(row.data) : null;
};

export const getBlogsByCategory = (categoryId: string): Blog[] => {
	initDB();
	const rows = db!
		.prepare('SELECT data FROM blogs WHERE json_extract(data, "$.category.id") = ?')
		.all(categoryId);
	return rows.map((row: any) => JSON.parse(row.data));
};

export const getBlogsByTag = (tagId: string): Blog[] => {
	initDB();
	const rows = db!
		.prepare('SELECT data FROM blogs WHERE json_extract(data, "$.tags") LIKE ?')
		.all(`%"id":"${tagId}"%`);
	return rows.map((row: any) => JSON.parse(row.data));
};

export const getBlogsByDate = (year: number, month?: number): Blog[] => {
	initDB();
	const startDate = new Date(year, month ? month - 1 : 0, 1).toISOString();
	const endDate = new Date(year, month ? month : 12, 0).toISOString();

	const rows = db!
		.prepare('SELECT data FROM blogs WHERE json_extract(data, "$.publishedAt") BETWEEN ? AND ?')
		.all(startDate, endDate);
	return rows.map((row: any) => JSON.parse(row.data));
};

// タグとそのカウントを取得する関数
export const getTagsWithCount = (): { tag: string; count: number }[] => {
	initDB();
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
};

// 年月単位での記事数を取得する関数
export const getMonthlyPostCounts = (): { yearMonth: string; count: number }[] => {
	initDB();
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
};
