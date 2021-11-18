import { Prerequisite } from "./prerequisite";
import { ValueTrinity } from "./valuetrinity";

export interface Multiclassing{
    prerequisites: Prerequisite[];
    proficiencies: ValueTrinity[];
}