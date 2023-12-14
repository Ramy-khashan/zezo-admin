import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { Category } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent {
  canAddProduct: boolean = false;
  isloadingAdd: boolean = false;
  isloadingUploadImg: boolean = false;

  file: any = '';
  imageFile: any;
  storage: FirebaseTSStorage = new FirebaseTSStorage();
  @Input() category?: Category;

  form?: FormGroup;
  firestore: FirebaseTSFirestore = new FirebaseTSFirestore();
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}
  ngOnDestroy(): void {
    // this.subscribe.unsubscribe();
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.category!.title, Validators.required],
    });
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
  updateCategory() {
    if (this.imageFile === null) {
      return;
    }
    this.isloadingAdd = true;

    this.storage.upload({
      uploadName: this.imageFile.name,
      path: ['userImages', this.category?.category_id!],
      data: { data: this.imageFile },
      onComplete: (downloadUrl) => {
        this.storage.deleteWithUrl({ url: String(this.category?.category_id) });
        this.firestore.update({
          path: ['category', String(this.category?.category_id)],
          data: {
            title: this.form!.value.title,
            category_image: downloadUrl,
          },  
          onComplete: (result) => {
            this.isloadingAdd = false;

            this.modalService.dismissAll();
            window.location.reload();
          },
        });
      },
    });
  }
}
