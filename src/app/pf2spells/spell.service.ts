import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Spell } from './spell'

@Injectable({
  providedIn: 'root'
})
export class SpellService {

  private url = 'http://localhost:8080/pf2e/spells';
  private detailurl = 'http://localhost:8080/pf2e/spells/${id}';
  private traditionurl = 'http://localhost:8080/pf2e/spells/tradition/${tradition}';
  private namesearchurl = 'http://localhost:8080/pf2e/spells?name=${name}';

  constructor(private http: HttpClient) { }
    
  /** GET players from the server */
  getSpells(): Observable<Spell[]> {
    return this.http.get<Spell[]>(this.url)
  }

  getSpell(id: string): Observable<Spell> {
    return this.http.get<Spell>(this.detailurl)
  }

  getSpellByTradition(tradition: string): Observable<Spell[]> {
    return this.http.get<Spell[]>(this.traditionurl)
  }

  searchSpellsByName(name: string): Observable<Spell[]> {
    return this.http.get<Spell[]>(this.namesearchurl)
  }
}
