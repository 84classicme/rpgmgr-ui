import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Feature } from '../dnd/feature';


@Component({
  selector: 'app-feature-modal',
  templateUrl: './feature-modal.component.html',
  styleUrls: ['./feature-modal.component.css']
})
export class FeatureModalComponent implements OnInit {

 constructor(
    public dialogRef: MatDialogRef<FeatureModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feature) { }

  ngOnInit(): void {
  }

}
