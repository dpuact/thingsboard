import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '@app/core/http/report.service';
import { TemplateManagementDialogComponent } from './template-management-dialog.component';

@Component({
    selector: 'app-report-dialog',
    templateUrl: './report-dialog.component.html',
    styleUrls: ['./report-dialog.component.scss'],
})
export class ReportDialogComponent {
    templateList: any[] = [];
    version: string;
    reportTitle: string;
    reportType: string;
    uuid: string;

    constructor(private reportService: ReportService, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, public dialogRef: MatDialogRef<ReportDialogComponent>,) {
        this.reportType = data.reportType;
        this.uuid = data.uuid;
    }



    ngOnInit() {
        this.getTemplateList();
    }

    getTemplateList() {
        this.reportService.getTemplateList(this.reportType).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.templateList = [];

                    for (const template of response.data) {
                        this.templateList.push({
                            versionControl: template.versionControl,
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
                    console.error('获取模版失败：', errorMessage);
                    alert('获取模版失败：' + errorMessage);
                } else {
                    console.error('获取模版失败：', error);
                    alert('获取模版失败');
                }
            }
        );
    }

    generateReport(reportTitle: string, version: string) {
        this.reportService.generatePdfReport(this.reportType, reportTitle, version, this.uuid)
            .subscribe((data: Blob) => {
                const blob = new Blob([data], { type: 'application/pdf' });
                const pdfUrl = window.URL.createObjectURL(blob);
                window.open(pdfUrl, '_blank');
            }, (error) => {
                console.log(error)
                if (error && error.error && error.error.message) {
                    const errorMessage = error.error.message;
                    console.error('生成报表失败：', errorMessage);
                    alert('生成报表失败：' + errorMessage);
                } else {
                    console.error('生成报表失败', error);
                    alert('生成报表失败');
                }
            }
            );
    }



    closeDialog() {
        this.dialogRef.close();
    }

    openTemplateManagement() {
        const dialogRef = this.dialog.open(TemplateManagementDialogComponent, {
            width: '800px',
            height: '750px',
            panelClass: 'report-dialog',
            data: {
                reportType: this.reportType
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getTemplateList();
        });
    }


}
