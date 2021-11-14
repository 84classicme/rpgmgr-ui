import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { PF2SpellsComponent } from './pf2spells/spells.component';

const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'spells', component: PF2SpellsComponent },
  { path: '', redirectTo: '/players', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
