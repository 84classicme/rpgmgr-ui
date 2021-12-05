import { AbilityBonus } from "./abilitybonus";
import { ValueTrinity } from "./valuetrinity";
import { OptionsTrinity } from "./optiontrinity";
import { AbilityOptionsTrinity } from "./abilityoptiontrinity";

export interface Race {
    index: string;
    name: string;
    speed: number;
    ability_bonuses: AbilityBonus[];
    ability_bonus_options: AbilityOptionsTrinity;
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