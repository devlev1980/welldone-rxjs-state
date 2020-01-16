import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Action} from 'rxjs/internal/scheduler/Action';
import {StoreService} from './services/store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from './models/category';
import {MatDialog} from '@angular/material';
import {CategoryDetailsComponent} from './dialogs/category-details/category-details.component';
import {LocalStorageService} from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  addCategoryForm: FormGroup;
  private categoryList: Observable<Category[]>;
  categoryListFromLS: Category[] = [];
  private categoryIndex: number;
  private selectedCategory: Category;
  isUpdate: boolean = false;
  button_name: string = '';
  private isActive: boolean = false;
  showAddForm: boolean = false;

  constructor(private fb: FormBuilder,
              private store: StoreService,
              private dialog: MatDialog) {

    if (localStorage.getItem('categories') !== null) {
      this.getFromLS();
    } else {
      this.categoryList = this.store.categories$;
    }

  }

  getFromLS() {
    let list = localStorage.getItem('categories');
    this.categoryListFromLS = JSON.parse(list);
  }

  ngOnInit(): void {
    // this.initializeForm();
  }

  initializeForm() {

    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      location: this.fb.group({
        address: ['Tel-Aviv', Validators.required],
        name: ['TA', Validators.required],
        coordinates: this.fb.group({
          longitude: ['24.251', Validators.required],
          latitude: ['25.361', Validators.required]
        }),
        category: ['', Validators.required]
      })
    });
    this.button_name = 'Add Category';

  }

  addCategory(form: Category, button_name: string) {
    switch (button_name) {
      case 'Add Category':
        this.store.addCategory(form);
        this.addCategoryForm.reset();
        this.getFromLS();
        break;
      case 'Update Category':
        this.store.updateCategory(form, this.categoryIndex);
        this.getFromLS();
        break;
    }

    this.initializeForm();


  }


  onSelectCategory(category: Category, index: number) {
    this.selectedCategory = category;
    this.categoryIndex = index;
    this.isActive = true;
  }

  onRemoveCategory() {
    this.store.removeCategory(this.categoryIndex);
    this.getFromLS();

  }

  onUpdateCategory(category: Category, index) {
    this.isUpdate = true;
    this.showAddForm = true;
    this.button_name = 'Update Category';
    this.addCategoryForm = this.fb.group({
      name: [category.name, Validators.required],
      location: this.fb.group({
        address: [category.location.address, Validators.required],
        name: [category.location.name, Validators.required],
        coordinates: this.fb.group({
          longitude: [category.location.coordinates.longitude, Validators.required],
          latitude: [category.location.coordinates.latitude, Validators.required]
        }),
        category: [category.location.category, Validators.required]
      })
    });
    this.getFromLS();
    this.isUpdate = false;
    // this.store.updateCategory(category);
  }

  onViewDetails() {

    const dialogRef = this.dialog.open(CategoryDetailsComponent, {
      width: '800px',
      data: {category: this.selectedCategory}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  onAddCategory() {
    this.showAddForm = true;
    this.initializeForm();
  }

  onEditCategory() {

  }
}
