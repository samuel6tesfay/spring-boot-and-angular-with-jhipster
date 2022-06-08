import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPatientportal, Patientportal } from '../patientportal.model';
import { PatientportalService } from '../service/patientportal.service';

@Injectable({ providedIn: 'root' })
export class PatientportalRoutingResolveService implements Resolve<IPatientportal> {
  constructor(protected service: PatientportalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPatientportal> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((patientportal: HttpResponse<Patientportal>) => {
          if (patientportal.body) {
            return of(patientportal.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Patientportal());
  }
}
