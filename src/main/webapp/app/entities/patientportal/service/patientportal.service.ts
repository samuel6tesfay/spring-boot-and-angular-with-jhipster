import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPatientportal, getPatientportalIdentifier } from '../patientportal.model';

export type EntityResponseType = HttpResponse<IPatientportal>;
export type EntityArrayResponseType = HttpResponse<IPatientportal[]>;

@Injectable({ providedIn: 'root' })
export class PatientportalService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/patientportals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(patientportal: IPatientportal): Observable<EntityResponseType> {
    return this.http.post<IPatientportal>(this.resourceUrl, patientportal, { observe: 'response' });
  }

  update(patientportal: IPatientportal): Observable<EntityResponseType> {
    return this.http.put<IPatientportal>(`${this.resourceUrl}/${getPatientportalIdentifier(patientportal) as number}`, patientportal, {
      observe: 'response',
    });
  }

  partialUpdate(patientportal: IPatientportal): Observable<EntityResponseType> {
    return this.http.patch<IPatientportal>(`${this.resourceUrl}/${getPatientportalIdentifier(patientportal) as number}`, patientportal, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPatientportal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPatientportal[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPatientportalToCollectionIfMissing(
    patientportalCollection: IPatientportal[],
    ...patientportalsToCheck: (IPatientportal | null | undefined)[]
  ): IPatientportal[] {
    const patientportals: IPatientportal[] = patientportalsToCheck.filter(isPresent);
    if (patientportals.length > 0) {
      const patientportalCollectionIdentifiers = patientportalCollection.map(
        patientportalItem => getPatientportalIdentifier(patientportalItem)!
      );
      const patientportalsToAdd = patientportals.filter(patientportalItem => {
        const patientportalIdentifier = getPatientportalIdentifier(patientportalItem);
        if (patientportalIdentifier == null || patientportalCollectionIdentifiers.includes(patientportalIdentifier)) {
          return false;
        }
        patientportalCollectionIdentifiers.push(patientportalIdentifier);
        return true;
      });
      return [...patientportalsToAdd, ...patientportalCollection];
    }
    return patientportalCollection;
  }
}
