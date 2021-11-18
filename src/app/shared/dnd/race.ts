import { AbilityBonus } from "./abilitybonus";
import { ValueTrinity } from "./valuetrinity";
import { OptionsTrinity } from "./optiontrinity";

export interface Race {
    index: string;
    name: string;
    speed: number;
    ability_bonuses: AbilityBonus;
    alignment: string;
    age: string;
    size: string;
    size_description: string;
    starting_proficiencies: ValueTrinity[];
    starting_proficiency_options: OptionsTrinity;
    languages: ValueTrinity[];
    language_desc: string;
    traits: ValueTrinity[];
    subraces: ValueTrinity[];
    url: string;
}