import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button'; 
import { PF2SpellsComponent } from './pf2spells/spells.component'
import { AdminComponent } from './admin/admin.component';
import { PlayersComponent } from './players/players.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialExampleModule} from '../material.module';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PF2SpellsComponent,
    AdminComponent,
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
    MaterialExampleModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
