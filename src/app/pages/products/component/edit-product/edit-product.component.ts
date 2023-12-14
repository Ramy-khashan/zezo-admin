import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import {
  Category,
  CategoryService,
} from 'src/app/shared/services/category.service';
import { Products } from '../../products.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  categories: Category[] = [];
  isloadingUpdate: boolean = false;

  form?: FormGroup;
  firestore: FirebaseTSFirestore = new FirebaseTSFirestore();
  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  @Input() product?: Products;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.product!.title, Validators.required],
      price: [this.product!.price, Validators.required],
      description: [this.product!.description, Validators.required],
      category: [this.product!.category, Validators.required],
      is_on_sale: [ this.product!.is_on_sale , Validators.required],
      important: [ this.product!.important , Validators.required],
      on_sale_price: [this.product!.on_sale_price, Validators.required],
    });
    console.log(this.form!.value)
    this.getCategories();
  }
  getCategories() {
    this.categories = this.categoryService.getCategory();
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  setCategory(event: any) {
    this.form!.get('category')?.setValue(event.target.value);
    console.log(this.form);
  }
  setImportant(event: any) {
    this.form!.get('important')?.setValue(event.target.value);
    console.log(this.form);
  }
  setIsOnSale(event: any) {
    this.form!.get('is_on_sale')?.setValue(event.target.value);
    console.log(this.form);
  }
  editProduct() {
    this.isloadingUpdate=true;
    this.firestore.update({
      path: ['product', String(this.product?.product_id)],
      data: {
        title: this.form!.value.title,
        description: this.form!.value.description,
        price: String(this.form!.value.price),
        is_on_sale: Boolean(this.form!.value.is_on_sale),
        on_sale_price: String(this.form!.value.on_sale_price),
        important:Boolean(this.form!.value.important),
        category: this.form!.value.category,
      },
      onComplete: (result) => {
        this.isloadingUpdate=false;
        console.log(result)
        this.modalService.dismissAll();
        window.location.reload();
      },
    });
  }
}
