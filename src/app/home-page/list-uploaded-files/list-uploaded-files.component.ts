import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageRecord } from "../../types/types";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: 'app-list-uploaded-files',
  templateUrl: './list-uploaded-files.component.html',
  styleUrls: ['./list-uploaded-files.component.css']
})
export class ListUploadedFilesComponent implements OnInit {

  uploadedFiles: StorageRecord[];
  selectedFile: StorageRecord | undefined = undefined;
  @Output() selectedRecord: EventEmitter<any> = new EventEmitter<any>();

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.getSorageList().subscribe(res => {
      this.uploadedFiles = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as{}
        } as StorageRecord;
      }).filter((currentRecord) => {
        return currentRecord.user === localStorage.getItem('currentUser');
      })
    })
  }

  selectRecord(record: StorageRecord): void {
    this.selectedFile = record;
    this.selectedRecord.emit(record);
  }

  deleteSelectedFile(): void {
    if (this.selectedFile != undefined && confirm("Are you sure to delete" + this.selectedFile.fileName)) {
      this.databaseService.delete(this.selectedFile);
      this.selectedFile = undefined;
      this.selectedRecord.emit(this.selectedFile);
    }
  }
}
