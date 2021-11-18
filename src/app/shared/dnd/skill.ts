import { ValueTrinity } from "./valuetrinity";

export interface Skill {
    index: string;
    name: string;
    desc: string[];
    ability_score: ValueTrinity;
    url: string;
}