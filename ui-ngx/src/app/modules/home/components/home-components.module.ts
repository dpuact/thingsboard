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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '@app/shared/shared.module';
import { AlarmTableHeaderComponent } from '@home/components/alarm/alarm-table-header.component';
import { AlarmTableComponent } from '@home/components/alarm/alarm-table.component';
import { AliasesEntityAutocompleteComponent } from '@home/components/alias/aliases-entity-autocomplete.component';
import { AliasesEntitySelectPanelComponent } from '@home/components/alias/aliases-entity-select-panel.component';
import { AliasesEntitySelectComponent } from '@home/components/alias/aliases-entity-select.component';
import { EntityAliasDialogComponent } from '@home/components/alias/entity-alias-dialog.component';
import { EntityAliasSelectComponent } from '@home/components/alias/entity-alias-select.component';
import { EntityAliasesDialogComponent } from '@home/components/alias/entity-aliases-dialog.component';
import { AddAttributeDialogComponent } from '@home/components/attribute/add-attribute-dialog.component';
import { AddWidgetToDashboardDialogComponent } from '@home/components/attribute/add-widget-to-dashboard-dialog.component';
import { AttributeTableComponent } from '@home/components/attribute/attribute-table.component';
import { EditAttributeValuePanelComponent } from '@home/components/attribute/edit-attribute-value-panel.component';
import { AuditLogDetailsDialogComponent } from '@home/components/audit-log/audit-log-details-dialog.component';
import { AuditLogTableComponent } from '@home/components/audit-log/audit-log-table.component';
import { AddWidgetDialogComponent } from '@home/components/dashboard-page/add-widget-dialog.component';
import { DashboardImageDialogComponent } from '@home/components/dashboard-page/dashboard-image-dialog.component';
import { DashboardPageComponent } from '@home/components/dashboard-page/dashboard-page.component';
import { DashboardSettingsDialogComponent } from '@home/components/dashboard-page/dashboard-settings-dialog.component';
import { DashboardStateComponent } from '@home/components/dashboard-page/dashboard-state.component';
import { DashboardToolbarComponent } from '@home/components/dashboard-page/dashboard-toolbar.component';
import { DashboardWidgetSelectComponent } from '@home/components/dashboard-page/dashboard-widget-select.component';
import { EditWidgetComponent } from '@home/components/dashboard-page/edit-widget.component';
import { DashboardLayoutComponent } from '@home/components/dashboard-page/layout/dashboard-layout.component';
import { ManageDashboardLayoutsDialogComponent } from '@home/components/dashboard-page/layout/manage-dashboard-layouts-dialog.component';
import { DashboardStateDialogComponent } from '@home/components/dashboard-page/states/dashboard-state-dialog.component';
import { ManageDashboardStatesDialogComponent } from '@home/components/dashboard-page/states/manage-dashboard-states-dialog.component';
import { StatesControllerModule } from '@home/components/dashboard-page/states/states-controller.module';
import { DisplayWidgetTypesPanelComponent } from '@home/components/dashboard-page/widget-types-panel.component';
import { DashboardComponent } from '@home/components/dashboard/dashboard.component';
import { SelectTargetLayoutDialogComponent } from '@home/components/dashboard/select-target-layout-dialog.component';
import { SelectTargetStateDialogComponent } from '@home/components/dashboard/select-target-state-dialog.component';
import { DetailsPanelComponent } from '@home/components/details-panel.component';
import { DeviceCredentialsModule } from '@home/components/device/device-credentials.module';
import { EdgeDownlinkTableHeaderComponent } from '@home/components/edge/edge-downlink-table-header.component';
import { EdgeDownlinkTableComponent } from '@home/components/edge/edge-downlink-table.component';
import { AddEntityDialogComponent } from '@home/components/entity/add-entity-dialog.component';
import { EntitiesTableComponent } from '@home/components/entity/entities-table.component';
import { EntityDetailsPageComponent } from '@home/components/entity/entity-details-page.component';
import { EntityDetailsPanelComponent } from '@home/components/entity/entity-details-panel.component';
import { EntityFilterViewComponent } from '@home/components/entity/entity-filter-view.component';
import { EntityFilterComponent } from '@home/components/entity/entity-filter.component';
import { EventContentDialogComponent } from '@home/components/event/event-content-dialog.component';
import { EventFilterPanelComponent } from '@home/components/event/event-filter-panel.component';
import { EventTableHeaderComponent } from '@home/components/event/event-table-header.component';
import { EventTableComponent } from '@home/components/event/event-table.component';
import { BooleanFilterPredicateComponent } from '@home/components/filter/boolean-filter-predicate.component';
import { ComplexFilterPredicateDialogComponent } from '@home/components/filter/complex-filter-predicate-dialog.component';
import { ComplexFilterPredicateComponent } from '@home/components/filter/complex-filter-predicate.component';
import { FilterDialogComponent } from '@home/components/filter/filter-dialog.component';
import { FilterPredicateListComponent } from '@home/components/filter/filter-predicate-list.component';
import { FilterPredicateValueComponent } from '@home/components/filter/filter-predicate-value.component';
import { FilterPredicateComponent } from '@home/components/filter/filter-predicate.component';
import { FilterSelectComponent } from '@home/components/filter/filter-select.component';
import { FilterTextComponent } from '@home/components/filter/filter-text.component';
import { FilterUserInfoDialogComponent } from '@home/components/filter/filter-user-info-dialog.component';
import { FilterUserInfoComponent } from '@home/components/filter/filter-user-info.component';
import { FiltersDialogComponent } from '@home/components/filter/filters-dialog.component';
import { FiltersEditPanelComponent } from '@home/components/filter/filters-edit-panel.component';
import { FiltersEditComponent } from '@home/components/filter/filters-edit.component';
import { KeyFilterDialogComponent } from '@home/components/filter/key-filter-dialog.component';
import { KeyFilterListComponent } from '@home/components/filter/key-filter-list.component';
import { NumericFilterPredicateComponent } from '@home/components/filter/numeric-filter-predicate.component';
import { StringFilterPredicateComponent } from '@home/components/filter/string-filter-predicate.component';
import { UserFilterDialogComponent } from '@home/components/filter/user-filter-dialog.component';
import { ImportDialogCsvComponent } from '@home/components/import-export/import-dialog-csv.component';
import { ImportDialogComponent } from '@home/components/import-export/import-dialog.component';
import { ImportExportService } from '@home/components/import-export/import-export.service';
import { TableColumnsAssignmentComponent } from '@home/components/import-export/table-columns-assignment.component';
import { AddDeviceProfileDialogComponent } from '@home/components/profile/add-device-profile-dialog.component';
import { AlarmDurationPredicateValueComponent } from '@home/components/profile/alarm/alarm-duration-predicate-value.component';
import { AlarmDynamicValue } from '@home/components/profile/alarm/alarm-dynamic-value.component';
import { AlarmRuleConditionDialogComponent } from '@home/components/profile/alarm/alarm-rule-condition-dialog.component';
import { AlarmRuleConditionComponent } from '@home/components/profile/alarm/alarm-rule-condition.component';
import { AlarmRuleComponent } from '@home/components/profile/alarm/alarm-rule.component';
import { AlarmScheduleDialogComponent } from '@home/components/profile/alarm/alarm-schedule-dialog.component';
import { AlarmScheduleInfoComponent } from '@home/components/profile/alarm/alarm-schedule-info.component';
import { AlarmScheduleComponent } from '@home/components/profile/alarm/alarm-schedule.component';
import { CreateAlarmRulesComponent } from '@home/components/profile/alarm/create-alarm-rules.component';
import { DeviceProfileAlarmComponent } from '@home/components/profile/alarm/device-profile-alarm.component';
import { DeviceProfileAlarmsComponent } from '@home/components/profile/alarm/device-profile-alarms.component';
import { EditAlarmDetailsDialogComponent } from '@home/components/profile/alarm/edit-alarm-details-dialog.component';
import { AssetProfileAutocompleteComponent } from '@home/components/profile/asset-profile-autocomplete.component';
import { AssetProfileDialogComponent } from '@home/components/profile/asset-profile-dialog.component';
import { AssetProfileComponent } from '@home/components/profile/asset-profile.component';
import { DeviceProfileAutocompleteComponent } from '@home/components/profile/device-profile-autocomplete.component';
import { DeviceProfileDialogComponent } from '@home/components/profile/device-profile-dialog.component';
import { DeviceProfileProvisionConfigurationComponent } from '@home/components/profile/device-profile-provision-configuration.component';
import { DeviceProfileComponent } from '@home/components/profile/device-profile.component';
import { CoapDeviceProfileTransportConfigurationComponent } from '@home/components/profile/device/coap-device-profile-transport-configuration.component';
import { DeviceProfileCommonModule } from '@home/components/profile/device/common/device-profile-common.module';
import { DefaultDeviceProfileConfigurationComponent } from '@home/components/profile/device/default-device-profile-configuration.component';
import { DefaultDeviceProfileTransportConfigurationComponent } from '@home/components/profile/device/default-device-profile-transport-configuration.component';
import { DeviceProfileConfigurationComponent } from '@home/components/profile/device/device-profile-configuration.component';
import { DeviceProfileTransportConfigurationComponent } from '@home/components/profile/device/device-profile-transport-configuration.component';
import { Lwm2mProfileComponentsModule } from '@home/components/profile/device/lwm2m/lwm2m-profile-components.module';
import { MqttDeviceProfileTransportConfigurationComponent } from '@home/components/profile/device/mqtt-device-profile-transport-configuration.component';
import { SnmpDeviceProfileTransportModule } from '@home/components/profile/device/snmp/snmp-device-profile-transport.module';
import { TenantProfileQueuesComponent } from '@home/components/profile/queue/tenant-profile-queues.component';
import { TenantProfileAutocompleteComponent } from '@home/components/profile/tenant-profile-autocomplete.component';
import { TenantProfileDataComponent } from '@home/components/profile/tenant-profile-data.component';
import { TenantProfileDialogComponent } from '@home/components/profile/tenant-profile-dialog.component';
import { TenantProfileComponent } from '@home/components/profile/tenant-profile.component';
import { DefaultTenantProfileConfigurationComponent } from '@home/components/profile/tenant/default-tenant-profile-configuration.component';
import { RateLimitsDetailsDialogComponent } from '@home/components/profile/tenant/rate-limits/rate-limits-details-dialog.component';
import { RateLimitsListComponent } from '@home/components/profile/tenant/rate-limits/rate-limits-list.component';
import { RateLimitsTextComponent } from '@home/components/profile/tenant/rate-limits/rate-limits-text.component';
import { RateLimitsComponent } from '@home/components/profile/tenant/rate-limits/rate-limits.component';
import { TenantProfileConfigurationComponent } from '@home/components/profile/tenant/tenant-profile-configuration.component';
import { QueueFormComponent } from '@home/components/queue/queue-form.component';
import { RelationDialogComponent } from '@home/components/relation/relation-dialog.component';
import { RelationFiltersComponent } from '@home/components/relation/relation-filters.component';
import { RelationTableComponent } from '@home/components/relation/relation-table.component';
import { RuleChainAutocompleteComponent } from '@home/components/rule-chain/rule-chain-autocomplete.component';
import { SharedHomeComponentsModule } from '@home/components/shared-home-components.module';
import { AwsSnsProviderConfigurationComponent } from '@home/components/sms/aws-sns-provider-configuration.component';
import { SmppSmsProviderConfigurationComponent } from '@home/components/sms/smpp-sms-provider-configuration.component';
import { SmsProviderConfigurationComponent } from '@home/components/sms/sms-provider-configuration.component';
import { TwilioSmsProviderConfigurationComponent } from '@home/components/sms/twilio-sms-provider-configuration.component';
import {
  COMPLEX_FILTER_PREDICATE_DIALOG_COMPONENT_TOKEN,
  DASHBOARD_PAGE_COMPONENT_TOKEN,
  HOME_COMPONENTS_MODULE_TOKEN
} from '@home/components/tokens';
import { AutoCommitSettingsComponent } from '@home/components/vc/auto-commit-settings.component';
import { ComplexVersionCreateComponent } from '@home/components/vc/complex-version-create.component';
import { ComplexVersionLoadComponent } from '@home/components/vc/complex-version-load.component';
import { EntityTypesVersionCreateComponent } from '@home/components/vc/entity-types-version-create.component';
import { EntityTypesVersionLoadComponent } from '@home/components/vc/entity-types-version-load.component';
import { EntityVersionCreateComponent } from '@home/components/vc/entity-version-create.component';
import { EntityVersionDiffComponent } from '@home/components/vc/entity-version-diff.component';
import { EntityVersionRestoreComponent } from '@home/components/vc/entity-version-restore.component';
import { EntityVersionsTableComponent } from '@home/components/vc/entity-versions-table.component';
import { RemoveOtherEntitiesConfirmComponent } from '@home/components/vc/remove-other-entities-confirm.component';
import { RepositorySettingsComponent } from '@home/components/vc/repository-settings.component';
import { VersionControlComponent } from '@home/components/vc/version-control.component';
import { CustomActionPrettyEditorComponent } from '@home/components/widget/action/custom-action-pretty-editor.component';
import { CustomActionPrettyResourcesTabsComponent } from '@home/components/widget/action/custom-action-pretty-resources-tabs.component';
import { ManageWidgetActionsComponent } from '@home/components/widget/action/manage-widget-actions.component';
import { MobileActionEditorComponent } from '@home/components/widget/action/mobile-action-editor.component';
import { WidgetActionDialogComponent } from '@home/components/widget/action/widget-action-dialog.component';
import { DataKeyConfigDialogComponent } from '@home/components/widget/data-key-config-dialog.component';
import { DataKeyConfigComponent } from '@home/components/widget/data-key-config.component';
import { DataKeysComponent } from '@home/components/widget/data-keys.component';
import { CustomDialogContainerComponent } from '@home/components/widget/dialog/custom-dialog-container.component';
import { CustomDialogService } from '@home/components/widget/dialog/custom-dialog.service';
import { EMBED_DASHBOARD_DIALOG_TOKEN } from '@home/components/widget/dialog/embed-dashboard-dialog-token';
import { EmbedDashboardDialogComponent } from '@home/components/widget/dialog/embed-dashboard-dialog.component';
import { LegendConfigComponent } from '@home/components/widget/legend-config.component';
import { LegendComponent } from '@home/components/widget/legend.component';
import { WidgetSettingsModule } from '@home/components/widget/lib/settings/widget-settings.module';
import { WidgetComponentService } from '@home/components/widget/widget-component.service';
import { WidgetConfigComponent } from '@home/components/widget/widget-config.component';
import { WidgetContainerComponent } from '@home/components/widget/widget-container.component';
import { WidgetSettingsComponent } from '@home/components/widget/widget-settings.component';
import { WidgetComponent } from '@home/components/widget/widget.component';
import { DeviceWizardDialogComponent } from '@home/components/wizard/device-wizard-dialog.component';
import { modulesMap } from '@modules/common/modules-map';
import { MODULES_MAP } from '@shared/models/constants';
import { JsonConfigurationDialogComponent } from './report/json-configuration-dialog.component';
import { ReportDialogComponent } from './report/report-dialog.component';
import { TemplateManagementDialogComponent } from './report/template-management-dialog.component';
import { TemplateUploadComponent } from './report/template-upload.component';

@NgModule({
  declarations:
    [
      JsonConfigurationDialogComponent,
      TemplateUploadComponent,
      TemplateManagementDialogComponent,
      ReportDialogComponent,
      EntitiesTableComponent,
      AddEntityDialogComponent,
      DetailsPanelComponent,
      EntityDetailsPanelComponent,
      EntityDetailsPageComponent,
      AuditLogTableComponent,
      AuditLogDetailsDialogComponent,
      EventContentDialogComponent,
      EventTableHeaderComponent,
      EventTableComponent,
      EventFilterPanelComponent,
      EdgeDownlinkTableHeaderComponent,
      EdgeDownlinkTableComponent,
      RelationTableComponent,
      RelationDialogComponent,
      RelationFiltersComponent,
      AlarmTableHeaderComponent,
      AlarmTableComponent,
      AttributeTableComponent,
      AddAttributeDialogComponent,
      EditAttributeValuePanelComponent,
      AliasesEntitySelectPanelComponent,
      AliasesEntitySelectComponent,
      AliasesEntityAutocompleteComponent,
      EntityAliasesDialogComponent,
      EntityAliasDialogComponent,
      DashboardComponent,
      WidgetContainerComponent,
      WidgetComponent,
      LegendComponent,
      WidgetSettingsComponent,
      WidgetConfigComponent,
      EntityFilterViewComponent,
      EntityFilterComponent,
      EntityAliasSelectComponent,
      DataKeysComponent,
      DataKeyConfigComponent,
      DataKeyConfigDialogComponent,
      LegendConfigComponent,
      ManageWidgetActionsComponent,
      WidgetActionDialogComponent,
      CustomActionPrettyResourcesTabsComponent,
      CustomActionPrettyEditorComponent,
      MobileActionEditorComponent,
      CustomDialogContainerComponent,
      ImportDialogComponent,
      ImportDialogCsvComponent,
      SelectTargetLayoutDialogComponent,
      SelectTargetStateDialogComponent,
      AddWidgetToDashboardDialogComponent,
      TableColumnsAssignmentComponent,
      BooleanFilterPredicateComponent,
      StringFilterPredicateComponent,
      NumericFilterPredicateComponent,
      ComplexFilterPredicateComponent,
      ComplexFilterPredicateDialogComponent,
      FilterPredicateComponent,
      FilterPredicateListComponent,
      KeyFilterListComponent,
      KeyFilterDialogComponent,
      FilterDialogComponent,
      FiltersDialogComponent,
      FilterSelectComponent,
      FilterTextComponent,
      FiltersEditComponent,
      FiltersEditPanelComponent,
      UserFilterDialogComponent,
      FilterUserInfoComponent,
      FilterUserInfoDialogComponent,
      FilterPredicateValueComponent,
      TenantProfileAutocompleteComponent,
      DefaultTenantProfileConfigurationComponent,
      TenantProfileConfigurationComponent,
      TenantProfileDataComponent,
      TenantProfileComponent,
      TenantProfileDialogComponent,
      DeviceProfileAutocompleteComponent,
      DefaultDeviceProfileConfigurationComponent,
      DeviceProfileConfigurationComponent,
      DefaultDeviceProfileTransportConfigurationComponent,
      MqttDeviceProfileTransportConfigurationComponent,
      CoapDeviceProfileTransportConfigurationComponent,
      DeviceProfileTransportConfigurationComponent,
      CreateAlarmRulesComponent,
      AlarmRuleComponent,
      AlarmRuleConditionDialogComponent,
      AlarmRuleConditionComponent,
      DeviceProfileAlarmComponent,
      DeviceProfileAlarmsComponent,
      DeviceProfileComponent,
      DeviceProfileDialogComponent,
      AddDeviceProfileDialogComponent,
      AssetProfileComponent,
      AssetProfileDialogComponent,
      AssetProfileAutocompleteComponent,
      RuleChainAutocompleteComponent,
      AlarmScheduleInfoComponent,
      DeviceProfileProvisionConfigurationComponent,
      AlarmScheduleComponent,
      AlarmDynamicValue,
      AlarmDurationPredicateValueComponent,
      DeviceWizardDialogComponent,
      AlarmScheduleDialogComponent,
      EditAlarmDetailsDialogComponent,
      SmsProviderConfigurationComponent,
      AwsSnsProviderConfigurationComponent,
      SmppSmsProviderConfigurationComponent,
      TwilioSmsProviderConfigurationComponent,
      DashboardToolbarComponent,
      DashboardPageComponent,
      DashboardStateComponent,
      DashboardLayoutComponent,
      EditWidgetComponent,
      DashboardWidgetSelectComponent,
      AddWidgetDialogComponent,
      ManageDashboardLayoutsDialogComponent,
      DashboardSettingsDialogComponent,
      ManageDashboardStatesDialogComponent,
      DashboardStateDialogComponent,
      DashboardImageDialogComponent,
      EmbedDashboardDialogComponent,
      DisplayWidgetTypesPanelComponent,
      TenantProfileQueuesComponent,
      QueueFormComponent,
      RepositorySettingsComponent,
      VersionControlComponent,
      EntityVersionsTableComponent,
      EntityVersionCreateComponent,
      EntityVersionRestoreComponent,
      EntityVersionDiffComponent,
      ComplexVersionCreateComponent,
      EntityTypesVersionCreateComponent,
      EntityTypesVersionLoadComponent,
      ComplexVersionLoadComponent,
      RemoveOtherEntitiesConfirmComponent,
      AutoCommitSettingsComponent,
      RateLimitsListComponent,
      RateLimitsComponent,
      RateLimitsTextComponent,
      RateLimitsDetailsDialogComponent
    ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    SharedModule,
    SharedHomeComponentsModule,
    WidgetSettingsModule,
    Lwm2mProfileComponentsModule,
    SnmpDeviceProfileTransportModule,
    StatesControllerModule,
    DeviceCredentialsModule,
    DeviceProfileCommonModule
  ],
  exports: [
    EntitiesTableComponent,
    AddEntityDialogComponent,
    DetailsPanelComponent,
    EntityDetailsPanelComponent,
    EntityDetailsPageComponent,
    AuditLogTableComponent,
    EventTableComponent,
    EdgeDownlinkTableHeaderComponent,
    EdgeDownlinkTableComponent,
    RelationTableComponent,
    RelationFiltersComponent,
    AlarmTableComponent,
    AttributeTableComponent,
    AliasesEntitySelectComponent,
    AliasesEntityAutocompleteComponent,
    EntityAliasesDialogComponent,
    EntityAliasDialogComponent,
    DashboardComponent,
    WidgetContainerComponent,
    WidgetComponent,
    LegendComponent,
    WidgetSettingsComponent,
    WidgetConfigComponent,
    EntityFilterViewComponent,
    EntityFilterComponent,
    EntityAliasSelectComponent,
    DataKeysComponent,
    DataKeyConfigComponent,
    DataKeyConfigDialogComponent,
    LegendConfigComponent,
    ManageWidgetActionsComponent,
    WidgetActionDialogComponent,
    CustomActionPrettyResourcesTabsComponent,
    CustomActionPrettyEditorComponent,
    MobileActionEditorComponent,
    CustomDialogContainerComponent,
    ImportDialogComponent,
    ImportDialogCsvComponent,
    TableColumnsAssignmentComponent,
    SelectTargetLayoutDialogComponent,
    SelectTargetStateDialogComponent,
    BooleanFilterPredicateComponent,
    StringFilterPredicateComponent,
    NumericFilterPredicateComponent,
    ComplexFilterPredicateComponent,
    ComplexFilterPredicateDialogComponent,
    FilterPredicateComponent,
    FilterPredicateListComponent,
    KeyFilterListComponent,
    KeyFilterDialogComponent,
    FilterDialogComponent,
    FiltersDialogComponent,
    FilterSelectComponent,
    FilterTextComponent,
    FiltersEditComponent,
    UserFilterDialogComponent,
    TenantProfileAutocompleteComponent,
    TenantProfileDataComponent,
    TenantProfileComponent,
    TenantProfileDialogComponent,
    DeviceProfileAutocompleteComponent,
    DefaultDeviceProfileConfigurationComponent,
    DeviceProfileConfigurationComponent,
    DefaultDeviceProfileTransportConfigurationComponent,
    MqttDeviceProfileTransportConfigurationComponent,
    CoapDeviceProfileTransportConfigurationComponent,
    DeviceProfileTransportConfigurationComponent,
    CreateAlarmRulesComponent,
    AlarmRuleComponent,
    AlarmRuleConditionDialogComponent,
    AlarmRuleConditionComponent,
    DeviceProfileAlarmComponent,
    DeviceProfileAlarmsComponent,
    DeviceProfileComponent,
    DeviceProfileDialogComponent,
    AddDeviceProfileDialogComponent,
    RuleChainAutocompleteComponent,
    DeviceWizardDialogComponent,
    AssetProfileComponent,
    AssetProfileDialogComponent,
    AssetProfileAutocompleteComponent,
    AlarmScheduleInfoComponent,
    AlarmScheduleComponent,
    AlarmDynamicValue,
    AlarmScheduleDialogComponent,
    AlarmDurationPredicateValueComponent,
    EditAlarmDetailsDialogComponent,
    DeviceProfileProvisionConfigurationComponent,
    SmsProviderConfigurationComponent,
    AwsSnsProviderConfigurationComponent,
    SmppSmsProviderConfigurationComponent,
    TwilioSmsProviderConfigurationComponent,
    DashboardToolbarComponent,
    DashboardPageComponent,
    DashboardStateComponent,
    DashboardLayoutComponent,
    EditWidgetComponent,
    DashboardWidgetSelectComponent,
    AddWidgetDialogComponent,
    ManageDashboardLayoutsDialogComponent,
    DashboardSettingsDialogComponent,
    ManageDashboardStatesDialogComponent,
    DashboardStateDialogComponent,
    DashboardImageDialogComponent,
    EmbedDashboardDialogComponent,
    DisplayWidgetTypesPanelComponent,
    TenantProfileQueuesComponent,
    QueueFormComponent,
    RepositorySettingsComponent,
    VersionControlComponent,
    EntityVersionsTableComponent,
    EntityVersionCreateComponent,
    EntityVersionRestoreComponent,
    EntityVersionDiffComponent,
    ComplexVersionCreateComponent,
    EntityTypesVersionCreateComponent,
    EntityTypesVersionLoadComponent,
    ComplexVersionLoadComponent,
    RemoveOtherEntitiesConfirmComponent,
    AutoCommitSettingsComponent,
    RateLimitsListComponent,
    RateLimitsComponent,
    RateLimitsTextComponent,
    RateLimitsDetailsDialogComponent
  ],
  providers: [
    WidgetComponentService,
    CustomDialogService,
    ImportExportService,
    {provide: EMBED_DASHBOARD_DIALOG_TOKEN, useValue: EmbedDashboardDialogComponent},
    {provide: COMPLEX_FILTER_PREDICATE_DIALOG_COMPONENT_TOKEN, useValue: ComplexFilterPredicateDialogComponent},
    {provide: DASHBOARD_PAGE_COMPONENT_TOKEN, useValue: DashboardPageComponent},
    {provide: HOME_COMPONENTS_MODULE_TOKEN, useValue: HomeComponentsModule },
    {provide: MODULES_MAP, useValue: modulesMap}
  ]
})
export class HomeComponentsModule { }
