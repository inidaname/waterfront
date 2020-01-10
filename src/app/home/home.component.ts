import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  meterNumber: any;
  houseAddress: any;
  leakageStatus: any;
  previous: any;
  current: any;
  unitConsume: any;
  unitCost: any;
  installationDate: any;
  fromDate: any;
  toTheDate: any;
  outstanding: any;
  curCharge: any;
  installedDate: any;
  message: string;
  setCame: boolean;
  estimatedBill: boolean;

  constructor(
    private api: ApiService
  ) {
    this.installedDate = '';
    this.message = '';
    this.setCame = false;
    this.estimatedBill = false;
  }

  ngOnInit() {
  }

  checkHouseNumber() {
    this.setCame = false;
    if (this.meterNumber && this.meterNumber.length > 2) {
      this.api.checkHouseNumber(this.meterNumber)
        .subscribe((record: any) => {
          this.installationDate = {
            month: 0,
            day: 0,
            year: 0
          };

          console.log(record)
          if (record) {
            this.houseAddress = record.data.houseAddress;
            this.installationDate.month = record.data.installationDate.month;
            this.installationDate.year = record.data.installationDate.year;
            this.installationDate.day = record.data.installationDate.day;
            this.leakageStatus = record.data.leakageStatus;
            this.previous = record.data.current;
            this.setCame = true;
          }
        });
    }
  }

  subMitFor() {
    this.message = '';
    const data = {
      meterNumber: this.meterNumber,
      houseAddress: this.houseAddress,
      leakageStatus: this.leakageStatus,
      previous: this.previous,
      current: this.current,
      unitConsume: this.unitConsume,
      unitCost: this.unitCost,
      installationDate: this.installationDate,
      fromDate: this.fromDate,
      toTheDate: this.toTheDate,
      outstanding: this.outstanding,
      curCharge: this.unitCost * this.unitConsume,
      totalDue: this.unitCost + this.unitConsume * this.outstanding
    }
    if (this.estimatedBill) {
      window.print();
    } else {
      if (this.setCame === false) {
        this.api.createRecord(data).subscribe(record => {
          if (record) {
            window.print();
          }
        }, err => {
          this.message = 'You may not be running the server';
        });
      } else {
        this.api.update(data).subscribe((record: any) => {
          if (record) {
            window.print();
          }
        }, err => {
          this.message = 'You may not be running the server';
        }
        );
      }
    }
  }

}
