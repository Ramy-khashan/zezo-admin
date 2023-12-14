import { Component, OnInit } from '@angular/core';
import {
  Category,
  CategoryService,
} from 'src/app/shared/services/category.service';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EditCategoryComponent } from './component/edit-category/edit-category.component';
import { AddCategoryComponent } from './component/add-category/add-category.component';
import { DeleteModalComponent } from 'src/app/shared/component/delete-modal/delete-modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  isLoaingCategory: boolean = false;
  categories: Category[] = [];
   

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getCategory();
  }
  getCategory() {
    this.isLoaingCategory = true;
    new FirebaseTSFirestore().getCollection({
      path: ['category'],
      where: [],
      onComplete: (result) => {
        result.docs.forEach((docs) => {
          let category = <Category>docs.data();
          this.categories.push(category);
        });
    this.isLoaingCategory = false;

      },
      onFail: (result) => {
        this.router.navigate(['/notFound']);
      },
    });
  }
  openAddCategory() {
    const modalRef = this.modalService.open(AddCategoryComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,

      centered: true,
      size: 'lg',
    });
  }
  updateCategory(category: Category) {
    const modalRef = this.modalService.open(EditCategoryComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,

      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.category = category;
  }
  openDeleteProduct(category_id: string) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.title = 'Category';
    modalRef.componentInstance.deleteItem = () => {
      this.deleteCategory(category_id);
    };
  }
  deleteCategory(category_id: string) {
    new FirebaseTSFirestore().delete({
      path: ['category', category_id],
      onComplete: () => {
        window.location.reload();
      },
    });
  }
}
