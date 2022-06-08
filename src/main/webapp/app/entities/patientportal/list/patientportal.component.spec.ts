import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PatientportalService } from '../service/patientportal.service';

import { PatientportalComponent } from './patientportal.component';

describe('Patientportal Management Component', () => {
  let comp: PatientportalComponent;
  let fixture: ComponentFixture<PatientportalComponent>;
  let service: PatientportalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PatientportalComponent],
    })
      .overrideTemplate(PatientportalComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PatientportalComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PatientportalService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.patientportals?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
