import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';

import {
  Category,
  CategoryService,
} from 'src/app/shared/services/category.service';
import { UploadImageService } from 'src/app/shared/services/upload-image.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  categories: Category[] = [];
  productImages: any[] = [];
  productImagesUrl: string[] = [];
  canAddProduct: boolean = false;
  isloadingAdd: boolean = false;
  isloadingUploadImg: boolean = false;

  productImagesFile: any[] = [];
  file: any = '';
  imageFile: any ;
  storage: FirebaseTSStorage = new FirebaseTSStorage();

  form?: FormGroup;
  firestore: FirebaseTSFirestore = new FirebaseTSFirestore();
  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private uploadImageService: UploadImageService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnDestroy(): void {
    // this.subscribe.unsubscribe();
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      is_on_sale: [false, Validators.required],
      important: [false, Validators.required],
      on_sale_price: ['', Validators.required],
    });
    this.getCategories();
  }
  getCategories() {
    this.categories = this.categoryService.getCategory();
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  getImage(event: any) {
    this.imageFile = event.target.files[0];
    this.file = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(this.imageFile)
    );
  }
  getProductImages(event: any) {
    for (let file of event.target.files) {
      this.productImagesFile.push(file);
      this.productImages.push(
        this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
      );
    }
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
  uploadProductImage() {
    for (let file of this.productImagesFile) {
     this. isloadingUploadImg=true
      this.storage.upload({
        uploadName: file.name,
        path: ['userImages', file.name],
        data: { data: file },
        onComplete: (downloadUrl) => {
          this.productImagesUrl.push(downloadUrl);
          this.canAddProduct = true;
          this.isloadingUploadImg = false;
        },
      });
    }
  }
  addProduct() {
     let prouctId = this.firestore.genDocId();
    if (this.imageFile === null) {
      return;
    }
    this.isloadingAdd=true;
    this.storage.upload({
      uploadName: this.imageFile.name,
      path: ['userImages', prouctId],
      data: { data: this.imageFile },
      onComplete: (downloadUrl) => {
        this.firestore.create({
          path: ['product', prouctId],
          data: {
            title: this.form!.value.title,
            description: this.form!.value.description,
            price: String(this.form!.value.price),
            is_on_sale:Boolean(this.form!.value.is_on_sale),
            on_sale_price: String(this.form!.value.on_sale_price),
            main_image: downloadUrl,
            important: Boolean(this.form!.value.important),
            category: this.form!.value.category,
            product_image: this.productImagesUrl,
            product_id: prouctId,
          },
          onComplete: (result) => {
            this.isloadingAdd=false;

            this.modalService.dismissAll();
            window.location.reload();
          },
        });
      },
    });

    // console.log(this.form!.value);
    // console.log(mainImageUrl);
    // console.log(productImagesUrl);
  }
  deleteImage(index: number) {
    console.log(index);
    this.productImages.splice(index, 1);
  }
 
}
