import { SpellData } from './spelldata'

export interface Spell {
    id: string;
    name: string;
    type: string;
    effects: object[];
    data: SpellData;
}