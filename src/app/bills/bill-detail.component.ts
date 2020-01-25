import { Component, OnInit } from '@angular/core';
import { BillService } from './bill.service';
import { Bill } from 'src/models/bill';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html'
})
export class BillDetailComponent implements OnInit {

  public bill: Bill;
  public title: string = 'Bill';
  

  constructor(private billService: BillService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.billService.getBill(id).subscribe(res => {
        this.bill = res;
      });
    });
  }

}
