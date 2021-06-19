import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractStorage } from './storage/abstract-storage';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly storage: AbstractStorage
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.storage.get('accessToken')}`,
      },
    });

    return next.handle(req);
  }
}