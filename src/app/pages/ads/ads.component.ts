import { Component, OnInit } from '@angular/core';
import { DeleteModalComponent } from 'src/app/shared/component/delete-modal/delete-modal.component';
import { AddAdsComponent } from './component/add-ads/add-ads.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit {
  isLoaingads: boolean = false;
  ads: Ads[] = [];
  firebase = new FirebaseTSFirestore();

  constructor(private router: Router, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.getAds();
  }
  getAds() {
   this. isLoaingads=true;
    this.firebase.getCollection({
      path: ['ads'],
      where: [],
      onComplete: (result) => {
        result.docs.forEach((docs) => {
          let ad = <Ads>docs.data();
          this.ads.push(ad);

        });
   this. isLoaingads=false;

      },
      onFail: (result) => {
        this.router.navigate(['/notFound']);
      },
    });
  }
  openAddAds() {
    const modalRef = this.modalService.open(AddAdsComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,

      centered: true,
      size: 'lg',
    });
  }

  openDeleteAds(ads_id: string) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      backdrop: false,
      windowClass: 'modal-holder',
      scrollable: true,
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.title = 'Ads';
    modalRef.componentInstance.deleteItem = () => {
      this.deleteAds(ads_id);
    };
  }
  deleteAds(ads_id: string) {
    this.firebase.delete({
      path: ['ads', ads_id],
      onComplete: () => {
        window.location.reload();
      },
    });
  }
}
export interface Ads {
  ads_image: string;
  title: string;
  ads_id: string;
}
