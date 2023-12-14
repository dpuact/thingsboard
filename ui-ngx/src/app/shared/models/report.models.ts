///
/// Copyright © 2016-2020 The Thingsboard Authors
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

import { BaseData } from '@shared/models/base-data';
import { CustomerId } from '@shared/models/id/customer-id';
import { TenantId } from '@shared/models/id/tenant-id';
import { EntitySearchQuery } from '@shared/models/relation.models';
import { ReportId } from './id/report-id';

export interface Report extends BaseData<ReportId> {
  tenantId?: TenantId;
  customerId?: CustomerId;
  name: string;
  type: string;
  label: string;
  reportInfo?: string;
  additionalInfo?: any;
  reportTitle: string;
  reportType: string;
  version: string;
  // templateId: string;
  createTime: string;
  reportId: string;
}

export interface ReportInfo extends Report {
  customerTitle: string;
  customerIsPublic: boolean;
}

export interface ReportSearchQuery extends EntitySearchQuery {
  reportTypes: Array<string>;
}

export interface StatReport{
  tenantId: String;
  startDate: String;
  endDate: String;
  customerId: String;
  reportType: String;
}