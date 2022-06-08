export interface IPatientportal {
  id?: number;
  reason?: string | null;
  insuranceChange?: string;
  phoneNumber?: number;
}

export class Patientportal implements IPatientportal {
  constructor(public id?: number, public reason?: string | null, public insuranceChange?: string, public phoneNumber?: number) {}
}

export function getPatientportalIdentifier(patientportal: IPatientportal): number | undefined {
  return patientportal.id;
}
