import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SnotifyService } from 'ng-snotify';
import { PaginationInstance } from '../../../../../node_modules/ngx-pagination';

import { Bill, User, Config } from '../../../appModel';

import { BillService } from '../../bill.service';
import { LoaderService } from '../../../shared/loader.service';
import { PaginationService } from '../../../shared/pagination.service';
@Component({
  selector: 'app-bills-unpaid',
  templateUrl: './bills-unpaid.component.html',
  styleUrls: ['./bills-unpaid.component.sass']
})
export class BillsUnpaidComponent implements OnInit {
  private subscriptions = new Array<Subscription>();
  bills = new Array<Bill>();
  billsForPay: Array<Bill>;
  config = new Config();
  constructor(
    private billService: BillService,
    private loader: LoaderService,
    private notify: SnotifyService,
    private srv: PaginationService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.billService.billsToPay$
      .subscribe((res) => this.billsForPay = res));

    this.getUnPaidBills();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  getUnPaidBills() {
    this.loader.show();
    this.billService.getbills().subscribe((res) => {
      this.bills = res;
      this.initConfig(res);
      this.loader.hide();
    }, error => {
      this.loader.hide();
    });
  }

  addRemovebill(id: string) {
    var i = this.bills.findIndex(x => x.id == id);
    var index = this.billsForPay.findIndex(x => x.id == id);
    if (index > -1) {
      this.billsForPay.splice(index, 1);
      return;
    }
    this.billsForPay.push(this.bills[i]);
  }

  isOnPayList(id: string) {
    return this.billsForPay.findIndex(x => x.id == id) > -1;
  }

  checkFallDue(d: Date) {
    var dueDate = new Date(d);
    return new Date() > dueDate;
  }


  initConfig(data: any) {
    this.config.currentPage = 1;
    this.config.pageSize = 10;
    this.config.data = data;
    this.config.totalPages = this.getTotalPages(data.length, this.config.pageSize);
    this.config.pages = this.srv.getPages(this.config.totalPages, this.config.currentPage);
  }

  getTotalPages(length: number, size: number) {
    var pageSize = Math.floor(length / size);
    if (pageSize != length / size) {
      return pageSize + 1
    }
    return pageSize
  }
}