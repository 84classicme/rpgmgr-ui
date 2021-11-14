import { Predicate } from "./predicate";
import { Traits } from "./traits";

export interface Rule{
    add: string[];
    key: string;
    type: string;
    label: string;
    selector: string;
    mode: string;
    outcomes: string[];
    path: string;
    predicate: Predicate;
    text: string;
    traits: Traits;
    value: object;
}