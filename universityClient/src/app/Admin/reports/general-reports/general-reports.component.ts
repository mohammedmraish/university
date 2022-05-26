import { DashBoardService } from './../../_adminServices/dash-board.service';
import { Component, OnInit } from '@angular/core';
import { cardNumbers, gauge, verticalBars } from '../data';

@Component({
  selector: 'app-general-reports',
  templateUrl: './general-reports.component.html',
  styleUrls: ['./general-reports.component.css'],
})
export class GeneralReportsComponent implements OnInit {
  cardNumbers: any[];
  verticalBars: any[];
  gauge: any[];

  colorScheme = {
    domain: ['#3459E6'],
  };

  constructor(private dashBoardService: DashBoardService) {
    Object.assign(this, { gauge });
  }
  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.dashBoardService.getCardNumbersData().subscribe((res) => {
      this.cardNumbers = res;
    });

    this.dashBoardService.getFacultiesStudents().subscribe((res) => {
      this.verticalBars = res;
    });
  }

  onSelect(event) {
    console.log(event);
  }
}
