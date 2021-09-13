import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class ApiInterceptor {
    tokenVal : any;
    constructor(
    ) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url } = req;
        if (url.indexOf('/login') > -1 || url.indexOf('/registration') > -1 || url.indexOf('/checktokenvalidity') > -1 ||
            url.indexOf('/forgotpassword') > -1 || url.indexOf('/completeRegistration') > -1 || url.indexOf('/resetpassword') > -1 || url.indexOf('/confirmregistration') > -1
            || url.indexOf('/user/changepassword') > -1 || url.indexOf('/token/validate') > -1) {

            return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                }
            }));
        }

    }

}
