import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPatientportal, Patientportal } from '../patientportal.model';
import { PatientportalService } from '../service/patientportal.service';

@Component({
  selector: 'jhi-patientportal-update',
  templateUrl: './patientportal-update.component.html',
})
export class PatientportalUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    reason: [],
    insuranceChange: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
  });

  constructor(protected patientportalService: PatientportalService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patientportal }) => {
      this.updateForm(patientportal);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const patientportal = this.createFromForm();
    if (patientportal.id !== undefined) {
      this.subscribeToSaveResponse(this.patientportalService.update(patientportal));
    } else {
      this.subscribeToSaveResponse(this.patientportalService.create(patientportal));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatientportal>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(patientportal: IPatientportal): void {
    this.editForm.patchValue({
      id: patientportal.id,
      reason: patientportal.reason,
      insuranceChange: patientportal.insuranceChange,
      phoneNumber: patientportal.phoneNumber,
    });
  }

  protected createFromForm(): IPatientportal {
    return {
      ...new Patientportal(),
      id: this.editForm.get(['id'])!.value,
      reason: this.editForm.get(['reason'])!.value,
      insuranceChange: this.editForm.get(['insuranceChange'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
    };
  }
}
