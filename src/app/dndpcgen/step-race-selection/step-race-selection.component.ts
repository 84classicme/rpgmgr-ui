import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AbilityBonus } from 'src/app/shared/dnd/abilitybonus';
import { Race } from 'src/app/shared/dnd/race';
import { Subrace } from 'src/app/shared/dnd/subrace';
import { ValueTrinity } from 'src/app/shared/dnd/valuetrinity';
import { EventEmitter } from '@angular/core';
import { Character } from '../dndpcgen.interfaces';
import { DndpcgenserviceService } from '../dndpcgenservice.service';
import { FeatureModalComponent } from '../../shared/feature-modal/feature-modal.component';


const EMPTY_OPTIONS_TRINITY: any = {
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

const EMPTY_SUBRACE: Subrace = {
  index: '',
  name: '',
  ability_bonuses: [],
  starting_proficiencies: [],
  languages: [],
  language_options: EMPTY_OPTIONS_TRINITY,
  racial_traits: [],
  url: '',
}

const EMPTY_RACE: Race = {
  index: '',
  name: '',
  speed: 0,
  ability_bonuses: [],
  ability_bonus_options: EMPTY_OPTIONS_TRINITY,
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
  selector: 'app-step-race-selection',
  templateUrl: './step-race-selection.component.html',
  styleUrls: ['../dndpcgen.component.css']
})
export class StepRaceSelectionComponent{

  races: Race[] = [];
  selectedRace: Race;
  subraces: Subrace[] = [];
  selectedSubrace: Subrace;
  raceFG!: FormGroup;

  constructor(
      private dndpcgenserviceService: DndpcgenserviceService, 
      private _formBuilder: FormBuilder, 
      public dialog: MatDialog) {

    this.selectedRace = EMPTY_RACE;
    this.selectedSubrace = EMPTY_SUBRACE;
  }

  ngOnInit(): void {
    this.raceSkillOptions.clear();
    this.raceAbilityOptions.clear();
    this.getRaces();
    this.raceFG = this._formBuilder.group({
      race: ['', Validators.required],
      subrace: [''],
      subraceLanguage: [''],
      raceSkillOptions: new FormArray([]),
      raceAbilityOptions: new FormArray([]),
    });
  }

  get raceAbilityOptions(): FormArray { 
    return this.raceFG.get('raceAbilityOptions') as FormArray; 
  }

  get raceSkillOptions(): FormArray { 
    return this.raceFG.get('raceSkillOptions') as FormArray; 
  }

  getRaces(): void {
    this.dndpcgenserviceService.getRaces()
        .subscribe(races => this.races = races);
  }

  getSubracesForRace(race: string){
    this.dndpcgenserviceService.getSubracesForRace(race)
        .subscribe(subraces => {
          this.subraces = [];
          this.subraces = subraces;
        });
  }

  getRaceDetails(myrace: any){
    console.log("Getting Race Details....");
    this.selectedSubrace = EMPTY_SUBRACE;
    this.getSubracesForRace(myrace.value.index);
    this.getSkillsForRace();
    this.getAbilityOptionsForRace();
  }

  getSubraceDetails(){
    console.log("Getting SubraceDetails....");
  }

  // saveRace(): void {
  //   if(this.selectedRace){
  //     this.character.race = this.selectedRace;
  //   }
  //   if(this.selectedSubrace){
  //     this.character.subrace = this.selectedSubrace;
  //     if(this.raceFG.value.subraceLanguage){
  //       this.character.subraceLanguage = this.raceFG.value.subraceLanguage;
  //     }
  //   }
  //   this.character.raceSkills = [];
  //   if(this.selectedRace && this.raceFG.value.raceSkillOptions.length){
  //     this.raceFG.value.raceSkillOptions.forEach((option: string) => {
  //         this.character.raceSkills.push(option); 
  //     });
  //   }

  //   this.character.subraceAbilityOptions = [];
  //   if(this.selectedRace && this.raceFG.value.raceAbilityOptions.length > 0){
  //     this.raceFG.value.raceAbilityOptions.forEach((option: any) => {
  //         if (option?.bonus){
  //           this.character.subraceAbilityOptions.push(option);  
  //         }
  //     });
  //   }
  //   this.characterChange.emit(this.character);
  // }

  getSkillsForRace(){
    this.raceSkillOptions.clear(); 
    if(this.selectedRace.starting_proficiency_options){
      for (let i = 0; i < this.selectedRace.starting_proficiency_options.choose; i++) {
          this.raceSkillOptions.push(new FormControl());
        } 
    }
  }

  getAbilityOptionsForRace(){
    this.raceAbilityOptions.clear(); 
    if(this.selectedRace.ability_bonus_options){
      for (let i = 0; i < this.selectedRace.ability_bonus_options.choose; i++) {
          this.raceAbilityOptions.push(new FormControl());
        } 
    }
  }

  getLanguageDetails(index: any): void{
    console.log('Getting feature for ' + index + '...')
    this.dndpcgenserviceService.getLanguageByIndex(index)
    .subscribe(language => { 
      const dialogRef = this.dialog.open(FeatureModalComponent, {
        width: '400px',
        data:  {'name':language.name, 'index': language.index, 'desc':[language.desc]}
      });
    });
  }

  getSkillDetails(index: any): void{
    console.log('Getting details on skill ' + index + '...')
    if (index.substring(0,6) === "skill-") index =  index.substring(6)
    this.dndpcgenserviceService.getSkillDescription(index)
    .subscribe(skill => { 
      const dialogRef = this.dialog.open(FeatureModalComponent, {
        width: '400px',
        data: skill
      });
    });
  }

  getTraitDetails(index: any): void{
    console.log('Getting feature for ' + index + '...')
    this.dndpcgenserviceService.getTraitDescription(index)
    .subscribe(trait => { 
      const dialogRef = this.dialog.open(FeatureModalComponent, {
        width: '400px',
        data: trait
      });
    });
  }

  counter(i: number) {
    return new Array(i);
  }

}
