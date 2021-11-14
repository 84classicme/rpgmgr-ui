import { Rule } from '../shared/rule'
import { SpellArea } from './spellarea'
import { SpellComponents } from './spellcomponents'
import { SpellSave } from './spellsave'
import { SpellTraditions } from './spelltraditions'
import { Traits } from '../shared/traits'
import { ValueBoolean } from '../shared/valueboolean'
import { ValueInteger } from '../shared/valueinteger'
import { ValueString } from '../shared/valuestring'

export interface SpellData {
    ability: ValueString;
    area: SpellArea;
    areasize: ValueString;
    autoHeightenLevel: ValueInteger;
    category: ValueString;
    components: SpellComponents;
    cost: ValueString;
    description: ValueString;
    duration: ValueString;
    hasCounteractCheck: ValueBoolean;
    level:ValueInteger;
    location: ValueString;
    materials: ValueString;
    prepared: ValueString;
    primarycheck: ValueString;
    range: ValueString;
    save: SpellSave;
    school: ValueString;
    secondarycasters: ValueString;
    secondarycheck: ValueString;
    source: ValueString;
    spellType: ValueString;
    sustained: ValueBoolean;
    target: ValueString;
    time: ValueString;
    rule: Rule[];
    traditions: SpellTraditions;
    traits: Traits;
}