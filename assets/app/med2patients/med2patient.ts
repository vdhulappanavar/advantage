export interface Med2patient {
  id?: string;
  url?: string;
  name: string;
  height: number;
  weight: number;
  profession?: string;
  mongoId : string;
  medicines : [{
    medid : string;
    name : string;
    qty : string;
    totalcost : number
  }]
}
