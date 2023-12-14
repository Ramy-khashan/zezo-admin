import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Product } from '../../orders.component';

@Component({
  selector: 'app-order-products-details',
  templateUrl: './order-products-details.component.html',
  styleUrls: ['./order-products-details.component.scss']
})
export class OrderProductsDetailsComponent {
  isLoaingOrder: boolean = false;
  @Input() products:Product[]=[];
  @Input() total:string="";
   constructor(private modalService: NgbModal) {}
 
  closeModal() {
    this.modalService.dismissAll();
  } 
}
