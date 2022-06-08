import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPatientportal } from '../patientportal.model';
import { PatientportalService } from '../service/patientportal.service';
import { PatientportalDeleteDialogComponent } from '../delete/patientportal-delete-dialog.component';

@Component({
  selector: 'jhi-patientportal',
  templateUrl: './patientportal.component.html',
})
export class PatientportalComponent implements OnInit {
  patientportals?: IPatientportal[];
  isLoading = false;

  constructor(protected patientportalService: PatientportalService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.patientportalService.query().subscribe({
      next: (res: HttpResponse<IPatientportal[]>) => {
        this.isLoading = false;
        this.patientportals = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPatientportal): number {
    return item.id!;
  }

  delete(patientportal: IPatientportal): void {
    const modalRef = this.modalService.open(PatientportalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.patientportal = patientportal;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
