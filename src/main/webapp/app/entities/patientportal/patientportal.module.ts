import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PatientportalComponent } from './list/patientportal.component';
import { PatientportalDetailComponent } from './detail/patientportal-detail.component';
import { PatientportalUpdateComponent } from './update/patientportal-update.component';
import { PatientportalDeleteDialogComponent } from './delete/patientportal-delete-dialog.component';
import { PatientportalRoutingModule } from './route/patientportal-routing.module';

@NgModule({
  imports: [SharedModule, PatientportalRoutingModule],
  declarations: [PatientportalComponent, PatientportalDetailComponent, PatientportalUpdateComponent, PatientportalDeleteDialogComponent],
  entryComponents: [PatientportalDeleteDialogComponent],
})
export class PatientportalModule {}
