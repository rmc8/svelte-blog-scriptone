import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(308, '/project_sekai/simple_efficiency_table_for_prsk_music');
}
