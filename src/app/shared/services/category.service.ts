import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: Category[] = [];
  constructor(private router: Router) {}
  firebase: FirebaseTSFirestore = new FirebaseTSFirestore();

  getCategory() {
    this.categories = [];

    this.firebase.getCollection({
      path: ['category'],
      where: [],
      onComplete: (result) => {
        result.docs.forEach((docs) => {
          let category = <Category>docs.data();
          this.categories.push(category);
        });
      },
      onFail: (result) => {
        this.router.navigate(['/notFound']);
      },
    });
    return this.categories;
  }
}
export interface Category {
  category_image: string;
  title: string;
  category_id: string;
}
