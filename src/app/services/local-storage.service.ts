import {Injectable} from '@angular/core';
import {StoreService} from './store.service';
import {Observable} from 'rxjs';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {

  }

  saveToLocalStorage(categories: Category[]) {

    // if (localStorage.getItem('categories') !== null) {
    //   localStorage.clear();
    //   localStorage.setItem('categories', JSON.stringify(categories));
    // } else {
    //   // localStorage.clear();
    //   localStorage.setItem('categories', JSON.stringify(categories));
    // }
  }
}
