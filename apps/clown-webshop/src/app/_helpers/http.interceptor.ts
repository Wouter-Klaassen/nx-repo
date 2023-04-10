import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_service/storage.service'; 

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private storageService : StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storageService.getToken();
        console.log('JSON: ' + token)
        console.log(typeof(token))
        console.log('token: ' + token?.token);

        req = req.clone({
            headers: req.headers.set('Authorization', `${token?.token}`),
        });

    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];