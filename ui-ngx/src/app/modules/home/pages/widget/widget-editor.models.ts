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

import { TbEditorCompleter, TbEditorCompletions } from '@shared/models/ace/completion.models';
import { serviceCompletions } from '@shared/models/ace/service-completion.models';
import { widgetContextCompletions } from '@shared/models/ace/widget-completion.models';

const widgetEditorCompletions: TbEditorCompletions = {
  ... {self: {
    description: 'Built-in variable <b>self</b> that is a reference to the widget instance',
    type: '<a href="https://github.com/thingsboard/thingsboard/blob/13e6b10b7ab830e64d31b99614a9d95a1a25928a/ui-ngx/src/app/modules/home/models/widget-component.models.ts#L350">WidgetTypeInstance</a>',
    meta: 'object',
    children: {
      ...{
        onInit: {
          description: 'The first function which is called when widget is ready for initialization.<br>Should be used to prepare widget DOM, process widget settings and initial subscription information.',
          meta: 'function'
        },
        onDataUpdated: {
          description: 'Called when the new data is available from the widget subscription.<br>Latest data can be accessed from ' +
            'the <code>defaultSubscription</code> property of <a href="https://github.com/thingsboard/thingsboard/blob/13e6b10b7ab830e64d31b99614a9d95a1a25928a/ui-ngx/src/app/modules/home/models/widget-component.models.ts#L83">widget context (<code>ctx</code>)</a>.',
          meta: 'function'
        },
        onResize: {
          description: 'Called when widget container is resized. Latest <code>width</code> and <code>height</code> can be obtained from <a href="https://github.com/thingsboard/thingsboard/blob/13e6b10b7ab830e64d31b99614a9d95a1a25928a/ui-ngx/src/app/modules/home/models/widget-component.models.ts#L83">widget context (<code>ctx</code>)</a>.',
          meta: 'function'
        },
        onEditModeChanged: {
          description: 'Called when dashboard editing mode is changed. Latest mode is handled by <code>isEdit</code> property of <a href="https://github.com/thingsboard/thingsboard/blob/13e6b10b7ab830e64d31b99614a9d95a1a25928a/ui-ngx/src/app/modules/home/models/widget-component.models.ts#L83">widget context (<code>ctx</code>)</a>.',
          meta: 'function'
        },
        onMobileModeChanged: {
          description: 'Called when dashboard view width crosses mobile breakpoint. Latest state is handled by <code>isMobile</code> property of <a href="https://github.com/thingsboard/thingsboard/blob/13e6b10b7ab830e64d31b99614a9d95a1a25928a/ui-ngx/src/app/modules/home/models/widget-component.models.ts#L83">widget context (<code>ctx</code>)</a>.',
          meta: 'function'
        },
        onDestroy: {
          description: 'Called when widget element is destroyed. Should be used to cleanup all resources if necessary.',
          meta: 'function'
        },
        getSettingsSchema: {
          description: 'Optional function returning widget settings schema json as alternative to <b>Settings tab</b> of <a href="https://docs.yiqisoft.cn/YiCONNECT/administration-ui/widgets/">Settings schema section</a>.',
          meta: 'function',
          return: {
            description: 'An widget settings schema json',
            type: 'object'
          }
        },
        getDataKeySettingsSchema: {
          description: 'Optional function returning particular data key settings schema json as alternative to <b>Data key settings schema</b> of <a href="https://docs.yiqisoft.cn/YiCONNECT/administration-ui/widgets/">Settings schema section</a>.',
          meta: 'function',
          return: {
            description: 'A particular data key settings schema json',
            type: 'object'
          }
        },
        typeParameters: {
          description: 'Returns object describing widget datasource parameters.',
          meta: 'function',
          return: {
            description: 'An object describing widget datasource parameters.',
            type: '<a href="https://github.com/thingsboard/thingsboard/blob/13e6b10b7ab830e64d31b99614a9d95a1a25928a/ui-ngx/src/app/shared/models/widget.models.ts#L146">WidgetTypeParameters</a>'
          }
        },
        actionSources: {
          description: 'Returns map describing available widget action sources used to define user actions.',
          meta: 'function',
          return: {
            description: 'A map of action sources by action source id.',
            type: '{[actionSourceId: string]: <a href="https://github.com/thingsboard/thingsboard/blob/13e6b10b7ab830e64d31b99614a9d95a1a25928a/ui-ngx/src/app/shared/models/widget.models.ts#L118">WidgetActionSource</a>}'
          }
        }
      },
      ...widgetContextCompletions
    }
  }},
  ...widgetContextCompletions,
  ...serviceCompletions
};

export const widgetEditorCompleter = new TbEditorCompleter(widgetEditorCompletions);
