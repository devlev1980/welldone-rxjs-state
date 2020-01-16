import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Category} from '../models/category';
import {shareReplay} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';


@Injectable({
  providedIn: 'root'
})


export class StoreService {
  private readonly _categories = new BehaviorSubject<Category[]>([]);
  readonly categories$ = this._categories.asObservable().pipe(shareReplay(1));
  list = [];

  constructor(private lsService: LocalStorageService) {


  }

  get categories(): Category[] {
    return this._categories.getValue();
  }

  set categories(value) {
    this._categories.next(value);
  }

  addCategory(category: Category) {
    this.categories.push(category);


    this.list = JSON.parse(localStorage.getItem('categories'));
    if (this.list.length > 0) {
      this.list.push(category);
      localStorage.setItem('categories', JSON.stringify(this.list));

    } else {
      localStorage.setItem('categories', JSON.stringify(this.categories));
    }


  }

  saveToLS(category) {

  }

  updateCategory(category: Category, index) {
    const categoryIndexToUpdate = this.categories.findIndex((item) => this.categories.indexOf(item) === index);
    // this.list = JSON.parse(localStorage.getItem('categories'));
    const categoryLSIndexToUpdate = this.list.findIndex((el: Category) => this.list.indexOf(el) === index);
    if (categoryIndexToUpdate === -1) {
      this.categories.push(category);
    } else {
      this.categories[categoryIndexToUpdate] = category;

    }
    if (categoryLSIndexToUpdate === -1) {
      this.list.push(category);
      localStorage.setItem('categories', JSON.stringify(this.list));
    } else {
      this.list[categoryLSIndexToUpdate] = category;
      localStorage.setItem('categories', JSON.stringify(this.list));

    }

  }

  removeCategory(id: number) {
    this.categories.splice(id, 1);
    this.list.splice(id,1);
    localStorage.setItem('categories', JSON.stringify(this.list));


  }


}

