import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndpcgenRoutingModule } from './dndpcgen-routing.module';
import { DndpcgenComponent } from './dndpcgen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MaterialExampleModule } from '../../material.module';
import { StripSkillPipe } from './strip-skill.pipe';
import { FeatureModalComponent } from '../shared/feature-modal/feature-modal.component';
import { StepRaceSelectionComponent } from './step-race-selection/step-race-selection.component';


@NgModule({
  declarations: [
    DndpcgenComponent,
    StripSkillPipe,
    FeatureModalComponent,
    StepRaceSelectionComponent
  ],
  imports: [
    CommonModule,
    DndpcgenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatIconModule,
    MatSelectModule,
    MaterialExampleModule,
  ],
  providers: []
})
export class DndpcgenModule { }