import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button'; 
import { PF2SpellsComponent } from './pf2spells/spells.component'
import { AdminComponent } from './admin/admin.component';
import { DndpcgenComponent } from './dndpcgen/dndpcgen.component';
import { PlayersComponent } from './players/players.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {MaterialExampleModule} from '../material.module';
@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PF2SpellsComponent,
    AdminComponent,
    DndpcgenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatIconModule,
    MatSelectModule,
    MaterialExampleModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
