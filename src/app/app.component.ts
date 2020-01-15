import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Action} from 'rxjs/internal/scheduler/Action';
import {StoreService} from './services/store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from './models/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  addCategoryForm: FormGroup;
  private categoryList: Observable<Category[]>;
  private categoryName: string = '';
  private categoryIndex: number;
  private selectedCategory: Category;
  isUpdate: boolean = false;
  button_name: string = 'Add Category';

  constructor(private fb: FormBuilder, private store: StoreService) {
    this.categoryList = this.store.categories$;

  }

  ngOnInit(): void {
    this.initializeForm();
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
  }

  addCategory(form: Category, button_name: string) {
    switch (button_name) {
      case 'Add Category':
        this.store.addCategory(form);
        this.addCategoryForm.reset();
        break;
      case 'Update Category':
        this.store.updateCategory(form,this.categoryIndex);
        break;
    }

    this.initializeForm();

  }


  onSelectCategory(category: Category, index: number) {
    this.selectedCategory = category;
    // this.categoryName = category.name;
    this.categoryIndex = index;
  }

  onRemoveCategory() {
    this.store.removeCategory(this.categoryIndex);

  }

  onUpdateCategory(category: Category,index) {
    this.isUpdate = true;
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
    this.isUpdate = false;
    // this.store.updateCategory(category);
  }
}
