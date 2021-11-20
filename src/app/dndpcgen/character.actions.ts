import {Action} from '@ngrx/store';
import { Class } from '../shared/dnd/class';

export enum CharacterActionTypes {
    CharacterAdd = '[Character Component] Add',
    CharacterUpdateRace = '[Character Component] Update Race',
    CharacterUpdateClass = '[Character Component] Update Class',
    CharacterUpdateAbilities = '[Character Component] Update Abilities',
    CharacterUpdateDescription = '[Character Component] Update Description',
    CharacterUpdateEquipment = '[Character Component] Update Equipment',
    CharacterError = '[Character Component] Error'
}

export class ActionEx implements Action {
    readonly type: any;
    payload: any;
}

export class CharacterAdd implements ActionEx {
    readonly type = CharacterActionTypes.CharacterAdd;
    constructor(public payload: any) {
    }
}
export class CharacterUpdateRace implements ActionEx {
    readonly type = CharacterActionTypes.CharacterUpdateRace;
    constructor(public payload: any) {
    }
}

export class CharacterUpdateClass implements ActionEx {
    readonly type = CharacterActionTypes.CharacterUpdateClass;
    constructor(public payload: Class) {}
}

export class CharacterUpdateAbilities implements ActionEx {
    readonly type = CharacterActionTypes.CharacterUpdateAbilities;
    constructor(public payload: any) {
    }
}

export class CharacterUpdateDescription implements ActionEx {
    readonly type = CharacterActionTypes.CharacterUpdateDescription;
    constructor(public payload: any) {
    }
}

export class CharacterUpdateEquipment implements ActionEx {
    readonly type = CharacterActionTypes.CharacterUpdateEquipment;
    constructor(public payload: any) {
    }
}

export type CharacterActions =
    | CharacterAdd
    | CharacterUpdateRace
    | CharacterUpdateClass
    | CharacterUpdateAbilities
    | CharacterUpdateDescription
    | CharacterUpdateEquipment;  
