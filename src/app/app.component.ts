import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dataScienceToolkit';
  shouldVisualize: boolean = false;
  files: File[] = [];

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
    this.shouldVisualize = true;
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
    this.shouldVisualize = false;
  }
}
