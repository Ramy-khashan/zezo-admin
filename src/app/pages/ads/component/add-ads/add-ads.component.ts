import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss'],
})
export class AddAdsComponent {
  canAddProduct: boolean = false;
  isloadingAdd: boolean = false;
  isloadingUploadImg: boolean = false;

  file: any = '';
  imageFile: any='';
  storage: FirebaseTSStorage = new FirebaseTSStorage();

  form?: FormGroup;
  firestore: FirebaseTSFirestore = new FirebaseTSFirestore();
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
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
  addAds() {
    let adsId = this.firestore.genDocId();
    if (this.imageFile === null) {
      return;
    }
    this.isloadingAdd = true;
    this.storage.upload({
      uploadName: this.imageFile.name,
      path: ['userImages', adsId],
      data: { data: this.imageFile },
      onComplete: (downloadUrl) => {
        this.firestore.create({
          path: ['ads', adsId],
          data: {
            title: this.form!.value.title,
            ads_id: adsId,
            ads_image: downloadUrl,
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
