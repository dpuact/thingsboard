
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService } from '@app/core/http/report.service';

@Component({
    selector: 'app-json-configuration-dialog',
    templateUrl: './json-configuration-dialog.component.html',
    styleUrls: ['./json-configuration-dialog.component.scss']
})
export class JsonConfigurationDialogComponent {
    @ViewChild('deviceMenuItem') deviceMenuItem;
    @ViewChild('customerMenuItem') customerMenuItem;
    @ViewChild('assetMenuItem') assetMenuItem;
    @ViewChild('deviceSubMenu') deviceSubMenu;
    @ViewChild('customerSubMenu') customerSubMenu;
    @ViewChild('assetSubMenu') assetSubMenu;
    @ViewChild('subMenu') subMenu: MatMenuTrigger;

    manualInputValue: string = '';
    showManualInput: boolean = false;
    listData: { [key: string]: { key: string, value: string }[] } = {};
    filteredData: string[] = [];
    filteredDataFields: string[] = [];

    transformedData: any;
    dataStructure: any = {
        parameters: {},
        fields: {},
        dataSources: {
            line_params: {}
        },
        images: {}
    };
    selectedKey: string;  // 用于存储左侧选项
    selectedValue: string;  // 用于存储右侧选项

    filteredOptions: string[];

    selectedValueLeft: string;
    selectedValueRight: string;
    keyValuePairs: { key: string, value: string }[] = [];
    parameterPairs: { key: string, value: string }[] = [];
    fieldPairs: { key: string, value: string }[] = [];
    dataSourcePairs: { key: string, value: string }[] = [];
    imagePairs: { key: string, value: string }[] = [];
    selectedUuid: string;
    selectedEntity: string; // 存储第一个菜单的选择
    subMenuItems: string[] = []; // 存储第二个菜单的内容

    deviceNames: string[] = [];
    assetNames: string[] = [];
    customerNames: string[] = [];

    submenuItems: string[] = [];
    selectedOptionRight: string = ''; // 选中的主菜单选项
    showSubMenu: boolean = false; // 控制子菜单显示
    subMenuOptions: string[] = []; // 子菜单选项
    @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;

    subMenus: { [key: string]: string[] } = {};

    entityNames: { key: string, value: string[] }[];

    dataFields: any[];
    response: any;
    data: string[] = [];
    leftDropdownOptions: string[] = ['Parameters', 'Fields', 'DataSource', 'Images'];
    rightDropdownOptions: string[] = ['Device', 'Asset', 'Customer'];
    selectedFileName: string;
    selectedOptionLeft: string;
    leftListItems: string[] = [];
    rightListItems: string[] = [];
    centerListItems: string[] = [];

    constructor(
        private snackBar: MatSnackBar,
        private reportService: ReportService, public dialogRef: MatDialogRef<JsonConfigurationDialogComponent>) {
        // 初始化列表数据
        this.leftDropdownOptions.forEach(option => {
            this.listData[option] = [];
        });
    }

    ngOnInit() {
        this.getEntityNames();
    }


    closeDialog() {
        this.dialogRef.close();
    }

    onFileSelected(fileInput: HTMLInputElement) {
        const file = fileInput.files[0];
        if (file) {
            this.reportService.templateUpload(file).subscribe(
                (response) => {
                    console.log('File uploaded successfully:', response);
                    // 处理上传成功后的逻辑
                    if (response && response.data) {
                        this.response = response; // 将响应数据存储在属性中
                        this.data = response.data[0][this.selectedOptionLeft];
                    }
                },
                (error) => {
                    this.showSnackBar('File parsed failed. Please try again.');
                    console.error('File upload failed:', error);
                }
            );
        }
    }
    showSnackBar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
        });
    }


    // 当下拉菜单选项改变时调用
    onLeftDropdownChange() {
        if (this.selectedOptionLeft && this.response) {
            const selectedData = this.response.data.find(item => item.hasOwnProperty(this.selectedOptionLeft));
            if (selectedData) {
                this.data = [];
                if (this.selectedOptionLeft === 'DataSource' && selectedData['DataSource']) {
                    const dataSource = selectedData['DataSource'];
                    for (const key of Object.keys(dataSource)) {
                        if (Array.isArray(dataSource[key])) {
                            this.data.push(...dataSource[key].map(value => key + ':' + value));
                        }
                    }
                } else if (Array.isArray(selectedData[this.selectedOptionLeft])) {
                    this.data = selectedData[this.selectedOptionLeft];
                }
            } else {
                this.data = [];
            }
            this.filteredData = this.data;
            console.log('Selected option:', this.selectedOptionLeft);
            console.log('data:', this.data);
        } else {
            this.data = [];
            this.filteredData = [];
        }
    }

    getEntityNames() {
        this.reportService.getEntityNames().subscribe(
            (response) => {
                if (response && response.data) {
                    const entityData = response.data;

                    entityData.forEach((item: any) => {
                        if (item.Device) {
                            this.deviceNames = [{ name: 'General Device' }, ...item.Device];
                        }
                        if (item.Asset) {
                            this.assetNames = [{ name: 'General Asset' }, ...item.Asset];
                        }
                        if (item.Customer) {
                            this.customerNames = [{ name: 'General Customer' }, ...item.Customer];
                        }
                    });

                    console.log("Device Names:", this.deviceNames);
                    console.log("Asset Names:", this.assetNames);
                    console.log("Customer Names:", this.customerNames);
                }
            },
            (error) => {
                console.error('Error fetching entity names:', error);
                if (error.error) {
                    const errorMessage = error.error.message;
                    console.error('获取实体类名称失败：', errorMessage);
                    alert('获取实体类名称失败：' + errorMessage);
                } else {
                    console.error('获取实体类名称失败：', error);
                    alert('获取实体类名称失败');
                }
            }
        );
    }

    getDataFields(item: any, entityType: string) {
        console.log("Selected UUID:", this.selectedUuid);
        this.reportService.getDataFields(entityType, item.uuid).subscribe(
            (response) => {
                if (response && response.data) {
                    this.dataFields = response.data;
                    this.filteredDataFields = this.dataFields;
                    console.log("entityNames:", this.dataFields);
                }
            },
            (error) => {
                if (error.error) {
                    const errorMessage = error.error.message;
                    console.error('获取实体字段属性失败：', errorMessage);
                    alert('获取实体字段属性失败：' + errorMessage);
                } else {
                    console.error('获取实体字段属性失败：', error);
                    alert('获取实体字段属性失败');
                }
            }
        );
    }


    jsonGenerate() {
        if (
            this.parameterPairs.length === 0 &&
            this.fieldPairs.length === 0 &&
            this.dataSourcePairs.length === 0 &&
            this.imagePairs.length === 0
        ) {
            alert('绑定关系不能为空')
        } else {
            // 创建一个空的 JSON 对象
            const combinedData = {};

            // 添加参数数据
            if (this.parameterPairs.length > 0) {
                combinedData['parameters'] = {};
                this.parameterPairs.forEach(pair => {
                    combinedData['parameters'][pair.key] = pair.value;
                });
            }

            // 添加字段数据
            if (this.fieldPairs.length > 0) {
                combinedData['fields'] = {};
                this.fieldPairs.forEach(pair => {
                    combinedData['fields'][pair.key] = pair.value;
                });
            }

            // 添加数据源数据
            if (this.dataSourcePairs.length > 0) {
                combinedData['dataSources'] = {};
                this.dataSourcePairs.forEach(pair => {
                    const [dataSourceName, dataSourceKey] = pair.key.split(':');
                    if (!combinedData['dataSources'][dataSourceName]) {
                        combinedData['dataSources'][dataSourceName] = {};
                    }
                    combinedData['dataSources'][dataSourceName][dataSourceKey] = pair.value;
                });
            }

            // 添加图像数据
            if (this.imagePairs.length > 0) {
                combinedData['images'] = {};
                this.imagePairs.forEach(pair => {
                    combinedData['images'][pair.key] = pair.value;;
                });
            }

            // 打印到控制台
            console.log('Combined Data:', combinedData);

            this.reportService.jsonGenerate(combinedData).subscribe((data: Blob) => {
                const blob = new Blob([data], { type: 'text/plain' });
                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.download = 'templateConfig.text';
                downloadLink.click();
            }, (error) => {
                if (error.error) {
                    const errorMessage = error.error.message;
                    console.error('获取实体字段属性失败：', errorMessage);
                    alert('获取实体字段属性失败：' + errorMessage);
                } else {
                    console.error('获取实体字段属性失败：', error);
                    alert('获取实体字段属性失败');
                }
            });
        }

    }

    onLeftListSelect(value: string) {
        this.selectedValueLeft = value;
    }

    onRightListSelect(value: string) {
        this.selectedValueRight = value;
    }

    onBindClick() {
        if (this.selectedValueLeft && this.selectedValueRight) {
            const option = this.selectedOptionLeft;

            switch (option) {
                case 'Parameters':
                    // 查找中间列表中是否已经存在相同的键
                    const existingParametersPairIndex = this.parameterPairs.findIndex(pair => pair.key === this.selectedValueLeft);
                    if (existingParametersPairIndex !== -1) {
                        // 如果存在，更新值
                        this.parameterPairs[existingParametersPairIndex].value = this.selectedValueRight;
                    } else {
                        // 否则，添加新的键值对
                        this.parameterPairs.push({
                            key: this.selectedValueLeft,
                            value: this.selectedValueRight,
                        });
                    }
                    break;
                case 'Fields':
                    // 查找中间列表中是否已经存在相同的键
                    const existingFieldsPairIndex = this.fieldPairs.findIndex(pair => pair.key === this.selectedValueLeft);
                    if (existingFieldsPairIndex !== -1) {
                        // 如果存在，更新值
                        this.fieldPairs[existingFieldsPairIndex].value = this.selectedValueRight;
                    } else {
                        // 否则，添加新的键值对
                        this.fieldPairs.push({
                            key: this.selectedValueLeft,
                            value: this.selectedValueRight,
                        });
                    }
                    break;
                case 'DataSource':
                    // 查找中间列表中是否已经存在相同的键
                    const existingDataSourcePairIndex = this.dataSourcePairs.findIndex(pair => pair.key === this.selectedValueLeft);
                    if (existingDataSourcePairIndex !== -1) {
                        // 如果存在，更新值
                        this.dataSourcePairs[existingDataSourcePairIndex].value = this.selectedValueRight;
                    } else {
                        // 否则，添加新的键值对
                        this.dataSourcePairs.push({
                            key: this.selectedValueLeft,
                            value: this.selectedValueRight,
                        });
                    }
                    break;
                case 'Images':
                    // 查找中间列表中是否已经存在相同的键
                    const existingImagesPairIndex = this.imagePairs.findIndex(pair => pair.key === this.selectedValueLeft);
                    if (existingImagesPairIndex !== -1) {
                        // 如果存在，更新值
                        this.imagePairs[existingImagesPairIndex].value = this.selectedValueRight;
                    } else {
                        // 否则，添加新的键值对
                        this.imagePairs.push({
                            key: this.selectedValueLeft,
                            value: this.selectedValueRight,
                        });
                    }
                    break;
            }
        } else {
            alert('请从两侧列表各选一值')
        }
    }

    onDeleteClick(pair: { key: string, value: string }) {
        const parametersIndex = this.parameterPairs.indexOf(pair);
        if (parametersIndex !== -1) {
            this.parameterPairs.splice(parametersIndex, 1);
        }

        const fieldsIndex = this.fieldPairs.indexOf(pair);
        if (fieldsIndex !== -1) {
            this.fieldPairs.splice(fieldsIndex, 1);
        }

        const dataSourceIndex = this.dataSourcePairs.indexOf(pair);
        if (dataSourceIndex !== -1) {
            this.dataSourcePairs.splice(dataSourceIndex, 1);
        }

        const imagesIndex = this.imagePairs.indexOf(pair);
        if (imagesIndex !== -1) {
            this.imagePairs.splice(imagesIndex, 1);
        }
    }


    toggleDisplayMode() {
        this.showManualInput = !this.showManualInput;
    }

    onManualInputChange() {
        // 当手动输入框内容发生变化时，将 manualInputValue 分配给 selectedValueRight
        this.selectedValueRight = this.manualInputValue;
    }

    onSearchTemplateFields(searchTerm: string) {
        console.log('', this.filteredData);
        console.log('', searchTerm);
        if (searchTerm) {
            this.filteredData = this.data.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log('', this.filteredData);
        } else {
            // 如果没有输入关键字，不进行过滤，仍显示所有数据
            this.filteredData = this.data;
        }
    }

    onSearchDataFields(searchTerm: string) {
        console.log('', this.filteredData);
        console.log('', searchTerm);
        if (searchTerm) {
            this.filteredDataFields = this.dataFields.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log('', this.filteredDataFields);
        } else {
            // 如果没有输入关键字，不进行过滤，仍显示所有数据
            this.filteredDataFields = this.dataFields;
        }
    }

    onInputChange() {
        if (this.selectedValueLeft) {
            // 输入框有内容，将提示文本隐藏
            this.selectedValueLeft = this.selectedValueLeft.trim();
        }
    }


}


