export interface Subject {
	value: string;
	slug: string;
	label: string;
	aliases: string[];
}

export const subjects: Subject[] = [
	{
		value: "magyir",
		slug: "magyar-irodalom",
		label: "Magyar nyelv és irodalom",
		aliases: ["magyar", "magyir"],
	},
	{
		value: "mat",
		slug: "matematika",
		label: "Matematika",
		aliases: ["mat", "matek"],
	},
	{
		value: "tort",
		slug: "tortenelem",
		label: "Történelem",
		aliases: ["tort", "tori"],
	},
	{ value: "angol", slug: "angol", label: "Angol nyelv", aliases: ["angol"] },
	{ value: "nemet", slug: "nemet", label: "Német nyelv", aliases: ["nemet"] },
	{
		value: "inf",
		slug: "informatika",
		label: "Informatika",
		aliases: ["inf", "info"],
	},
	{
		value: "digkult",
		slug: "digitalis-kultura",
		label: "Digitális kultúra",
		aliases: ["digkult", "dk"],
	},
	{
		value: "bio",
		slug: "biologia",
		label: "Biológia",
		aliases: ["bio", "biosz"],
	},
	{
		value: "infoism",
		slug: "informatikai-ismeretek",
		label: "Informatikai ismeretek",
		aliases: ["infoism"],
	},
	{
		value: "ker",
		slug: "kereskedelem",
		label: "Kereskedelmi ismeretek",
		aliases: ["ker"],
	},
	{
		value: "kozg",
		slug: "kozgazdasag",
		label: "Közgazdasági ismeretek",
		aliases: ["kozg", "kozgaz"],
	},
	{ value: "kem", slug: "kemia", label: "Kémia", aliases: ["kem"] },
	{
		value: "fldr",
		slug: "foldrajz",
		label: "Földrajz",
		aliases: ["fldr", "foldrajz", "foci"],
	},
	{ value: "fiz", slug: "fizika", label: "Fizika", aliases: ["fiz"] },
];

export interface Period extends Subject {
	value: string;
	slug: string;
	label: string;
	aliases: string[];
}

export const periods: Period[] = [
	{
		value: "tavasz",
		slug: "tavasz",
		label: "Tavasz",
		aliases: ["tavasz", "tav", "tavaszi"],
	},
	{ value: "osz", slug: "osz", label: "Ősz", aliases: ["ősz", "osz", "oszi"] },
];

export type PeriodValue = "tavasz" | "osz";

export interface Level {
	value: string;
	slug: string;
	label: string;
	aliases: string[];
}

export const levels: Level[] = [
	{
		value: "kozep",
		slug: "kozep",
		label: "Közép",
		aliases: ["kozep", "kozepszint", "kozep szint"],
	},
	{
		value: "emelt",
		slug: "emelt",
		label: "Emelt",
		aliases: ["emelt", "emelt szint"],
	},
];

export type LevelValue = "kozep" | "emelt";

export const resourceMap = {
	feladat: "fl",
	utmutato: "ut",
	forras: "for",
	megoldas: "meg",
	hang: "hang",
} as const;

export type ResourceSlug = keyof typeof resourceMap;
