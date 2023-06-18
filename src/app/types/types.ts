export type authParams = {
  email: string;
  password: string;
}

export type AnalyzedData = {
  variance: number;
  median: number;
}

export type ViewJson = {
  fileName: string;
  jsonContent: string;
}

export class StorageRecord {
  id: string;
  fileName: string;
  jsonContent: string;
  user: string;
}
