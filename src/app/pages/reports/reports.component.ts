import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  isLoaingreport: boolean = false;
  totalRecords: number=0;
  itemsPerPage: number=15;
  page: number =1; 
  reports: Reports[] = [];
  firebase = new FirebaseTSFirestore();

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.isLoaingreport = true;
    this.reports = [];

    this.firebase.getCollection({
      path: ['reports'],
      where: [],
      onComplete: (result) => {
        result.docs.forEach((docs) => {
          let order = <Reports>docs.data();

          this.reports.push(order);
        });
        this.isLoaingreport = false;
        this.totalRecords=this.reports.length;
      },
      onFail: (result) => {
        this.router.navigate(['/notFound']);
      },
    });
  }
}
export interface Reports {
  email: string;
  phone: string;
  report: string;
  report_id: string;
  user_id: string;
  user_name: string;
}
