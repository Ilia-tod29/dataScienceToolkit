import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { HistogramComponent } from '../charts/histogram/histogram.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { AnalyzerComponent } from '../analyzer/analyzer.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ListUploadedFilesComponent } from '../list-uploaded-files/list-uploaded-files.component';
import {AppModule} from "../app.module";

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
    HistogramComponent,
    AnalyzerComponent,
    ListUploadedFilesComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgApexchartsModule,
        NgxDropzoneModule,
        AppModule
    ]
})
export class HomeModule { }
