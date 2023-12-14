import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityType } from '@app/shared/models/entity-type.models';
import { ReportInfo } from '@app/shared/models/report.models';
import { PageData } from '@shared/models/page/page-data';
import { PageLink } from '@shared/models/page/page-link';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  httpResponse: any;

  constructor(
    private http: HttpClient
  ) { }

  public zipUpload(file: File, reportType: string, templateName: string) {
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders();
    headers.set('Content-Type', undefined);
    return this.http.post(`report/uploadZip?type=${reportType}&templateName=${templateName}`, formData, { headers });
  }

  templateUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.set('Content-Type', undefined);
    return this.http.post<any>('/report/parseTemplate', formData, { headers });
  }

  public getTemplateList(reportType: string): Observable<TemplateResponse> {
    const apiUrl = `template/list?type=${reportType}&page=0&size=3000`;
    return this.http.get<TemplateResponse>(apiUrl);
  }

  // public getTenantTemplateList(reportType: string,pageLink: PageLink): Observable<PageData<ReportInfo>> {
  //   const apiUrl = `template/list?type=${reportType}&page=${pageLink.page}&size=${pageLink.pageSize}`;
  //   return this.http.get<PageData<ModifiedReportInfo>>(apiUrl)
  //     .pipe(
  //       map(responseData => {
  //         console.log('原始数据：', responseData);
  //         const modifiedData = responseData.data.map(item => ({
  //           ...item,
  //           id: {
  //             entityType: EntityType.REPORT,
  //             id: item.templateId
  //           },
  //           // createdTime: item.createTime
  //         }));
  //         console.log('修改后的数据：', modifiedData);

  //         // 创建新的 PageData 对象
  //         const modifiedPageData: PageData<ReportInfo> = {
  //           data: modifiedData,
  //           totalPages: responseData.totalPages,
  //           totalElements: responseData.totalElements,
  //           hasNext: responseData.hasNext
  //         };
  //         console.log('返回的PageData：', modifiedPageData);
  //         return modifiedPageData;
  //       })
  //     );
  // }

  public getTenantReportList(pageLink: PageLink, reportType?: string): Observable<PageData<ReportInfo>> {
    const apiUrl = `template/reportList?page=${pageLink.page}&size=${pageLink.pageSize}&type=${reportType}`;
    return this.http.get<ApiResponse<ModifiedReportInfo>>(apiUrl)
      .pipe(
        map(responseData => {
          console.log('原始数据：', responseData);
          console.log('原始数据分页：', responseData.data.totalElements);
          const modifiedData = responseData.data.content.map(item => ({
            ...item,
            id: {
              entityType: EntityType.REPORT,
              id: item.reportId
            },
          }));
          console.log('修改后的数据：', modifiedData);

          // 创建一个新的 PageData 对象
          const modifiedPageData: PageData<ReportInfo> = {
            data: modifiedData,
            totalPages: responseData.data.totalPages,
            totalElements: responseData.data.totalElements,
            hasNext: responseData.data.hasNext
          };
          console.log('返回的PageData：', modifiedPageData);
          return modifiedPageData;
        })
      );
  }

  viewReport(reportId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`template/reportView/${reportId}`, { observe: 'response', responseType: 'blob' });
  }

  deleteReport(reportId: string): Observable<TemplateResponse> {
    return this.http.delete<TemplateResponse>(`template/deleteReport/${reportId}`);
  }

  deleteTemplate(templateId: string): Observable<TemplateResponse> {
    return this.http.delete<TemplateResponse>(`template/${templateId}`);
  }

  downloadTemplate(templateId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`template/download/${templateId}`, { observe: 'response', responseType: 'blob' });
  }

  generatePdfReport(reportType: string, reportTitle: string, version: string, uuid?: string): Observable<Blob> {
    let url = `/report/selectVersion?reportTitle=${reportTitle}&reportType=${reportType}&version=${version}`;
    if (uuid) {
      url += `&uuid=${uuid}`;
    }
    return this.http.post(url, null, { responseType: 'blob' });
  }

  getEntityNames(): Observable<any> {
    return this.http.get('report/getEntityNames');
  }

  getDataFields(entityType: string, uuid?: string): Observable<any> {
    let url = `report/getDataFields?type=${entityType}`
    if (uuid) {
      url += `&entityId=${uuid}`;
    }
    return this.http.get(url);
  }

  jsonGenerate(combinedData: any): Observable<Blob> {
    const url = '/report/templateConfigGenerator';
    return this.http.post(url, combinedData, { responseType: 'blob' });
  }

}


interface TemplateResponse {
  status: number;
  message: string;
  data: Template[];
}

interface Template {
  templateId: string;
  templateType: string;
  templateName: string;
  fileData: string;
  versionControl: string;
  createTime: string;
}
interface ModifiedReportInfo0 {
  id: {
    entityType: EntityType;
    id: string;
  };
  // createdTime: string;
  templateType: string;
  templateName: string;
  fileData: string;
  versionControl: string;
  createTime: string;
  name: string;
  type: string;
  label: string;
  reportInfo?: string;
  additionalInfo?: any;
  reportTitle: string;
  reportType: string;
  version: string;
  templateId: string;
  customerTitle: string;
  customerIsPublic: boolean;
}

interface ModifiedReportInfo {
  id: {
    entityType: EntityType;
    id: string;
  };
  templateType: string;
  templateName: string;
  fileData: string;
  versionControl: string;
  createTime: string;
  name: string;
  type: string;
  label: string;
  reportInfo?: string;
  additionalInfo?: any;
  reportTitle: string;
  reportType: string;
  version: string;
  templateId: string;
  customerTitle: string;
  customerIsPublic: boolean;
  reportId: string
}

interface ApiResponse<T> {
  data: {
    content: T[];
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
  };
}