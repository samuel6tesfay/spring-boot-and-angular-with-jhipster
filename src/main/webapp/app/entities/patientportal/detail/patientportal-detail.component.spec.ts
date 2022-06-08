import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientportalDetailComponent } from './patientportal-detail.component';

describe('Patientportal Management Detail Component', () => {
  let comp: PatientportalDetailComponent;
  let fixture: ComponentFixture<PatientportalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientportalDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ patientportal: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PatientportalDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PatientportalDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load patientportal on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.patientportal).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
