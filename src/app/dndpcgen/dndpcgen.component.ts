import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Class } from '../shared/dnd/class';
import { Race } from './../shared/dnd/race';
import { DndpcgenserviceService } from './dndpcgenservice.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Proficiency } from '../shared/dnd/proficiency';
import { Language } from '../shared/dnd/language';
import { Alignment } from '../shared/dnd/alignment';

@Component({
  selector: 'app-dndpcgen',
  templateUrl: './dndpcgen.component.html',
  styleUrls: ['./dndpcgen.component.css']
})
export class DndpcgenComponent implements OnInit {
  
  races: Race[] = [];
  selectedRace?: Race;

  classes: Class[] = [];
  selectedClass?: Class;

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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  
  constructor(private dndpcgenserviceService: DndpcgenserviceService, private _formBuilder: FormBuilder) { 
    this.firstFormGroup = this._formBuilder.group({
      race: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      class: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      abilities: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
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
    this.fifthFormGroup = this._formBuilder.group({
      equipment: ['', Validators.required]
    });
  }

    ngOnInit(): void {
      this.getRaces();
      this.getClasses();
      this.getSkills();
      this.getArtisanTools();
      this.getOtherTools(); 
      this.getLanguages();
      this.getAlignments();
    }

    onSelect(race: Race): void {
      this.selectedRace = race;
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

    addAbility(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }

}
