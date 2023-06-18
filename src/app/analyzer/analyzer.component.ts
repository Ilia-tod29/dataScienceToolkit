import { Component, OnInit, Input } from '@angular/core';
import { DataProcessorService } from '../services/data-processor.service';
import { AnalyzedData } from '../types/types';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css']
})
export class AnalyzerComponent implements OnInit {
  @Input() data: JSON | undefined = undefined;
  analysedData: AnalyzedData[]
  constructor(private dataProcessor: DataProcessorService) {
  }

  ngOnInit(): void {
    if(this.data === undefined) {
      return;
    }
    this.analysedData = [];
    // this.data.forEach( dataSet => {
    //   let values = Object.values(dataSet)
    //   this.analyzedData.push(this.dataProcessor.analyzeData(values));
    // })
    let values = Object.values(this.data)
    this.analysedData.push(this.dataProcessor.analyzeData(values));
    console.log(this.analysedData);
  }
}
