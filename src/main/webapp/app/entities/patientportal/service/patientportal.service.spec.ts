import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPatientportal, Patientportal } from '../patientportal.model';

import { PatientportalService } from './patientportal.service';

describe('Patientportal Service', () => {
  let service: PatientportalService;
  let httpMock: HttpTestingController;
  let elemDefault: IPatientportal;
  let expectedResult: IPatientportal | IPatientportal[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PatientportalService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      reason: 'AAAAAAA',
      insuranceChange: 'AAAAAAA',
      phoneNumber: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Patientportal', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Patientportal()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Patientportal', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          reason: 'BBBBBB',
          insuranceChange: 'BBBBBB',
          phoneNumber: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Patientportal', () => {
      const patchObject = Object.assign(
        {
          insuranceChange: 'BBBBBB',
          phoneNumber: 1,
        },
        new Patientportal()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Patientportal', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          reason: 'BBBBBB',
          insuranceChange: 'BBBBBB',
          phoneNumber: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Patientportal', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPatientportalToCollectionIfMissing', () => {
      it('should add a Patientportal to an empty array', () => {
        const patientportal: IPatientportal = { id: 123 };
        expectedResult = service.addPatientportalToCollectionIfMissing([], patientportal);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(patientportal);
      });

      it('should not add a Patientportal to an array that contains it', () => {
        const patientportal: IPatientportal = { id: 123 };
        const patientportalCollection: IPatientportal[] = [
          {
            ...patientportal,
          },
          { id: 456 },
        ];
        expectedResult = service.addPatientportalToCollectionIfMissing(patientportalCollection, patientportal);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Patientportal to an array that doesn't contain it", () => {
        const patientportal: IPatientportal = { id: 123 };
        const patientportalCollection: IPatientportal[] = [{ id: 456 }];
        expectedResult = service.addPatientportalToCollectionIfMissing(patientportalCollection, patientportal);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(patientportal);
      });

      it('should add only unique Patientportal to an array', () => {
        const patientportalArray: IPatientportal[] = [{ id: 123 }, { id: 456 }, { id: 44038 }];
        const patientportalCollection: IPatientportal[] = [{ id: 123 }];
        expectedResult = service.addPatientportalToCollectionIfMissing(patientportalCollection, ...patientportalArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const patientportal: IPatientportal = { id: 123 };
        const patientportal2: IPatientportal = { id: 456 };
        expectedResult = service.addPatientportalToCollectionIfMissing([], patientportal, patientportal2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(patientportal);
        expect(expectedResult).toContain(patientportal2);
      });

      it('should accept null and undefined values', () => {
        const patientportal: IPatientportal = { id: 123 };
        expectedResult = service.addPatientportalToCollectionIfMissing([], null, patientportal, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(patientportal);
      });

      it('should return initial array if no Patientportal is added', () => {
        const patientportalCollection: IPatientportal[] = [{ id: 123 }];
        expectedResult = service.addPatientportalToCollectionIfMissing(patientportalCollection, undefined, null);
        expect(expectedResult).toEqual(patientportalCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
