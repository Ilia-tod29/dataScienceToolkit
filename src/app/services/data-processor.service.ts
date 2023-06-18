import { Injectable } from '@angular/core';
const SimpleStatistics = require('simple-statistics')

@Injectable({
  providedIn: 'root'
})
export class DataProcessorService {
  constructor() { }

  analyzeData(data: number[]): AnalyzedData {
    let variance = SimpleStatistics.variance(data);
    let median = SimpleStatistics.median(data);

    return {
      variance: variance,
      median: median
    }
  }
}

export interface AnalyzedData {
  variance: number;
  median: number;
}
