import { ValueTrinity } from "./valuetrinity";

export interface Level {
    level: string;
    cclass: string;
    ability_score_bonuses: number;
    prof_bonus: number;
    features: ValueTrinity[];
}