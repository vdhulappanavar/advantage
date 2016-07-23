import { Medicine } from '../medicines/medicine';

export interface Med2patient {
  id?: string;
  patientid : string;
  patientName : string;
  name: string;
  height: number;
  weight: number;
  profession?: string;
  mongoId : string;
  medicines : Medicine[];
  newmedicines : Medicine[];
}
