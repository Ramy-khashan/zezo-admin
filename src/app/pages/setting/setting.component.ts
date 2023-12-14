import { Component, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  isLoading:boolean = false;
   constructor() {}
  ngOnInit(): void {
    this.getDeliveryVal();
    this.getsendOrderMsg();
  }
  deliveryValue: string = '';
  sendOrderMsg: string = '';
  getDeliveryVal() {
   this. isLoading  = true;
   new FirebaseTSFirestore().getDocument({
      path: ['configration', 'deliveryFees'],
      onComplete: (result) => {
        this.deliveryValue = <string>result.data()!['delivery_fees'];
   this. isLoading  = false;

      },
    });
  }
  getsendOrderMsg() {
   this. isLoading  = true;

   new FirebaseTSFirestore().getDocument({
      path: ['configration', 'sendOrderMsg'],
      onComplete: (result) => {
        this.sendOrderMsg = <string>result.data()!['msg'];
   this. isLoading  = false;

      },
    });
  }
  getMsgChanged(data: Event) {
    this.sendOrderMsg = (<HTMLInputElement>data.target).value;
  }
  getDeliveryFeesChanged(data: Event) {
    this.deliveryValue = (<HTMLInputElement>data.target).value;
  }
  editMsg() {
    new FirebaseTSFirestore().update({
      path: ['configration', 'sendOrderMsg'],
      data: {
        msg: this.sendOrderMsg,
      },
      onComplete: (result) => {
        window.location.reload();
      },
    });
  }
  editDeliveryValue() {
    new FirebaseTSFirestore().update({
      path: ['configration', 'deliveryFees'],
      data: {
        delivery_fees: this.deliveryValue,
      },
      onComplete: (result) => {
        window.location.reload();
      },
    });
  }
}
