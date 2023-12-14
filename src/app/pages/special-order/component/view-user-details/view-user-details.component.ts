import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.scss'],
})
export class ViewUserDetailsComponent  implements OnInit{
  isLoaingOrder: boolean = false;
  user:User={
    email: '',
    name: '',
    phone: '',
    user_id: '',
    user_uid: ''
  };
  firebase : FirebaseTSFirestore= new FirebaseTSFirestore();
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {
   this.getUserData();
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  @Input() userId?:string;
  getUserData(){
    console.log(this.userId);
this.firebase.getDocument({
  path:['users',this.userId!],
  onComplete:(res)=>{
 this.user= <User>res.data() ;
  }
})
  }
}
export interface User{
  email: string;
  name: string;
  phone: string;
  user_id: string; 
  user_uid: string; 
}
