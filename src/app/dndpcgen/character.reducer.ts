import { Character } from './character'
import {CharacterActions, CharacterActionTypes} from './character.actions';
import { Class } from '../shared/dnd/class';
import { Race } from '../shared/dnd/race';
import { OptionsTrinity } from '../shared/dnd/optiontrinity';
import { ValueTrinity } from '../shared/dnd/valuetrinity';
import { AbilityBonus } from '../shared/dnd/abilitybonus';

const EMPTY_CLASS: Class = {
    index: '',
    name: '',
    hit_die: 0,
    proficiency_choices: [],
    proficiencies: [],
    saving_throws: [],
    starting_equipment: [],
    starting_equipment_options: [],
    class_levels: '',
    multi_classing: {prerequisites: [], proficiencies: []},
    subclasses: [],
    url: ''
}

const EMPTY_OPTIONS_TRINITY: OptionsTrinity = {
    choose:  0,
    type: '',
    from: []
}

const EMPTY_VALUE_TRINITY: ValueTrinity = {
    index:  '',
    name: '',
    url: ''
}

const EMPTY_ABILITY_BONUS : AbilityBonus = {
    "ability_score": EMPTY_VALUE_TRINITY,
    "bonus":0
}

const EMPTY_RACE: Race = {
    index: '',
    name: '',
    speed: 0,
    ability_bonuses: EMPTY_ABILITY_BONUS,
    alignment: '',
    age: '',
    size: '',
    size_description: '',
    starting_proficiencies: [],
    starting_proficiency_options: EMPTY_OPTIONS_TRINITY,
    languages: [],
    language_desc: '',
    traits: [],
    subraces: [],
    url: '',
}

export const initialState: Character = {
  name: '',
  race: EMPTY_RACE,
  class: EMPTY_CLASS,
  str: '',
  dex: '',
  con: '',
  int: '',
  wis: '',
  cha: '',
  background: '',
  description: '',
  equipment: [],
  height: '',
  weight: '',
  alignment: '',
  deity: '',
  hair: '',
  eyes: '',
  skill1: '',
  skill2: '',
  proficiencies: [],
  languages: []
}

export const getEmptyCharacter = initialState;
export const getEmptyClass = EMPTY_CLASS;
export const getClass = (state: Character) => state.class;
export const getRace = (state: Character) => state.race;

export function CharacterReducer(state = initialState, action: CharacterActions) {
  switch (action.type) {
    case CharacterActionTypes.CharacterAdd:
        return action.payload;
    case CharacterActionTypes.CharacterUpdateRace:
        return {
            ...state, 
            race: action.payload.race
        };
    case CharacterActionTypes.CharacterUpdateClass:
        const { payload: myclass } = action;
        return {
            ...state, 
            class: myclass
        };
    case CharacterActionTypes.CharacterUpdateAbilities:
        return {
            ...state, 
            str: action.payload.str,
            dex: action.payload.dex,
            con: action.payload.con,
            int: action.payload.int,
            wis: action.payload.wis,
            cha: action.payload.cha
        };
    case CharacterActionTypes.CharacterUpdateDescription:
        return {
            ...state, 
            height: action.payload.height,
            weight: action.payload.weight,
            alignment: action.payload.alignment,
            deity: action.payload.deity,
            hair: action.payload.hair,
            eyes: action.payload.eyes,
            skill1: action.payload.skill1,
            skill2: action.payload.skill2,
            proficiencies: action.payload.proficiencies,
            languages: action.payload.languages
        };   
    case CharacterActionTypes.CharacterUpdateEquipment:
        return {
            ...state, 
            equipment: action.payload.equipment
        }; 
    default:
        return state;
 }
}