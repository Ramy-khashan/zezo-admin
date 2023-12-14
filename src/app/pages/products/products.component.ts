import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import {
  Category,
  CategoryService,
} from 'src/app/shared/services/category.service';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ViewProductImagesComponent } from './component/view-product-images/view-product-images.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { DeleteModalComponent } from 'src/app/shared/component/delete-modal/delete-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];
  cactegories: Category[] = [];
  isLoaingProuct: boolean = false;
  totalRecords: number=0;
  itemsPerPage: number=5;
  page: number =1; 
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getProduct();
  }
  firebase = new FirebaseTSFirestore();
  getProduct() {
    this.isLoaingProuct = true;
    this.firebase.getCollection({
      path: ['product'],
      where: [],
      onComplete: (result) => {
        result.docs.forEach((docs) => {
          let product = <Products>docs.data();
          this.products.push(product);
        });
        this.cactegories = this.categoryService.getCategory();
        this.isLoaingProuct = false;
        this.totalRecords=this.products.length;
      },
      onFail: () => {
        this.isLoaingProuct = false;

        this.router.navigate(['/notFound']);
      },
    });
  }
  getCategoryTitle(categoryId: string) {
    let categoryTitle: string = '';
    if (categoryId !== '') {
      categoryTitle = this.cactegories.find((element) => {
        return element.category_id === categoryId;
      })!.title;
    }
    return categoryTitle;
  }
  openAddProduct() {
    const modalRef = this.modalService.open(AddProductComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,

      centered: true,
      size: 'xl',
    });
  }
  openDeleteProduct(productId: string) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.title = 'Product';
    modalRef.componentInstance.deleteItem = () => {
    this.  deleteProduct(productId)
    };
  }
  deleteProduct(productId: string) {
    this.firebase.delete({
      path: ['product', productId],
      onComplete: () => {
        window.location.reload();
      },
    });
  }
  getProducImages(productImage: string[]) {
    const modalRef = this.modalService.open(ViewProductImagesComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,

      centered: true,
      size: 'xl',
    });
    modalRef.componentInstance.productImages = productImage;
  }
  updateProduct(product: Products) {
    const modalRef = this.modalService.open(EditProductComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,

      centered: true,
      size: 'xl',
    });
    modalRef.componentInstance.product = product;
  }
}
export interface Products {
  product_id: string;
  title: string;
  description: string;
  category: string;
  important: boolean;
  is_on_sale: boolean;
  main_image: string;
  price: string;
  on_sale_price: string;
  product_image: string[];
}
