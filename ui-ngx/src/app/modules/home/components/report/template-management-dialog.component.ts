import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '@app/core/http/report.service';
import { TemplateUploadComponent } from './template-upload.component';

@Component({
  selector: 'app-template-management-dialog',
  templateUrl: './template-management-dialog.component.html',
})
export class TemplateManagementDialogComponent implements OnInit {
  templateList: any[] = [];
  reportType: string;

  constructor(private reportService: ReportService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TemplateManagementDialogComponent>) {
    this.reportType = data.reportType;
  }

  ngOnInit(): void {

    this.getTemplateList();
  }


  openTemplateUploadDialog(): void {
    const dialogRef = this.dialog.open(TemplateUploadComponent, {
      width: '600px',
      height: '200px',
      panelClass: 'report-dialog',
      data: {
        reportType: this.reportType
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.getTemplateList();
    });
  }


  deleteTemplate(templateId: string) {
    this.reportService.deleteTemplate(templateId).subscribe(
      (response) => {
        if (response.status === 200) {
          console.log('Template deleted successfully');
          this.getTemplateList();
        } else {
          console.error('Error deleting template');
        }
      },
      (error) => {
        if (error.error) {
          const errorMessage = error.error.message;
          console.error('删除失败：', errorMessage);
          alert('删除失败：' + errorMessage);
        } else {
          console.error('删除失败：', error);
          alert('删除失败');
        }
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getTemplateList() {
    this.reportService.getTemplateList(this.reportType).subscribe(
      (response) => {
        if (response.status === 200) {
          this.templateList = [];
          for (const template of response.data) {
            this.templateList.push({
              templateId: template.templateId,
              templateType: template.templateType,
              templateName: template.templateName,
              fileData: template.fileData,
              versionControl: template.versionControl,
              createTime: template.createTime
            });
          }
          console.log('Template List:', this.templateList);
        } else {
          console.error('Error:');
        }
      },
      (error) => {
        if (error.error) {
          const errorMessage = error.error.message;
          console.error('模版获取失败：', errorMessage);
          alert('模版获取失败：' + errorMessage);
        } else {
          console.error('模版获取失败：', error);
          alert('模版获取失败');
        }
      }
    );
  }
}
