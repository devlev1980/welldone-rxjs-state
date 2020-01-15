import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Category} from '../models/category';
import {shareReplay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class StoreService {
  private readonly _categories = new BehaviorSubject<Category[]>([]);
  readonly categories$ = this._categories.asObservable().pipe(shareReplay(1));

  constructor() {


  }

  get categories(): Category[] {
    return this._categories.getValue();
  }

  set categories(value) {
    this._categories.next(value);
  }

  addCategory(category: Category) {
    this.categories.push(category);
  }

  updateCategory(category: Category, index) {
    const categoryIndexToUpdate = this.categories.findIndex((item) => this.categories.indexOf(item) === index);
    if (categoryIndexToUpdate === -1) {
      this.categories.push(category);
    } else {
      this.categories[categoryIndexToUpdate] = category;
    }

  }

  removeCategory(id: number) {
    this.categories.splice(id, 1);
  }


}

