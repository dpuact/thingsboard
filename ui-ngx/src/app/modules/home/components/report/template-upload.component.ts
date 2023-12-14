
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '@app/core/http/report.service';

@Component({
    selector: 'app-template-upload',
    templateUrl: './template-upload.component.html',
})
export class TemplateUploadComponent {
    templateName: string;
    reportType: string;
    constructor(
        private reportService: ReportService,
        public dialogRef: MatDialogRef<TemplateUploadComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { this.reportType = data.reportType; }


    uploadFile(fileInput: HTMLInputElement, templateName: string): void {
        const file = fileInput.files[0];
        if (file) {
            this.reportService.zipUpload(file, this.reportType, templateName).subscribe(
                (response) => {
                    this.closeDialog();
                },
                (error) => {
                    if (error.error) {
                        const errorMessage = error.error.message;
                        console.error('文件上传失败：', errorMessage);
                        alert('文件上传失败：' + errorMessage);
                    } else {
                        console.error('文件上传失败：', error);
                        alert('文件上传失败');
                    }
                }
            );
        }
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
