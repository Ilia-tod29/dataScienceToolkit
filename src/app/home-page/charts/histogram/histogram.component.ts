import {Component, Input, OnInit} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {
  @Input() data: JSON | undefined = undefined;

  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public plotOptions: ApexPlotOptions;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public fill: ApexFill;
  public title: ApexTitleSubtitle;

  constructor() {
    this.chart = {
      height: 350,
      type: "bar"
    }

    this.dataLabels = {
      enabled: true,
      formatter: function(val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"]
      }
    };

    this.plotOptions = {
      bar: {
        dataLabels: {
          position: "top" // top, center, bottom
        }
      }
    };

    this.yaxis = {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        }
      }
    };

    this.xaxis = {
      categories: [],
      position: "top",
      labels: {
        offsetY: -18
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      tooltip: {
        enabled: true,
        offsetY: -35
      }
    };

    this.fill = {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100]
      }
    };

    this.title = {
      text: "Histogram of selected JSON file",
      floating: false,
      offsetY: 320,
      align: "center",
      style: {
        color: "#444"
      }
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

      this.xaxis.categories = keys;

      this.series = [
        {
          name: "Histogram",
          data: values
        }
      ];
    }
  }

}
