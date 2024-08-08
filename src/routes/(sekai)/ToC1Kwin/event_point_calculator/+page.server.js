import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(308, '/project_sekai/event_point_calculator');
}
