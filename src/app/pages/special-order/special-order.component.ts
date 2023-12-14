import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FirebaseTSFirestore,
  Where,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { ViewUserDetailsComponent } from './component/view-user-details/view-user-details.component';

@Component({
  selector: 'app-special-order',
  templateUrl: './special-order.component.html',
  styleUrls: ['./special-order.component.scss'],
})
export class SpecialOrderComponent implements OnInit {
  isLoaingOrder: boolean = false;
  orders: SpecialOrder[] = [];
  firebase: FirebaseTSFirestore = new FirebaseTSFirestore();
  totalRecords: number = 0;
  itemsPerPage: number = 15;
  page: number = 1;
  constructor(private router: Router, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.getSpecialOrders();
  }
  getSpecialOrders() {
    this.isLoaingOrder = true;
    this.orders = [];

    this.firebase.getCollection({
      path: ['specialOrder'],
      where: [],
      onComplete: (result) => {
        result.docs.forEach((docs) => {
          let order = <SpecialOrder>docs.data();
          order.order_id = docs.id;

          this.orders.push(order);
        });
        this.isLoaingOrder = false;
        this.totalRecords = this.orders.length;
      },
      onFail: (result) => {
        this.router.navigate(['/notFound']);
      },
    });
  }
  orderFiltered(processType: string) {
    this.isLoaingOrder = true;
    this.orders = [];
    this.firebase.getCollection({
      path: ['specialOrder'],
      where: [new Where('status', '==', processType)],
      onComplete: (result) => {
        result.docs.forEach((docs) => {
          let order = <SpecialOrder>docs.data();
          order.order_id = docs.id;
          this.orders.push(order);
        });
        this.isLoaingOrder = false;
        this.totalRecords = this.orders.length;
      },
      onFail: (result) => {
        this.router.navigate(['/notFound']);
      },
    });
  }
  onFilter(statusEvent: any) {
    let filter = statusEvent.target.value;
    console.log(filter);
    if (filter === 'all') {
      this.getSpecialOrders();
    } else {
      this.orderFiltered(filter);
    }
  }
  changeOrderSatus(status: string, orderId: string) {
    this.firebase.update({
      path: ['specialOrder', orderId],
      data: { status: status },
    });
  }
  showUserData(userId: string) {
    const modalRef = this.modalService.open(ViewUserDetailsComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,

      centered: true,
      size: 'xl',
    });
    modalRef.componentInstance.userId = userId;
  }
}
export interface SpecialOrder {
  address: string;
  description: string;
  email: string;
  full_name: string;
  phone: string;
  special_order: string;
  status: string;
  user_id: string;
  order_id: string;
}
