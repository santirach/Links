import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UrlInterface, UrlResponseInterface } from '../interface/url/url.interface';



@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    getUser(id: string): Observable<UrlResponseInterface> {
        return this.httpClient.get<UrlResponseInterface>(`${environment.pathAPI}/user/${id}`).pipe(
            map((res: UrlResponseInterface) => res)
        );
    }


}
