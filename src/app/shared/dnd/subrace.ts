import { AbilityBonus } from "./abilitybonus";
import { ValueTrinity } from "./valuetrinity";
import { OptionsTrinity } from "./optiontrinity";

export interface Subrace {
    index: string;
    name: string;
    ability_bonuses: AbilityBonus[];
    starting_proficiencies: ValueTrinity[];
    languages: ValueTrinity[];
    language_options: OptionsTrinity;
    racial_traits: ValueTrinity[];
    url: string;
}