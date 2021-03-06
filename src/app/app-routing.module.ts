import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { PF2SpellsComponent } from './pf2spells/spells.component';
import { DndpcgenModule } from './dndpcgen/dndpcgen.module';

const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'pf2spells', component: PF2SpellsComponent },
  { path: 'dndpcgen', loadChildren: () => import('./dndpcgen/dndpcgen.module').then(m => m.DndpcgenModule) },
  { path: '', redirectTo: '/players', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
