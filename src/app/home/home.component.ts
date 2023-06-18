import { Component, OnInit } from '@angular/core';
import { StorageRecord, ViewJson } from "../types/types";
import { AuthenticationService } from "../services/authentication.service";
import { DatabaseService } from "../services/database.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  shouldUpload: boolean = false;
  loadAnalytics: boolean = false;
  showAnalyse: boolean = false;
  files: File[] = [];
  jsonIsValid: boolean = false;

  selectedRecord: StorageRecord | undefined = undefined;
  dataToAnalise: JSON | undefined = undefined;
  selectedData: StorageRecord[] = [];

  showPieChart: boolean = false;
  pieChartStatus: string = "Show Pie Chart";
  showLineChart: boolean = false;
  lineChartStatus: string = "Show Line Chart";

  constructor(
    private authenticationService: AuthenticationService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
  }

  toggleShowPieChart(): void{
    if (!this.showLineChart)
    this.showPieChart = !this.showPieChart;

    this.pieChartStatus = !this.showPieChart ? "Show Pie Chart" : "Hide";
  }

  toggleShowLineChart(): void {
    if (!this.showPieChart)
      this.showLineChart = !this.showLineChart;

    this.lineChartStatus = !this.showLineChart ? "Show Line Chart" : "Hide";
  }

  onFileChanged(fileInput: any) {
    this.shouldUpload = false;
    const fileReader = new FileReader();

    for (const currentFile of fileInput.addedFiles) {
      fileReader.readAsText(currentFile, "UTF-8");
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          let data: StorageRecord = new StorageRecord();
          const result = JSON.parse(fileReader.result);
          const currentUser = localStorage.getItem('currentUser');

          if(this.validateJSON(result) && currentUser !== null) {
            this.jsonIsValid = true;
            data.fileName = currentFile['name'];
            data.jsonContent = JSON.stringify(result, null, 4);
            data.user = currentUser;
            this.selectedData.push(data);
            this.files.push(currentFile);
          } else {
            throw new Error("JSON file not in supported format!");
          }
        } else {
          throw new Error("JSON file is null");
        }
      }
      fileReader.onerror = (error) => {
        console.log(error);
      }
    }

    console.log(this.files);
    console.log(this.selectedData);
  }

  onRemove(event: any) {
    const indexOfEventToRemove = this.files.indexOf(event);
    this.files.splice(indexOfEventToRemove, 1);
    this.selectedData.splice(indexOfEventToRemove, 1);
  }

  onUpload() {
    for (const record of this.selectedData) {
      console.log(record);
      this.databaseService.createRecord(record).then(response => {
        console.log("record created");
        console.log(response);
      })
    }
  }

  uploadJson() {
    if (this.files.length > 0) {
      this.shouldUpload = true;
      this.onUpload();
      this.clearAllJson();
    }
  }

  private validateJSON(json: any): boolean {
    if (json instanceof Array) {
      return false;
    }

    for (const jsonKey in json) {
      if (typeof json[jsonKey] !== "number") {
        return false;
      }
    }

    return true;
  }


  readSelectedRecord(record: StorageRecord) {
    this.selectedRecord = record;
    this.dataToAnalise = JSON.parse(this.selectedRecord.jsonContent);
    this.showAnalyse = true;
    if(this.selectedData === undefined) {
      this.showAnalyse = false;
    }
  }

  analiseData() {
    this.loadAnalytics = true;
  }

  clearAllJson() {
    this.files = [];
    this.selectedData = [];
    this.shouldUpload = false;
    this.jsonIsValid = false;
  }
}
