import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/')) {
    const apiReq = req.clone({
      url: `${environment.apiBaseUrl}${req.url}`
    });
    return next(apiReq);
  }
  return next(req);
};