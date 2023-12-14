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

import { Component } from '@angular/core';
import { ReportInfo } from '@app/shared/models/report.models';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { EntityType } from '@shared/models/entity-type.models';
import { Direction } from '@shared/models/page/sort-order';
import { EntityTableHeaderComponent } from '../../components/entity/entity-table-header.component';

@Component({
  selector: 'tb-report-table-header',
  templateUrl: './report-table-header.component.html',
  styleUrls: ['./report-table-header.component.scss']
})
export class ReportTableHeaderComponent extends EntityTableHeaderComponent<ReportInfo> {
  selectedType: string = 'Device';
  entityType = EntityType;

  constructor(protected store: Store<AppState>) {
    super(store);
  }

  reportTypeChanged(reportType?: string) {
    this.entitiesTableConfig.componentsData.reportType = reportType;
    console.log(this.entitiesTableConfig.getTable())
    this.entitiesTableConfig.defaultSortOrder = { property: 'createTime', direction: Direction.ASC };
    this.entitiesTableConfig.getTable().resetSortAndFilter(true);
    
  }

}
