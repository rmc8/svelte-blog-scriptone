import type { DiffData } from './diff';
import type { CardData } from './card';

export type ApiResponse = {
	status: string;
	diff: DiffData;
	card: CardData;
};
