import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    LineChartComponent,
    PieChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ]
})
export class HomeModule { }
