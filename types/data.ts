export type dailyIdiomType = {
    idiom: string;
    idiom_modified: string;
    etymology: string;
    definitions: string[];
    keywords: string[];
    keywords_pos: string[];
    swapword: string;
    swapword_incorrect: string;
    swapword_pos: string;
    swapword_distractors: string[];
    daily_date: Date;
}