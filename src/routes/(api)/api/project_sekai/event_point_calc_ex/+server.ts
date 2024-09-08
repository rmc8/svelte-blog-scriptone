import { error } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const b = url.searchParams.get('b');
	const p = url.searchParams.get('p');

	const basicPoint = b ? parseInt(b) : 100;

	// pパラメータの検証
	const pValue = p ? parseInt(p) : null;
	if (p !== null && (isNaN(pValue) || pValue < 100)) {
		throw error(400, 'pパラメータは100以上の数値である必要があります');
	}

	const apiUrl = `https://raw.githubusercontent.com/rmc8/prsk_event_point_calc/main/api/point_data_bp${basicPoint}.json`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('APIリクエストに失敗しました');
		}
		const data = await response.json();

		// pValueに基づいてデータを処理
		let result = [];
		if (pValue !== null) {
			const key = pValue.toString();
			if (key in data) {
				result = data[key];
			}
		}

		return new Response(JSON.stringify({ data: result }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (err) {
		console.error(err);
		if (err instanceof Error && err.message === 'APIリクエストに失敗しました') {
			throw error(502, 'APIリクエストに失敗しました');
		}
		throw error(500, 'サーバーエラーが発生しました');
	}
};
