import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DndpcgenComponent } from './dndpcgen.component';


const routes: Routes = [
  {
    path: '',
    component: DndpcgenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DndpcgenRoutingModule { }