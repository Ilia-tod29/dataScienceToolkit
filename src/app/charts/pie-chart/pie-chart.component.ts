import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  // This should be get from the server
  chartSeries: ApexNonAxisChartSeries = [40, 55, 28, 55]; 
  
  // This should be get from the server
  chartLabels: any = ["Apple", "Microsoft", "Facebok", "Google"]; 

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  };

  chartTitle: ApexTitleSubtitle = {
    text: 'Leading Companies',
    align: 'center'
  };

  chartDataLabels: ApexDataLabels = {
    enabled: false
  };

  constructor() { }

  ngOnInit(): void {
  }

}
