import {Component, Input, OnInit} from '@angular/core';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import {formatNumber} from "@angular/common";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() data: JSON | undefined = undefined;

  // This should be get from the server
  chartSeries: ApexNonAxisChartSeries; //= [40, 55, 28, 55];

  // This should be get from the server
  chartLabels: any; //= ["Apple", "Microsoft", "Facebok", "Google"];

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
    let keys: string[] = [];
    let values: number[] = [];

    if (this.data !== undefined) {
      const jsonData = this.data as Record<string, any>;
      Object.keys(jsonData).forEach((key: string) => {
        const value = jsonData[key];
        keys.push(key);
        values.push(value);
      });

      this.chartLabels = keys;
      this.chartSeries = values;
    }
  }

}
