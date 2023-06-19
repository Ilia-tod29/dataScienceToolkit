import { Component, OnInit } from '@angular/core';
import { StorageRecord, ViewJson } from "../types/types";
import { AuthenticationService } from "../services/authentication.service";
import { DatabaseService } from "../services/database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: string | null;
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
    private databaseService: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser')
  }

  toggleShowPieChart(): void{
    if (!this.showLineChart)
    this.showPieChart = !this.showPieChart;

    this.pieChartStatus = !this.showPieChart ? "Show Pie Chart" : "Hide Pie Chart";
  }

  toggleShowLineChart(): void {
    if (!this.showPieChart)
      this.showLineChart = !this.showLineChart;

    this.lineChartStatus = !this.showLineChart ? "Show Line Chart" : "Hide Line Chart";
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
  }

  onRemove(event: any) {
    const indexOfEventToRemove = this.files.indexOf(event);
    this.files.splice(indexOfEventToRemove, 1);
    this.selectedData.splice(indexOfEventToRemove, 1);
  }

  onUpload() {
    for (const record of this.selectedData) {
      this.databaseService.createRecord(record)
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

  readSelectedRecord(record: StorageRecord | undefined) {
    this.selectedRecord = record;
    this.showAnalyse = true;
    this.loadAnalytics = false;
    if(this.selectedRecord === undefined) {
      this.showAnalyse = false;
      return;
    }
    this.dataToAnalise = JSON.parse(this.selectedRecord.jsonContent);

    this.showPieChart = false;
    this.showLineChart = false;
  }

  analiseData() {
    this.loadAnalytics = true;
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigate(['auth'])
  }

  clearAllJson() {
    this.files = [];
    this.selectedData = [];
    this.shouldUpload = false;
    this.jsonIsValid = false;
    this.loadAnalytics = false;
  }
}
