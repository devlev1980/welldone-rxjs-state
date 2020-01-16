import {Injectable} from '@angular/core';
import {StoreService} from './store.service';
import {Observable} from 'rxjs';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  categoryListFromLS: Category[];

  constructor() {

    this.categoryListFromLS = JSON.parse(localStorage.getItem('categories'));
  }

  addToLocalStorage(category: Category) {

    this.categoryListFromLS.push(category);
    localStorage.setItem('categories', JSON.stringify(this.categoryListFromLS));


  }

  updateLocalStorage(category: Category, id) {
    const categoryLSIndexToUpdate = this.categoryListFromLS.findIndex((el: Category) => this.categoryListFromLS.indexOf(el) === id);
    if (categoryLSIndexToUpdate === -1) {
      this.categoryListFromLS.push(category);
      localStorage.setItem('categories', JSON.stringify(this.categoryListFromLS));
    } else {
      this.categoryListFromLS[categoryLSIndexToUpdate] = category;
      localStorage.setItem('categories', JSON.stringify(this.categoryListFromLS));

    }
  }

  deleteFromLocalStorage(id) {
    this.categoryListFromLS.splice(id, 1);
    localStorage.setItem('categories', JSON.stringify(this.categoryListFromLS));
  }
}
