import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showPieChart: boolean = false;
  pieChartStatus: string = "Show Pie Chart";
  showLineChart: boolean = false;
  lineChartStatus: string = "Show Line Chart";

  constructor() { }

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


  shouldVisualize: boolean = false;
  files: File[] = [];

  jsonIsValid: boolean = false;

  uploadedData: JSON[] = []
  // Might be removed
  // Everything related to this variable is only for test reasons and display of the json to the user
  fileText: string[] = [];

  onFileChanged(fileInput: any) {
    const fileReader = new FileReader();

    for (const currentFile of fileInput.addedFiles) {
      fileReader.readAsText(currentFile, "UTF-8");
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          const result = JSON.parse(fileReader.result);
          console.log(result);

          if(this.validateJSON(result)) {
            this.fileText.push(JSON.stringify(result, null, 4));
            this.jsonIsValid = true;
            this.uploadedData.push(result);
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
      this.files.push(currentFile);
    }

    console.log(this.files)

  }

  onRemove(event: any) {
    const indexOfEventToRemove = this.files.indexOf(event);
    this.files.splice(indexOfEventToRemove, 1);
    this.fileText.splice(indexOfEventToRemove, 1);
    console.log(this.files);
  }

  onUpload() {
    // upload code
  }

  visualizeJson() {
    if (this.files.length > 0) {
      this.shouldVisualize = true;
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

  clearAllJson() {
    this.fileText = [];
    this.files = [];
    this.uploadedData = [];
    this.shouldVisualize = false;
    this.jsonIsValid = false;
  }

}
