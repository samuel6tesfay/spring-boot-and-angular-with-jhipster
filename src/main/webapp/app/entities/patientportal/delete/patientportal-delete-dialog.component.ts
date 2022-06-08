import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPatientportal } from '../patientportal.model';
import { PatientportalService } from '../service/patientportal.service';

@Component({
  templateUrl: './patientportal-delete-dialog.component.html',
})
export class PatientportalDeleteDialogComponent {
  patientportal?: IPatientportal;

  constructor(protected patientportalService: PatientportalService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.patientportalService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
