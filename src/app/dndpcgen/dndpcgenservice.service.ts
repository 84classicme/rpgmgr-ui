import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { empty, Observable, of } from 'rxjs';
import { Race } from '../shared/dnd/race'
import { Character } from './character';
import { Class } from '../shared/dnd/class';
import { Background } from '../shared/dnd/background';
import { Skill } from '../shared/dnd/skill';
import { Proficiency } from '../shared/dnd/proficiency';
import { Language } from '../shared/dnd/language';
import { Alignment } from '../shared/dnd/alignment';
import { Level } from '../shared/dnd/level';
import { Feature } from '../shared/dnd/feature';

// const EMPTY_CHARACTER: Character = {
//   name: '',
//   race: '',
//   class: '',
//   abilities: '',
//   background: '',
//   description: '',
//   equipment: '',
//   height: '',
//   weight: '',
//   alignment: '',
//   deity: ''
// }

@Injectable({
  providedIn: 'root'
})
export class DndpcgenserviceService {

  private raceurl = 'http://localhost:8080/dnd/races';
  private classurl = 'http://localhost:8080/dnd/classes';
  private backgroundurl = 'http://localhost:8080/dnd/backgrounds';
  private skillurl = 'http://localhost:8080/dnd/skills';
  private proficiencyurl = 'http://localhost:8080/dnd/proficiencies';
  private proficiencyothertoolsurl = 'http://localhost:8080/dnd/proficiencies/othertools';
  private languageurl = 'http://localhost:8080/dnd/languages';
  private alignmenturl = 'http://localhost:8080/dnd/alignments';
  private featureurl = 'http://localhost:8080/dnd/features';
  private abilityurl = 'http://localhost:8080/dnd/ability-scores';
  private equipmenturl = 'http://localhost:8080/dnd/equipment';


  constructor(private http: HttpClient) {}

  getRaces(): Observable<Race[]> {
    return this.http.get<Race[]>(this.raceurl)
  }

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.classurl)
  }

  getBackgrounds(): Observable<Background[]> {
    return this.http.get<Background[]>(this.backgroundurl)
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillurl)
  }             

  getProficiencies(): Observable<Proficiency[]> {
    return this.http.get<Proficiency[]>(this.proficiencyurl)
  }

  getOtherToolProficiencies(): Observable<Proficiency[]> {
    return this.http.get<Proficiency[]>(this.proficiencyothertoolsurl)
  }

  getProficienciesByType(type: string): Observable<Proficiency[]> {
    return this.http.get<Proficiency[]>(`${this.proficiencyurl}?type=${type}`);
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.languageurl)
  }

  getAlignments(): Observable<Alignment[]> {
    return this.http.get<Alignment[]>(this.alignmenturl)
  }

  getLevelsByClass(cclass: string): Observable<Level[]> {
    return this.http.get<Level[]>(`${this.classurl}/${cclass}/levels`);
  }

  getFeatureDescription(index: string): Observable<Feature> {
    return this.http.get<Feature>(`${this.featureurl}/${index}`);
  }

  getAbilityDescription(index: string): Observable<Feature> {
    return this.http.get<Feature>(`${this.abilityurl}/${index}`);
  }

  getSkillDescription(index: string): Observable<Feature> {
    return this.http.get<Feature>(`${this.skillurl}/${index}`);
  }

  getEquipmentDescription(index: string): Observable<Feature> {
    return this.http.get<Feature>(`${this.equipmenturl}/${index}`);
  }
}
