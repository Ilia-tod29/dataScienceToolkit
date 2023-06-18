import { Injectable } from '@angular/core';
import { AnalyzedData } from '../types/types'
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
