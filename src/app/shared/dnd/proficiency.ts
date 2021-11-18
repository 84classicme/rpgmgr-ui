import { ValueTrinity } from "./valuetrinity";

export interface Proficiency {
    index: string;
    type: string;
    name: string;
    classes: string[];
    races: string[];
    reference: ValueTrinity;
    references: ValueTrinity[];
    url: string;
}