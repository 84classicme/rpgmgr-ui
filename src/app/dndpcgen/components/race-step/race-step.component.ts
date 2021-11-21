import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValueTrinity } from 'src/app/shared/dnd/valuetrinity';
import { AbilityBonus } from 'src/app/shared/dnd/abilitybonus';
import { OptionsTrinity } from 'src/app/shared/dnd/optiontrinity';
import { Race } from 'src/app/shared/dnd/race';
import { DndpcgenserviceService } from '../../dndpcgenservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Character } from './../../character';

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

@Component({
  selector: 'app-race-step',
  templateUrl: './race-step.component.html',
  styleUrls: ['./race-step.component.css']
})
export class RaceStepComponent implements OnInit {

  @Input()
  character?: Character;

  @Output()
  selectedRace= new EventEmitter<Race>();

  races: Race[] = [];
  raceFG: FormGroup;

  constructor(private dndpcgenserviceService: DndpcgenserviceService, private _formBuilder: FormBuilder) {
    this.raceFG = this._formBuilder.group({
      race: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.getRaces();
  }

  getRaces(): void {
    this.dndpcgenserviceService.getRaces()
        .subscribe(races => this.races = races);
  }

  saveSelection(): void {
    if(this.raceFG.touched && this.raceFG.value.race){
      let selected = this.races.filter(race => race.name === this.raceFG.value.race);
      if(selected.length === 1) {
        let myrace: Race = selected[0];
        this.selectedRace.emit(myrace);
      } 
    }
  }

}
