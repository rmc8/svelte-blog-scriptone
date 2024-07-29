import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(308, '/project_sekai/multi_live_score_up_multiplier');
}
