import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Category} from '../../models/category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CategoryDetailsComponent>) {
  }

  ngOnInit() {

  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
