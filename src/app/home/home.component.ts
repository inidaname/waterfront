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

  constructor(
    private api: ApiService
  ) {
    this.installationDate = {};
    this.fromDate = {};
    this.toTheDate = {};
    this.installedDate = '';
    this.message = '';
  }

  ngOnInit() {
  }

  subMitFor() {
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
    this.api.createRecord(data).subscribe(record => {
      if (record) {
        window.print();
      }
    }, err => {
      this.message = 'You may not be running the server';
    });
  }

}
