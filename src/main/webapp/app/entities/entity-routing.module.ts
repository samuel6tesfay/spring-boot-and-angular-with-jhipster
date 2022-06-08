import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'patientportal',
        data: { pageTitle: 'Patientportals' },
        loadChildren: () => import('./patientportal/patientportal.module').then(m => m.PatientportalModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
