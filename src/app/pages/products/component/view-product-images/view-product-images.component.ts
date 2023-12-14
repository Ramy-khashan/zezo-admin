import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-product-images',
  templateUrl: './view-product-images.component.html',
  styleUrls: ['./view-product-images.component.scss']
})
export class ViewProductImagesComponent {
constructor(
  private modalService: NgbModal,
){}
closeModal() {
  this.modalService.dismissAll();
}
@Input() productImages:string[] = [];
}
