import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(308, '/project_sekai/cheerful_bingo');
}
