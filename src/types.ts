export interface PatientInfo {
    name: string;
    age: string;
    id: string;
}

export interface CalculationRecord {
    id: string;
    date: string;
    patient: PatientInfo;
    input: number;
    output: number;
    balance: number;
    hollidaySegar: number;
}
