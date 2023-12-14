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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsTableConfigResolver } from '@modules/home/pages/report/reports-table-config.resolver';
import { Authority } from '@shared/models/authority.enum';
import { EntitiesTableComponent } from '../../components/entity/entities-table.component';

const routes: Routes = [
  {
    path: 'reports',
    data: {
      breadcrumb: {
        label: 'report.reports',
        icon: 'picture_as_pdf'
      }
    },
    children: [
      {
        path: '',
        component: EntitiesTableComponent,
        data: {
          auth: [Authority.TENANT_ADMIN, Authority.CUSTOMER_USER],
          title: 'report.reports',
          reportsType: 'tenant'
        },
        resolve: {
          entitiesTableConfig: ReportsTableConfigResolver
        }
      },
      // {
      //   path: ':entityId',
      //   component: EntityDetailsPageComponent,
      //   canDeactivate: [ConfirmOnExitGuard],
      //   data: {
      //     breadcrumb: {
      //       labelFunction: entityDetailsPageBreadcrumbLabelFunction,
      //       icon: 'devices_other'
      //     } as BreadCrumbConfig<EntityDetailsPageComponent>,
      //     auth: [Authority.TENANT_ADMIN, Authority.CUSTOMER_USER],
      //     title: 'report.reports',
      //     devicesType: 'tenant'
      //   },
      //   resolve: {
      //     entitiesTableConfig: ReportsTableConfigResolver
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ReportsTableConfigResolver
  ]
})
export class ReportRoutingModule { }
