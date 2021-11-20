import { Class } from "../shared/dnd/class";
import { Language } from "../shared/dnd/language";
import { Proficiency } from "../shared/dnd/proficiency";
import { Race } from "../shared/dnd/race";

export interface Character {
    name: string;
    race: Race;
    class: Class;
    str: string;
    dex: string;
    con: string;
    int: string;
    wis: string;
    cha: string;
    description: string;
    equipment: string[];
    height: string;
    weight: string;
    hair: string;
    eyes: string;
    alignment: string;
    deity: string;
    background: string;
    skill1: string;
    skill2: string;
    proficiencies: string[],
    languages: string[]
}