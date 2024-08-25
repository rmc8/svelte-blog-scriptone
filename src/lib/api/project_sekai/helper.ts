import { json } from '@sveltejs/kit';

const github_base_url = 'https://raw.githubusercontent.com';
const base_url = `${github_base_url}/Sekai-World/sekai-master-db-diff/main`;

export function getUrl(param: string): string {
	return `${base_url}/${param}.json`;
}

export interface PaginatedResponse<T> {
	totalCount: number;
	fetchCount: number;
	skip: number;
	limit: number;
	data: T[];
}

const MAX_LIMIT = 512;

function validateData(data: any): boolean {
	return Array.isArray(data);
}

export async function paginateData<T>(
	fetchUrl: string,
	skip: number,
	limit: number
): Promise<PaginatedResponse<T>> {
	const fetchCount = Math.abs(limit - skip);
	const limitedLimit = Math.min(Math.max(1, fetchCount), MAX_LIMIT);

	const response = await fetch(fetchUrl);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const text = await response.text();
	const allData: T[] = JSON.parse(text);

	if (!validateData(allData)) {
		throw new Error('無効なデータ形式です');
	}

	const paginatedData = allData.slice(skip, limitedLimit);

	return {
		totalCount: allData.length,
		fetchCount: paginatedData.length,
		skip,
		limit: limitedLimit,
		data: paginatedData
	};
}

export async function handleApiRequest<T>(param: string, url: URL): Promise<Response> {
	const apiUrl = getUrl(param);
	const skip = parseInt(url.searchParams.get('skip') ?? '0', 10);
	const limit = parseInt(url.searchParams.get('limit') ?? '10', 10);

	try {
		const result = await paginateData<T>(apiUrl, skip, limit);
		return json(result, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	} catch (error) {
		console.error('データの取得中にエラーが発生しました:', error);
		console.error('エラーの詳細:', JSON.stringify(error, null, 2));
		return json({ error: 'データの取得に失敗しました' }, { status: 500 });
	}
}
