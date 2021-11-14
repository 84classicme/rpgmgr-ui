import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Spell } from './spell'
import { SpellService } from './spell.service';
import {FilterService} from 'primeng/api';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class PF2SpellsComponent implements OnInit {

  spells: Spell[] = [];
  selectedSpell?: Spell;

  constructor(private spellService: SpellService,
    private filterService: FilterService) { }

  ngOnInit(): void {
    this.getSpells();
  }

  onSelect(spell: Spell): void {
    this.selectedSpell = spell;
  }


  getSpells(): void {
    this.spellService.getSpells()
        .subscribe(spells => this.spells = spells);
  }

}
