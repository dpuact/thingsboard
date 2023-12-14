///
/// Copyright © 2016-2023 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Injectable } from '@angular/core';

import { DatePipe } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { DeviceService } from '@app/core/http/device.service';
import { ReportService } from '@app/core/http/report.service';
import { Authority } from '@app/shared/models/authority.enum';
import { Customer } from '@app/shared/models/customer.model';
import { Report, ReportInfo } from '@app/shared/models/report.models';
import { selectAuthUser } from '@core/auth/auth.selectors';
import { AppState } from '@core/core.state';
import { CustomerService } from '@core/http/customer.service';
import { EdgeService } from '@core/http/edge.service';
import { BroadcastService } from '@core/services/broadcast.service';
import { DialogService } from '@core/services/dialog.service';
import { HomeDialogsService } from '@home/dialogs/home-dialogs.service';
import {
  CellActionDescriptor,
  DateEntityTableColumn,
  EntityTableColumn,
  EntityTableConfig,
  GroupActionDescriptor,
  HeaderActionDescriptor
} from '@home/models/entity/entities-table-config.models';
import { EntityAction } from '@home/models/entity/entity-component.models';
import { ReportTableHeaderComponent } from '@modules/home/pages/report/report-table-header.component';
import { ReportComponent } from '@modules/home/pages/report/report.component';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EntityType, entityTypeResources, entityTypeTranslations } from '@shared/models/entity-type.models';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { TemplateUploadComponent } from '../../components/report/template-upload.component';

@Injectable()
export class ReportsTableConfigResolver implements Resolve<EntityTableConfig<ReportInfo>> {
  templateList: any[] = [];

  private readonly config: EntityTableConfig<ReportInfo> = new EntityTableConfig<ReportInfo>();

  private customerId: string;

  constructor(
    private http: HttpClient,
    private reportService: ReportService,
    private deviceService: DeviceService,
    private store: Store<AppState>,
    private broadcast: BroadcastService,
    private customerService: CustomerService,
    private dialogService: DialogService,
    private edgeService: EdgeService,
    private homeDialogs: HomeDialogsService,
    private translate: TranslateService,
    private datePipe: DatePipe,
    private router: Router,
    private dialog: MatDialog) {

    this.config.entityType = EntityType.REPORT;
    this.config.entityComponent = ReportComponent;
    // this.config.entityTabsComponent = DeviceTabsComponent;
    this.config.entityTranslations = entityTypeTranslations.get(EntityType.REPORT);
    this.config.entityResources = entityTypeResources.get(EntityType.REPORT);

    this.config.addDialogStyle = { width: '600px' };

    this.config.deleteEntityTitle = report => this.translate.instant('report.delete-report-title', { reportName: report.name });
    this.config.deleteEntityContent = () => this.translate.instant('report.delete-report-text');
    this.config.deleteEntitiesTitle = count => this.translate.instant('report.delete-reports-title', { count });
    this.config.deleteEntitiesContent = () => this.translate.instant('report.delete-reports-text');

    // this.config.loadEntity = id => this.reportService.getTenantTemplateList('Device');
    this.config.onEntityAction = action => this.onReportAction(action, this.config);
    this.config.detailsReadonly = () =>
      (this.config.componentsData.reportScope === 'customer_user');

    this.config.headerComponent = ReportTableHeaderComponent;
    this.config.reportEnabled = false;
    this.config.handleRowClick = () => {
      return true;
    };


  }

  resolve(route: ActivatedRouteSnapshot): Observable<EntityTableConfig<ReportInfo>> {
    const routeParams = route.params;
    this.config.componentsData = {
      reportScope: route.data.reportsType,
      reportType: 'Device',
    };
    this.customerId = routeParams.customerId;
    this.config.componentsData.edgeId = routeParams.edgeId;
    return this.store.pipe(select(selectAuthUser), take(1)).pipe(
      tap((authUser) => {
        if (authUser.authority === Authority.CUSTOMER_USER) {
          this.config.componentsData.reportScope = 'customer_user';
          this.customerId = authUser.customerId;
        }
      }),
      mergeMap(() =>
        this.customerId ? this.customerService.getCustomer(this.customerId) : of(null as Customer)
      ),
      map((parentCustomer) => {
        if (parentCustomer) {
          if (parentCustomer.additionalInfo && parentCustomer.additionalInfo.isPublic) {
            this.config.tableTitle = this.translate.instant('customer.public-reports');
          } else {
            this.config.tableTitle = parentCustomer.title + ': ' + this.translate.instant('report.reports');
          }
        } else {
          this.config.tableTitle = this.translate.instant('report.reports');
        }
        this.config.columns = this.configureColumns(this.config.componentsData.reportScope);
        this.configureEntityFunctions(this.config.componentsData.reportScope);
        this.config.cellActionDescriptors = this.configureCellActions(this.config.componentsData.reportScope);
        this.config.groupActionDescriptors = this.configureGroupActions(this.config.componentsData.reportScope);
        this.config.addActionDescriptors = this.configureAddActions(this.config.componentsData.reportScope);
        this.config.addEnabled = !(this.config.componentsData.reportScope === 'customer_user');
        this.config.entitiesDeleteEnabled = this.config.componentsData.reportScope === 'tenant';
        this.config.deleteEnabled = () => this.config.componentsData.reportScope === 'tenant';
        return this.config;
      })
    );
  }

  // 列表标题行
  configureColumns(reportScope: string): Array<EntityTableColumn<ReportInfo>> {
    const columns: Array<EntityTableColumn<ReportInfo>> = [
      new DateEntityTableColumn<ReportInfo>('createTime', 'common.created-time', this.datePipe, '150px'),
      new EntityTableColumn<ReportInfo>('reportTitle', 'report.reportTitle', '25%'),
      new EntityTableColumn<ReportInfo>('reportType', 'report.reportType', '25%'),
      new EntityTableColumn<ReportInfo>('versionControl', 'report.version', '25%')
    ];
    // if (reportScope === 'tenant') {
    //   columns.push(
    //     new EntityTableColumn<ReportInfo>('customerTitle', 'customer.customer', '25%'),
    //     new EntityTableColumn<ReportInfo>('customerIsPublic', 'device.public', '60px',
    //       entity => {
    //         return checkBoxCell(entity.customerIsPublic);
    //       }, () => ({}), false),
    //   );
    // }
    return columns;
  }

  configureEntityFunctions(reportScope: string): void {
    if (reportScope === 'tenant') {
      console.log('请求', this.config.componentsData.reportType)
      this.config.entitiesFetchFunction = pageLink =>
        this.reportService.getTenantReportList(pageLink, this.config.componentsData.reportType);
      this.config.deleteEntity = id => this.reportService.deleteReport(id.id);
    } else {
      // this.config.entitiesFetchFunction = pageLink =>
      //   this.reportService.getCustomerReportInfos(this.customerId, pageLink, this.config.componentsData.reportType);
    }
  }

  configureCellActions(reportScope: string): Array<CellActionDescriptor<ReportInfo>> {
    const actions: Array<CellActionDescriptor<ReportInfo>> = [];
    if (reportScope === 'tenant') {
      actions.push(
        {
          name: this.translate.instant('report.view'),
          icon: 'picture_as_pdf',
          isEnabled: () => true,
          onAction: ($event, entity) => this.viewReport($event, entity)
        }
      );
      actions.push(
        {
          name: this.translate.instant('report.download'),
          icon: 'download',
          isEnabled: () => true,
          onAction: ($event, entity) => this.downloadTemplate($event, entity)
        }
      );
    }
    if (reportScope === 'customer') {
      actions.push(

      );
    }
    if (reportScope === 'customer_user') {
      actions.push(

      );
    }
    return actions;
  }

  configureGroupActions(reportScope: string): Array<GroupActionDescriptor<ReportInfo>> {
    const actions: Array<GroupActionDescriptor<ReportInfo>> = [];
    if (reportScope === 'tenant') {
      actions.push(

      );
    }
    return actions;
  }

  //添加按钮下拉菜单选项
  configureAddActions(reportScope: string): Array<HeaderActionDescriptor> {
    const actions: Array<HeaderActionDescriptor> = [];
    if (reportScope === 'tenant') {
      actions.push(
        {
          name: this.translate.instant('report.import'),
          icon: 'file_upload',
          isEnabled: () => true,
          onAction: ($event) => this.importReports($event)
        },
      );
    }
    if (reportScope === 'customer') {
      actions.push(
      );
    }
    return actions;
  }

  importReports($event: Event) {
    const dialogRef = this.dialog.open(TemplateUploadComponent, {
      width: '600px',
      height: '200px',
      panelClass: 'report-dialog',
      data: {
        reportType: this.config.componentsData.reportType
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.config.getTable().resetSortAndFilter(true);
    });
  }

  downloadTemplate($event: Event, entity: Report) {
    if ($event) {
      $event.stopPropagation();
    }
    this.reportService.downloadTemplate(entity.id.id).subscribe(
      (response: HttpResponse<Blob>) => {
        const data = response.body;

        const blob = new Blob([data], { type: 'application/octet-stream' });

        // 获取响应头中的 Content-Disposition
        const contentDisposition = response.headers.get('Content-Disposition');

        // 从 Content-Disposition 中提取文件名
        const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);

        let filename = 'downloaded_file.zip'; // 默认文件名
        if (filenameMatch) {
          filename = filenameMatch[1];
        }


        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', filename); // 设置下载文件名
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Failed to download file', error);
      }
    )
  }

  viewReport($event: Event, entity: Report) {
    if ($event) {
      $event.stopPropagation();
    }
    this.reportService.viewReport(entity.id.id).subscribe(
      (response: HttpResponse<Blob>) => {
        const data = response.body;

        const blob = new Blob([data], { type: 'application/pdf' });
        const pdfUrl = window.URL.createObjectURL(blob);
        window.open(pdfUrl, '_blank');

        // // 获取响应头中的 Content-Disposition
        // const contentDisposition = response.headers.get('Content-Disposition');

        // // 从 Content-Disposition 中提取文件名
        // const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);

        // let filename = 'report.pdf'; // 默认文件名
        // if (filenameMatch) {
        //   filename = filenameMatch[1];
        // }


        // const url = window.URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.setAttribute('download', filename); // 设置下载文件名
        // a.target = '_blank';
        // document.body.appendChild(a);
        // a.click();
        // window.URL.revokeObjectURL(url);
        // document.body.removeChild(a);
      },
      (error) => {
        console.error('Failed to download file', error);
      }
    )
  }

  onReportAction(action: EntityAction<ReportInfo>, config: EntityTableConfig<ReportInfo>): boolean {
    switch (action.action) {
      case 'download':
        this.downloadTemplate(action.event, action.entity);
        return true;
    }
    return false;
  }
}


