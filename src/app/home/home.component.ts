import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showPieChart: boolean = false;
  pieChartStatus: string = "Show Pie Chart";
  showLineChart: boolean = false;
  lineChartStatus: string = "Show Line Chart";

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowPieChart(): void{
    if (!this.showLineChart)
    this.showPieChart = !this.showPieChart;

    this.pieChartStatus = !this.showPieChart ? "Show Pie Chart" : "Hide";
  }

  toggleShowLineChart(): void {
    if (!this.showPieChart)
      this.showLineChart = !this.showLineChart;

    this.lineChartStatus = !this.showLineChart ? "Show Line Chart" : "Hide";
  }

}
