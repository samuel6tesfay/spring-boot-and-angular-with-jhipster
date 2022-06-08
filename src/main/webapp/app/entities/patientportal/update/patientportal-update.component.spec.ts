import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PatientportalService } from '../service/patientportal.service';
import { IPatientportal, Patientportal } from '../patientportal.model';

import { PatientportalUpdateComponent } from './patientportal-update.component';

describe('Patientportal Management Update Component', () => {
  let comp: PatientportalUpdateComponent;
  let fixture: ComponentFixture<PatientportalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let patientportalService: PatientportalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PatientportalUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PatientportalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PatientportalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    patientportalService = TestBed.inject(PatientportalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const patientportal: IPatientportal = { id: 456 };

      activatedRoute.data = of({ patientportal });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(patientportal));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Patientportal>>();
      const patientportal = { id: 123 };
      jest.spyOn(patientportalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ patientportal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: patientportal }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(patientportalService.update).toHaveBeenCalledWith(patientportal);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Patientportal>>();
      const patientportal = new Patientportal();
      jest.spyOn(patientportalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ patientportal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: patientportal }));
      saveSubject.complete();

      // THEN
      expect(patientportalService.create).toHaveBeenCalledWith(patientportal);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Patientportal>>();
      const patientportal = { id: 123 };
      jest.spyOn(patientportalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ patientportal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(patientportalService.update).toHaveBeenCalledWith(patientportal);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
