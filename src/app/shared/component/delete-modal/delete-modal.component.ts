import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  constructor(private modalService: NgbModal) {}
  closeModal() {
    this.modalService.dismissAll();
  }
  @Input() title:string="";
  @Input() deleteItem(){}
}
