import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UrlInterface, UrlResponseInterface } from '../interface/url/url.interface';



@Injectable({
    providedIn: 'root',
})
export class UrlService {

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    saveUrl(url: UrlInterface): Observable<UrlResponseInterface> {
        return this.httpClient.post<UrlResponseInterface>(`${environment.pathAPI}/links`, url).pipe(
            map((res: UrlResponseInterface) => res)
        );
    }

    getUrl() {
        return this.httpClient.get<Array<UrlResponseInterface>>(`${environment.pathAPI}/links`).pipe(
            map((res: Array<UrlResponseInterface>) => res)
        );
    }

    deleteUrl(id: string): Observable<UrlResponseInterface> {
        return this.httpClient.delete<UrlResponseInterface>(`${environment.pathAPI}/links/${id}`).pipe(
            map((res: UrlResponseInterface) => res)
        );
    }


}
