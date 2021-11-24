import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { Class } from '../shared/dnd/class';
import { Race } from './../shared/dnd/race';
import { DndpcgenserviceService } from './dndpcgenservice.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Proficiency } from '../shared/dnd/proficiency';
import { Language } from '../shared/dnd/language';
import { Alignment } from '../shared/dnd/alignment';
import { Character } from './character';
import { OptionsTrinity } from '../shared/dnd/optiontrinity';
import { ValueTrinity } from '../shared/dnd/valuetrinity';
import { AbilityBonus } from '../shared/dnd/abilitybonus';
import { Level, LevelSpellcasting } from '../shared/dnd/level';
import { Feature } from '../shared/dnd/feature';
import { MatDialog } from '@angular/material/dialog';
import { FeatureModalComponent } from '../shared/feature-modal/feature-modal.component';

const EMPTY_CLASS: Class = {
  index: '',
  name: '',
  hit_die: 0,
  levels: [],
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

const initialState: Character = {
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


@Component({
  selector: 'app-dndpcgen',
  templateUrl: './dndpcgen.component.html',
  styleUrls: ['./dndpcgen.component.css']
})
export class DndpcgenComponent implements OnInit {

  character: Character;
 
  races: Race[] = [];
  selectedRace?: Race;
  classes: Class[] = [];
  selectedClass: Class = EMPTY_CLASS;
  feature?: Feature;
  levels: Level[] = [];
  skills: Proficiency[] = []; //TYPE: "Skills"
  tools: Proficiency[] = []; //TYPE: "Artisan's Tools"
  others: Proficiency[] = []; //TYPE: "Other"
  languages: Language[] = [];
  alignments: Alignment[] = [];
  abilities: string[] = ["15","14","13","12","10","8"];
  str: string[] = [];
  dex: string[] = [];
  con: string[] = [];
  int: string[] = [];
  wis: string[] = [];
  cha: string[] = [];

  isLinear = true;
  raceFG: FormGroup;
  classFG: FormGroup;
  abilitiesFG: FormGroup;
  descriptionFG: FormGroup;
  equipmentFG = new FormGroup({
    eqOptions: new FormArray([])
  });
  confirmationFG: FormGroup;

  get eqOptions(): FormArray { 
    return this.equipmentFG.get('eqOptions') as FormArray; 
 }
  
  constructor(
    private dndpcgenserviceService: DndpcgenserviceService, 
    private _formBuilder: FormBuilder,
    public dialog: MatDialog) { 

    this.character = initialState;
    this.raceFG = this._formBuilder.group({
      race: ['', Validators.required]
    });
    this.classFG = this._formBuilder.group({
      class: ['', Validators.required]
    });
    this.abilitiesFG = this._formBuilder.group({
      str: ['', Validators.required],
      dex: ['', Validators.required],
      con: ['', Validators.required],
      int: ['', Validators.required],
      wis: ['', Validators.required],
      cha: ['', Validators.required],
    });
    this.descriptionFG = this._formBuilder.group({
      height: [''],
      weight: [''],
      hair: [''],
      eyes: [''],
      deity: [''],
      alignment: ['', Validators.required],
      skill1: ['', Validators.required],
      skill2: ['', Validators.required],
      artisantools: [''],
      othertools: [''],
      languages: ['']
    });
    this.confirmationFG = this._formBuilder.group({});
  }

    ngOnInit(): void {
      this.eqOptions.clear();
      this.getRaces();
      this.getClasses();
      this.getSkills();
      this.getArtisanTools();
      this.getOtherTools(); 
      this.getLanguages();
      this.getAlignments();
    }

    saveRace(): void {
      if(this.selectedRace){
        this.character.race = this.selectedRace;
      }
    }

    getLevels(myclass: any){
      console.log("Getting levels....");
      this.getLevelsForClass(myclass.value.name);
    }

    saveClass() {
      if(this.selectedClass){
        this.character.class = this.selectedClass;
        let index = 1;
        this.eqOptions.clear();
        this.selectedClass.starting_equipment_options.forEach(option => {
          this.eqOptions.push(new FormControl(index.toString())); 
          index++;
        })
      } 
    }

    saveAbilities(){
      this.character.str = this.str[0];
      this.character.dex = this.dex[0];
      this.character.con = this.con[0];
      this.character.int = this.int[0];
      this.character.wis = this.wis[0];
      this.character.cha = this.cha[0];
    }

    addAbility(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else if (event.container.id !== 'array' && event.previousContainer.id !== 'array' && 
          event.container.data.length > 0){
        transferArrayItem(event.previousContainer.data, event.container.data, 
          event.previousIndex, event.currentIndex );
        transferArrayItem(event.container.data, event.previousContainer.data, 
          event.currentIndex, event.previousIndex );
        this.updateAbilityScores(event);
      } else {
        transferArrayItem(event.previousContainer.data, event.container.data, 
          event.previousIndex, event.currentIndex );
        this.updateAbilityScores(event);
      }
    }

    updateAbilityScores(event: CdkDragDrop<string[]>){
      this.updateAbilityScore(event.container.id, event.container.data)
      this.updateAbilityScore(event.previousContainer.id, event.previousContainer.data)
    }

    updateAbilityScore(id: string, data: any){
      this.abilitiesFG.get(id)?.setValue(data.length > 0 ? data[0] : '');
    }

    saveDescription(){
      console.log("Saving description....");
      this.character.height = this.descriptionFG.get("height")?.value;
      this.character.weight = this.descriptionFG.get("weight")?.value;
      this.character.hair = this.descriptionFG.get("hair")?.value;
      this.character.eyes = this.descriptionFG.get("eyes")?.value;
      this.character.deity = this.descriptionFG.get("deity")?.value;
      this.character.alignment = this.descriptionFG.get("alignment")?.value;
      this.character.skill1 = this.descriptionFG.get("skill1")?.value;
      this.character.skill2 = this.descriptionFG.get("skill2")?.value;

      this.character.proficiencies = [];
      this.character.languages = [];
      this.descriptionFG.value.artisantools.forEach((artisantool: string)  => {
        this.character.proficiencies.push(artisantool); 
      });
      this.descriptionFG.value.othertools.forEach((othertool: string) => {
        this.character.proficiencies.push(othertool); 
      });
      this.descriptionFG.value.languages.forEach((language: string) => {
        this.character.languages.push(language); 
      });
    }

    saveEquipment(){
      console.log("Saving eq....");
      if(this.equipmentFG.touched){
        for(let i = 0; i < this.eqOptions.length; i++) {
          this.character.equipment.push(this.eqOptions.at(i).value); 
          }
      }
      this.character.class.starting_equipment.forEach(eq => {
        this.character.equipment.push(eq.equipment.name);
      })
    }

    getRaces(): void {
      this.dndpcgenserviceService.getRaces()
          .subscribe(races => this.races = races);
    }

    getClasses(): void {
      this.dndpcgenserviceService.getClasses()
          .subscribe(classes => this.classes = classes);
    }

    getSkills(): void {
      this.dndpcgenserviceService.getProficienciesByType("Skills")
          .subscribe(skills => this.skills = skills);
    }

    getArtisanTools(): void {
      this.dndpcgenserviceService.getProficienciesByType("Artisan's Tools")
          .subscribe(tools => this.tools = tools);
    }

    getOtherTools(): void {
      this.dndpcgenserviceService.getProficienciesByType("Other")
          .subscribe(others => this.others = others);
    }

    getLanguages(): void {
      this.dndpcgenserviceService.getLanguages()
          .subscribe(languages => this.languages = languages);
    }

    getAlignments(): void {
      this.dndpcgenserviceService.getAlignments()
          .subscribe(alignments => this.alignments = alignments);
    }

    getLevelsForClass(cclass: string): void {
      this.dndpcgenserviceService.getLevelsByClass(cclass)
          .subscribe(levels => {
            this.levels = [];
            this.levels = levels;
            this.selectedClass.levels = levels;
          });
    }

    getFeatureDetails(index: any): void{
      console.log('Getting feature for ' + index + '...')
      this.dndpcgenserviceService.getFeatureDescription(index)
      .subscribe(feature => { 
        this.feature = feature;
        const dialogRef = this.dialog.open(FeatureModalComponent, {
          width: '400px',
          data: this.feature
        });
      });
    }

    getAbilityDetails(index: any): void{
      console.log('Getting feature for ' + index + '...')
      this.dndpcgenserviceService.getAbilityDescription(index)
      .subscribe(feature => { 
        this.feature = feature;
        const dialogRef = this.dialog.open(FeatureModalComponent, {
          width: '400px',
          data: this.feature
        });
      });
    }
}
