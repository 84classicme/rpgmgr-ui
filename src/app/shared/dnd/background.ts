import { Equipment } from "./equipment";
import { OptionsString } from "./optionstring";
import { ValueTrinity } from "./valuetrinity";
import { OptionsTrinity } from "./optiontrinity";
import { ValueDuo } from "./valueduo";

export interface Background {
    index: string;
    name: string;
    starting_proficiencies: ValueTrinity;
    language_options: OptionsTrinity;
    starting_equipment: Equipment[];
    feature: ValueDuo;
    personality_traits: OptionsString;
    ideals: OptionsString;
    bonds: OptionsString;
    flaws: OptionsString;
    url: string;
}