type DifficultyCounts = {
	[key: number]: number;
};

export type DiffData = {
	difficulties: number[];
	easy: DifficultyCounts;
	normal: DifficultyCounts;
	hard: DifficultyCounts;
	expert: DifficultyCounts;
	master: DifficultyCounts;
	append: DifficultyCounts;
};
