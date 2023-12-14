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

import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@core/core.state';
import { ActionNotificationShow } from '@core/notification/notification.actions';
import { EntityTableConfig } from '@home/models/entity/entities-table-config.models';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EntityType } from '@shared/models/entity-type.models';
import { NULL_UUID } from '@shared/models/id/has-uuid';
import { OtaUpdateType } from '@shared/models/ota-package.models';
import { ReportInfo } from '@shared/models/report.models';
import { EntityComponent } from '../../components/entity/entity.component';

@Component({
  selector: 'tb-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent extends EntityComponent<ReportInfo> {

  entityType = EntityType;

  reportScope: 'tenant' | 'customer' | 'customer_user';

  otaUpdateType = OtaUpdateType;

  constructor(protected store: Store<AppState>,
    protected translate: TranslateService,
    @Inject('entity') protected entityValue: ReportInfo,
    @Inject('entitiesTableConfig') protected entitiesTableConfigValue: EntityTableConfig<ReportInfo>,
    public fb: FormBuilder,
    protected cd: ChangeDetectorRef) {
    super(store, fb, entityValue, entitiesTableConfigValue, cd);
  }

  ngOnInit() {
    this.reportScope = this.entitiesTableConfig.componentsData.reportScope;
    super.ngOnInit();
  }

  hideDelete() {
    if (this.entitiesTableConfig) {
      return !this.entitiesTableConfig.deleteEnabled(this.entity);
    } else {
      return false;
    }
  }

  isAssignedToCustomer(entity: ReportInfo): boolean {
    return entity && entity.customerId && entity.customerId.id !== NULL_UUID;
  }

  buildForm(entity: ReportInfo): FormGroup {
    const form = this.fb.group(
      {
        name: [entity ? entity.name : '', [Validators.required, Validators.maxLength(255)]],
        label: [entity ? entity.label : '', [Validators.maxLength(255)]],
        additionalInfo: this.fb.group(
          {
            gateway: [entity && entity.additionalInfo ? entity.additionalInfo.gateway : false],
            description: [entity && entity.additionalInfo ? entity.additionalInfo.description : ''],
          }
        )
      }
    );
    return form;
  }

  updateForm(entity: ReportInfo) {
    this.entityForm.patchValue({
      name: entity.name,
      label: entity.label,
      additionalInfo: {
        gateway: entity.additionalInfo ? entity.additionalInfo.gateway : false,
        description: entity.additionalInfo ? entity.additionalInfo.description : ''
      }
    });
  }


  onReportIdCopied($event) {
    this.store.dispatch(new ActionNotificationShow(
      {
        message: this.translate.instant('report.idCopiedMessage'),
        type: 'success',
        duration: 750,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      }));
  }

}
