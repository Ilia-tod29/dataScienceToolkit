import {Component, Input, OnInit} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis
} from "ng-apexcharts";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() data: JSON | undefined = undefined;
  public chartSeries: ApexAxisChartSeries;
  public chartDetails: ApexChart;
  public chartXAxis: ApexXAxis;
  public chartLabels: ApexDataLabels;
  public chartGrid: ApexGrid;
  public chartStroke: ApexStroke;
  public chartTitle: ApexTitleSubtitle;
  public chartMarkers: ApexMarkers;
  public chartYAxis: ApexYAxis;
  public chartFill: ApexFill;

  constructor() {
    this.chartDetails = {
      type: 'line',
      height: 350
    };

    this.chartLabels = {
      enabled: true
    };

    this.chartGrid = {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
      show: true
    }

    this.chartStroke = {
      width: 2
    };

    this.chartTitle = {
      text: 'Leading Companies'
    };

    this.chartMarkers = {
      size: 4
    };

    this.chartYAxis = {
      min: 0,
      max: 150
    };

    this.chartFill = {
      type: 'solid'
    };
  }

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

      this.chartXAxis = {
        categories: keys
      }

      this.chartSeries = [
        {
          name: 'Series 1',
          data: values
        }
      ];
    }
  }

}
