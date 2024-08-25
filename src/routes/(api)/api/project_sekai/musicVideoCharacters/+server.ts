// src/routes/api/cards/+server.ts

import { handleApiRequest } from '$lib/api/project_sekai/helper';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	return handleApiRequest('musicVideoCharacters', url);
};
