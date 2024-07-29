export type RarityCounts = {
	[key: string]: number;
	fes: number;
	limited: number;
	rarity_4: number;
	rarity_3: number;
	rarity_2: number;
	rarity_1: number;
	rarity_birthday: number;
};

export type TypeCounts = {
	[key: string]: number;
	cute: number;
	cool: number;
	pure: number;
	happy: number;
	mysterious: number;
};

export type SkillCounts = {
	[key: string]: number;
	score: number;
	judge: number;
	life: number;
	perfect: number;
	fes_life: number;
	fes_perfect: number;
	vs: number;
};

export type CharacterRarityCounts = {
	[key: string]: RarityCounts;
};

export type CharacterTypeCounts = {
	[key: string]: TypeCounts;
};

export type CharacterSkillCounts = {
	[key: string]: SkillCounts;
};

export type CardData = {
	byRarity: CharacterRarityCounts;
	byRarityForVs: CharacterRarityCounts;
	byType: CharacterTypeCounts;
	byTypeForVs: CharacterTypeCounts;
	bySkill: CharacterSkillCounts;
	bySkillForVs: CharacterSkillCounts;
};
