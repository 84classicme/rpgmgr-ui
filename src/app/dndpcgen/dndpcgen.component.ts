import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Class } from '../shared/dnd/class';
import { Race } from './../shared/dnd/race';
import { DndpcgenserviceService } from './dndpcgenservice.service';
import { Proficiency } from '../shared/dnd/proficiency';
import { Language } from '../shared/dnd/language';
import { Alignment } from '../shared/dnd/alignment';
import { Level } from '../shared/dnd/level';
import { Feature } from '../shared/dnd/feature';
import { FeatureModalComponent } from '../shared/feature-modal/feature-modal.component';
import { Subrace } from '../shared/dnd/subrace';
import { Character } from './dndpcgen.interfaces';
import { OptionsTrinity } from '../shared/dnd/optiontrinity';
import { ValueTrinity } from '../shared/dnd/valuetrinity';
import { AbilityBonus } from '../shared/dnd/abilitybonus';
import { first } from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

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

const EMPTY_CHARACTER: Character = {
name: '',
race: EMPTY_RACE,
subrace: EMPTY_SUBRACE,
class: EMPTY_CLASS,
str: '',
dex: '',
con: '',
int: '',
wis: '',
cha: '',
background: {skills:[], proficiencies:[], feature:''},
description: '',
equipment: [],
height: '',
weight: '',
alignment: '',
deity: '',
hair: '',
eyes: '',
skills: [],
proficiencies: [],
instruments: [],
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
  selectedRace: Race;
  subraces: Subrace[] = [];
  selectedSubrace: Subrace;
  subraceLanguage: string;
  classes: Class[] = [];
  selectedClass: Class;
  feature?: Feature;
  levels: Level[] = [];
  
  skills: Proficiency[] = []; //TYPE: "Skills"
  raceSkills: string[] = []; //TYPE: "Skills"
  classSkills: string[] = []; //TYPE: "Skills"
  tools: Proficiency[] = []; //TYPE: "Artisan's Tools"
  instruments: Proficiency[] = []; //TYPE: "Musical Instruments"
  other_tools: Proficiency[] = []; //TYPE: "Other Tools"
  languages: Language[] = [];
  kits: Proficiency[] = []; //TYPE: "Kits"
  //gaming_sets: Proficiency[] = []; //TYPE: "Gaming Sets"
  vehicles: Proficiency[] = []; //TYPE: "Vehicles"
 
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
  proficiencyFG: FormGroup;
  equipmentFG: FormGroup;
  confirmationFG: FormGroup;

  get raceSkillOptions(): FormArray { 
    return this.raceFG.get('raceSkillOptions') as FormArray; 
  }

  get classSkillOptions(): FormArray { 
    return this.classFG.get('classSkillOptions') as FormArray; 
  }

  get classToolOptions(): FormArray { 
    return this.classFG.get('classToolOptions') as FormArray; 
  }

  get eqOptions(): FormArray { 
    return this.equipmentFG.get('eqOptions') as FormArray; 
  }

  get skillOptions(): FormArray { 
    return this.proficiencyFG.get('skillOptions') as FormArray; 
  }

  get toolOptions(): FormArray { 
    return this.proficiencyFG.get('toolOptions') as FormArray; 
  }

  get instrumentOptions(): FormArray { 
    return this.proficiencyFG.get('instrumentOptions') as FormArray; 
  }

  get allSkills(): string[]{
    return this.raceSkills.concat(this.classSkills).concat(this.character.skills);
  }
  
  constructor(
    private dndpcgenserviceService: DndpcgenserviceService, 
    private _formBuilder: FormBuilder,
    public dialog: MatDialog) { 

    this.character = EMPTY_CHARACTER;
    this.selectedRace = EMPTY_RACE;
    this.subraceLanguage = '';
    this.selectedSubrace = EMPTY_SUBRACE;
    this.selectedClass = EMPTY_CLASS;
   
    this.raceFG = this._formBuilder.group({
      race: ['', Validators.required],
      subrace: [''],
      subraceLanguage: [''],
      raceSkillOptions: new FormArray([]),
    });
    this.classFG = this._formBuilder.group({
      class: ['', Validators.required],
      classSkillOptions: new FormArray([]),
      classToolOptions: new FormArray([]),
    });
    this.abilitiesFG = this._formBuilder.group({
      str: ['', Validators.required],
      dex: ['', Validators.required],
      con: ['', Validators.required],
      int: ['', Validators.required],
      wis: ['', Validators.required],
      cha: ['', Validators.required],
    });
    this.proficiencyFG  = this._formBuilder.group({
      skillOptions: new FormArray([]),
      toolOptions: new FormArray([]),
      instrumentOptions: new FormArray([]),
      skill1: [''],
      skill2: [''],
      artisantools: [''],
      instruments: [''],
      othertools: [''],
      languages: ['']
    });
    this.descriptionFG = this._formBuilder.group({
      name: [''], 
      height: [''],
      weight: [''],
      hair: [''],
      eyes: [''],
      deity: [''],
      alignment: ['']
    });
    this.equipmentFG  = this._formBuilder.group({
      eqOptions: new FormArray([])
    });
    this.confirmationFG = this._formBuilder.group({});
  }

    ngOnInit(): void {
      this.eqOptions.clear();
      this.raceSkillOptions.clear();
      this.classSkillOptions.clear();
      this.classToolOptions.clear();
      this.skillOptions.clear();
      this.toolOptions.clear();
      this.instrumentOptions.clear();
      this.getRaces();
      this.getClasses();
      this.getSkills();
      this.getArtisanTools();
      this.getInstruments();
      this.getOtherTools(); 
      this.getLanguages();
      this.getAlignments();
    }

    getRaceDetails(myrace: any){
      console.log("Getting Race Details....");
      this.selectedSubrace = EMPTY_SUBRACE;
      this.getSubracesForRace(myrace.value.index);
      this.getSkillsForRace();
    }

    getSubraceDetails(){
      console.log("Getting SubraceDetails....");
    }

    saveRace(): void {
      if(this.selectedRace){
        this.character.race = this.selectedRace;
      }
      if(this.selectedSubrace){
        this.character.subrace = this.selectedSubrace;
        if(this.raceFG.value.subraceLanguage){
          this.subraceLanguage = this.raceFG.value.subraceLanguage;
        }
      }
      this.raceSkills = [];
      if(this.selectedRace && this.raceFG.value.raceSkillOptions.length){
        this.raceFG.value.raceSkillOptions.forEach((option: string) => {
            this.raceSkills.push(option); 
        });
      }
    }

    getClassDetails(myclass: any){
      console.log("Getting ClassDetails....");
      this.getLevelsForClass(myclass.value.name);
      this.getSkillsForClass();
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
        this.classSkills = [];
        if(this.classFG.value.classSkillOptions.length){
          this.classFG.value.classSkillOptions.forEach((option: string) => {
            this.classSkills.push(option); 
          });
        }
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

    getAbilityBonusString(ability: string): string{
      const bonus = this.getAbilityBonus(ability); 
      return  bonus > 0 ? "+" + bonus.toString() : "";
    }

    get abStr(): string{
      return this.getAbilityBonusString("str");
    }

    get abDex(): string{
      return this.getAbilityBonusString("dex");
    }

    get abCon(): string{
      var bonus = this.getAbilityBonusString("con");
      return bonus;
    }

    get abInt(): string{
      var bonus = this.getAbilityBonusString("int");
      return bonus;
    }

    get abWis(): string{
      return this.getAbilityBonusString("wis");
    }

    get abCha(): string{
      return this.getAbilityBonusString("cha");
    }

    getAbilityBonus(ability: string): number {
      var race_ability_bonus;
      var race_bonus = 0;
      var subrace_ability_bonus;
      var subrace_bonus = 0;
      if (this.selectedRace.ability_bonuses.length) {
        race_ability_bonus = this.selectedRace.ability_bonuses.find(a => a.ability_score.index === ability);
        race_bonus = race_ability_bonus?.bonus ? race_ability_bonus.bonus : 0;
      }
      if (this.selectedSubrace.ability_bonuses.length) {
        subrace_ability_bonus = this.selectedSubrace.ability_bonuses.find(a => a.ability_score.index === ability)
        subrace_bonus = subrace_ability_bonus?.bonus ? subrace_ability_bonus.bonus : 0;
      }
      return race_bonus + subrace_bonus as number;
    }

    addAbility(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, 
                          event.previousIndex, 
                          event.currentIndex);
      } else if (event.container.id !== 'array' && event.container.data.length === 0) {
          transferArrayItem(event.previousContainer.data, 
                            event.container.data, 
                            event.previousIndex, 
                            event.currentIndex );
          this.updateAbility(event.container.data, 
                            event.currentIndex,
                            event.container.id, 
                            event.previousContainer.id);    
      } else if (event.container.id !== 'array' && event.container.data.length === 1){
          transferArrayItem(event.previousContainer.data, 
                            event.container.data, 
                            event.previousIndex, 
                            event.currentIndex );
          this.updateAbility(event.container.data, 
                            event.currentIndex,
                            event.container.id, 
                            event.previousContainer.id);
          transferArrayItem(event.container.data, 
                            event.previousContainer.data, 
                            event.currentIndex === 0 ? 1 : 0, 
                            event.previousIndex );
          this.updateAbility(event.previousContainer.data, 
                            event.previousIndex,
                            event.previousContainer.id, 
                            event.container.id);
      } else if (event.container.id === 'array') {
          transferArrayItem(event.previousContainer.data, 
                            event.container.data, 
                            event.previousIndex, 
                            event.currentIndex );
          this.updateAbility(event.container.data, 
                            event.currentIndex,
                            event.container.id, 
                            event.previousContainer.id);
          
      }
    }

    updateAbility(data: string[], index: number, id: string, prevId: string){
      const previousBonus:number = this.getAbilityBonus(prevId);
      const containerBonus:number = this.getAbilityBonus(id);
      var abilityscore:number = Number(data[index]);
      abilityscore -= previousBonus;
      abilityscore += containerBonus;

      this.abilitiesFG.get(id)?.setValue(abilityscore ? abilityscore.toString() : "");

      switch(id){
        case "str": {
          this.str[0] = abilityscore.toString();
          break;
        }
        case "dex": {
          this.dex[0] = abilityscore.toString();
          break;
        }
        case "con": {
          this.con[0] = abilityscore.toString();
          break;
        }
        case "int": {
          this.int[0] = abilityscore.toString();
          break;
        }
        case "wis": {
          this.wis[0] = abilityscore.toString();
          break;
        }
        case "cha": {
          this.cha[0] = abilityscore.toString();
          break;
        }
        case "array": {
          data[index] = abilityscore.toString();
          switch(prevId){
            case "str": {
              this.str = [];
              break;
            }
            case "dex": {
              this.dex = [];
              break;
            }
            case "con": {
              this.con = [];
              break;
            }
            case "int": {
              this.int = [];
              break;
            }
            case "wis": {
              this.wis = [];
              break;
            }
            case "cha": {
              this.cha = [];
              break;
            }
          }
           break;
        }
      }
    }

    counter(i: number) {
      return new Array(i);
    }

    saveProficiencies(){
      console.log("Saving proficiencies....");

      this.character.skills = [];
      if(this.skillOptions.length > 0){
        for(let i = 0; i < this.skillOptions.length; i++) {
          this.character.skills.push(this.skillOptions.at(i).value); 
        }
      }
      if(this.proficiencyFG.value.skill1){
        this.character.skills.push(this.proficiencyFG.value.skill1);
      }
      if(this.proficiencyFG.value.skill2){
        this.character.skills.push(this.proficiencyFG.value.skill2);
      }

      this.character.proficiencies = [];
      if(this.toolOptions.length > 0){
        for(let i = 0; i < this.toolOptions.length; i++) {
          this.character.proficiencies.push(this.toolOptions.at(i).value); 
        }
      }
      if(this.proficiencyFG.value.artisantools){
        this.proficiencyFG.value.artisantools.forEach((artisantool: string)  => {
          this.character.proficiencies.push(artisantool); 
        });
      }
      if(this.proficiencyFG.value.othertools){
        this.proficiencyFG.value.othertools.forEach((othertool: string) => {
          this.character.proficiencies.push(othertool); 
        });
      }

      this.character.instruments = [];
      if(this.proficiencyFG.value.instruments){
        this.proficiencyFG.value.instruments.forEach((instrument: string) => {
          this.character.proficiencies.push(instrument); 
        });
      }

      this.character.languages = [];
      if(this.proficiencyFG.value.languages) {
        this.selectedRace?.languages.forEach(language => {
          this.character.languages.push(language.name); 
        })
        this.proficiencyFG.value.languages.forEach((language: string) => {
          this.character.languages.push(language); 
        });
      }
    }

    saveDescription(){
      console.log("Saving description....");
      this.character.name = this.descriptionFG.get("name")?.value;
      this.character.height = this.descriptionFG.get("height")?.value;
      this.character.weight = this.descriptionFG.get("weight")?.value;
      this.character.hair = this.descriptionFG.get("hair")?.value;
      this.character.eyes = this.descriptionFG.get("eyes")?.value;
      this.character.deity = this.descriptionFG.get("deity")?.value;
      this.character.alignment = this.descriptionFG.get("alignment")?.value;
    }

    saveEquipment(){
      console.log("Saving eq....");
      this.character.equipment = [];
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
      this.dndpcgenserviceService.getOtherToolProficiencies()
          .subscribe(others => this.other_tools = others);
    }

    getInstruments(): void {
      this.dndpcgenserviceService.getProficienciesByType("Musical Instruments")
          .subscribe(instruments => this.instruments = instruments);
    }

    getVehicles(): void {
      this.dndpcgenserviceService.getProficienciesByType("Vehicles")
          .subscribe(vehicles => {
            this.vehicles = vehicles;
          });
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
      console.log("Getting levels....");
      this.dndpcgenserviceService.getLevelsByClass(cclass)
          .subscribe(levels => {
            this.levels = [];
            this.levels = levels;
            this.selectedClass.levels = levels;
          });
    }

    getSubracesForRace(race: string){
      this.dndpcgenserviceService.getSubracesForRace(race)
          .subscribe(subraces => {
            this.subraces = [];
            this.subraces = subraces;
          });
    }

    getSkillsForRace(){
      this.raceSkillOptions.clear(); 
      if(this.selectedRace.starting_proficiency_options){
        for (let i = 0; i < this.selectedRace.starting_proficiency_options.choose; i++) {
            this.raceSkillOptions.push(new FormControl());
          } 
      }
    }

    getSkillsForClass(){
      this.classSkillOptions.clear();
      this.selectedClass.proficiency_choices.filter(c => c.type === 'skill').forEach(choice => {
        for (let i = 0; i < choice.choose; i++) {
            this.classSkillOptions.push(new FormControl());
          }           
      })

      this.classToolOptions.clear();
      this.selectedClass.proficiency_choices.filter(c => c.type === 'tool' || c.type === 'instrument').forEach(choice => {
        for (let i = 0; i < choice.choose; i++) {
          this.classToolOptions.insert(i,new FormControl(choice.type + i.toString()));          
        }          
      })
    }

    getFeatureDetails(index: any): void{
      console.log('Getting feature for ' + index + '...')
      this.dndpcgenserviceService.getFeatureDescription(index)
      .subscribe(feature => { 
        const dialogRef = this.dialog.open(FeatureModalComponent, {
          width: '400px',
          data: feature
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

    getAbilityDetails(index: any): void{
      console.log('Getting details on ability score ' + index + '...')
      this.dndpcgenserviceService.getAbilityDescription(index)
      .subscribe(ability => { 
        const dialogRef = this.dialog.open(FeatureModalComponent, {
          width: '400px',
          data: ability
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
}
