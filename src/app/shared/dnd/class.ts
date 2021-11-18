import { Equipment } from "./equipment";
import { EquipmentOption } from "./equipmentoption";
import { Multiclassing } from "./multiclassing";
import { OptionsTrinity } from './optiontrinity'
import { ValueTrinity } from "./valuetrinity";

export interface Class {
    index: string;
    name: string;
    hit_die: number;
    proficiency_choices: OptionsTrinity[];
    proficiencies: ValueTrinity[];
    saving_throws: ValueTrinity[];
    starting_equipment: Equipment[];
    starting_equipment_options: EquipmentOption[];
    class_levels: string;
    multi_classing: Multiclassing;
    subclasses: ValueTrinity[];
    url: string;
}