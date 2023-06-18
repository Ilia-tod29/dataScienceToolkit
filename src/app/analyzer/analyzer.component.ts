import { Component, OnInit, Input } from '@angular/core';
import { DataProcessorService } from '../services/data-processor.service';
import { AnalyzedData } from '../services/data-processor.service';
@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css']
})
export class AnalyzerComponent implements OnInit {
  @Input() data: JSON[] 
  analyzedData: AnalyzedData[] 
  constructor(private dataProcessor: DataProcessorService) { 
  }

  ngOnInit(): void {
  }

  analyzeData() {
    this.analyzedData = [];
    this.data.forEach( dataSet => {
      let values = Object.values(dataSet)
      this.analyzedData.push(this.dataProcessor.analyzeData(values));
    })
    console.log(this.analyzedData);
  }
}
