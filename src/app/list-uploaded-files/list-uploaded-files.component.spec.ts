import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUploadedFilesComponent } from './list-uploaded-files.component';

describe('ListUploadedFilesComponent', () => {
  let component: ListUploadedFilesComponent;
  let fixture: ComponentFixture<ListUploadedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUploadedFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUploadedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
