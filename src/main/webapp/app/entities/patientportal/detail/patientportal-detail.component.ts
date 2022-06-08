import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPatientportal } from '../patientportal.model';

@Component({
  selector: 'jhi-patientportal-detail',
  templateUrl: './patientportal-detail.component.html',
})
export class PatientportalDetailComponent implements OnInit {
  patientportal: IPatientportal | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patientportal }) => {
      this.patientportal = patientportal;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
