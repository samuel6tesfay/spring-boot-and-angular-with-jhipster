import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PatientportalComponent } from '../list/patientportal.component';
import { PatientportalDetailComponent } from '../detail/patientportal-detail.component';
import { PatientportalUpdateComponent } from '../update/patientportal-update.component';
import { PatientportalRoutingResolveService } from './patientportal-routing-resolve.service';

const patientportalRoute: Routes = [
  {
    path: '',
    component: PatientportalComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PatientportalDetailComponent,
    resolve: {
      patientportal: PatientportalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PatientportalUpdateComponent,
    resolve: {
      patientportal: PatientportalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PatientportalUpdateComponent,
    resolve: {
      patientportal: PatientportalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(patientportalRoute)],
  exports: [RouterModule],
})
export class PatientportalRoutingModule {}
