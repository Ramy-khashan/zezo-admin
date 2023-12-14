import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FirebaseTSFirestore,
  Where,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { ViewUserDetailsComponent } from '../special-order/component/view-user-details/view-user-details.component';
import { OrderProductsDetailsComponent } from './component/order-products-details/order-products-details.component';
import { DeleteModalComponent } from 'src/app/shared/component/delete-modal/delete-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  isLoaingOrder: boolean = false;
  orders: Order[] = [];
  totalRecords: number=0;
  itemsPerPage: number=15;
  page: number =1; 
  firebase = new FirebaseTSFirestore();

  constructor(private router: Router, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.isLoaingOrder = true;
    this.orders = [];

    this.firebase.getCollection({
      path: ['order'],
      where: [],
      onComplete: (result) => {
        result.docs.forEach((docs) => {
          let order = <Order>docs.data();
          order.order_id = docs.id;

          this.orders.push(order);
        });
        this.isLoaingOrder = false;
        this.totalRecords=this.orders.length;
      },
      onFail: (result) => {
        this.router.navigate(['/notFound']);
      },
    });
  }
  orderFiltered(processType: string) {
    this.isLoaingOrder = true;
    this.orders = [];
    console.log(processType);
    this.firebase.getCollection({
      path: ['order'],
      where: [new Where('status', '==', processType)],
      onComplete: (result) => {
        result.docs.forEach((docs) => {
          let order = <Order>docs.data();
          order.order_id = docs.id;
          this.orders.push(order);
        });
        this.isLoaingOrder = false;
        this.totalRecords=this.orders.length;

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
      this.getOrders();
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
  showOrderProduct(product: Product[], total: string) {
    console.log(product);
    const modalRef = this.modalService.open(OrderProductsDetailsComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,

      centered: true,
      size: 'xl',
    });
    modalRef.componentInstance.products = product;
    modalRef.componentInstance.total = total;
  }
  openDeleteOrder(orderId: string) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.title = 'Order';
    modalRef.componentInstance.deleteItem = () => {
      this.deleteAds(orderId);
    };
  }
  deleteAds(orderId: string) {
    this.firebase.delete({
      path: ['order', orderId],
      onComplete: () => {
        window.location.reload();
      },
    });
  }
  shipped(orderId: string) {
    console.log(orderId);
    this.firebase.update({
      path: ['order', orderId],
      data: { status: 'shipped' },
      onComplete: (docRef) => {
        window.location.reload();
      },
    });
  }
  // searchOrder(){}
}
export interface Order {
  address: string;
  building: string;
  city: string;
  full_name: string;
  phone_number: string;
  created_at: string;
  email: string;
  payment: string;
  products: Product[];
  postal_code: string;
  totalPrice: string;
  user_id: string;
  order_id: string;
  street: string;
  status: string;
}

export interface Product {
  image: string;
  product_id: string;
  price: string;
  quantity: string;
  title: string;
}
