import { AbilityBonus } from "../shared/dnd/abilitybonus"
import { Class } from "../shared/dnd/class"
import { OptionsTrinity } from "../shared/dnd/optiontrinity"
import { Race } from "../shared/dnd/race"
import { Subrace } from "../shared/dnd/subrace"
import { ValueTrinity } from "../shared/dnd/valuetrinity"


export interface Character {
    name: string;
    race: Race;
    raceSkills: string[];
    subrace: Subrace;
    subraceAbilityOptions: AbilityBonus[];
    class: Class;
    str: string;
    dex: string;
    con: string;
    int: string;
    wis: string;
    cha: string;
    skills: string[];
    proficiencies: string[];
    instruments: string[];
    languages: string[];
    subraceLanguage: string;
    equipment: string[];
    height: string;
    weight: string;
    hair: string;
    eyes: string;
    alignment: string;
    deity: string;
    description: string;
    background: Background;
}

export interface Background {
    skills: string[];
    proficiencies: string[];
    feature: string;
}



  