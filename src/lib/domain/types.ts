export type Sex = "female" | "male";
export type TriState = "yes" | "no" | "unknown";

export interface ClinicalConditions {
  hypertension: TriState;
  diabetes: TriState;
  chronicKidneyDisease: TriState;
  coronaryArteryDisease: TriState;
  priorMyocardialInfarction: TriState;
  priorPci: TriState;
  priorCabg: TriState;
  strokeOrTia: TriState;
  peripheralArteryDisease: TriState;
  heartFailure: TriState;
  atrialFibrillation: TriState;
  currentSmoking: TriState;
  formerSmoking: TriState;
  prematureCadFamilyHistory: TriState;
  antihypertensiveUse: TriState;
  lipidLoweringTherapyUse: TriState;
}

export interface Assessment {
  id: string;
  assessmentDate: string;
  laboratoryDate?: string;
  weightKg?: number;
  waistCm?: number;
  officeSbp?: number;
  officeDbp?: number;
  homeSbp?: number;
  homeDbp?: number;
  totalCholesterolMgDl?: number;
  ldlMgDl?: number;
  hdlMgDl?: number;
  triglyceridesMgDl?: number;
  apoBMgDl?: number;
  lpa?: { value: number; unit: "mg/dL" | "nmol/L" };
  glucoseMgDl?: number;
  hba1cPercent?: number;
  creatinineMgDl?: number;
  uacrMgG?: number;
  coronaryCalciumScore?: number;
  coronaryCalciumDate?: string;
}

export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  sex: Sex;
  heightCm: number;
  conditions: ClinicalConditions;
  assessments: Assessment[];
  baselineAssessmentId?: string;
  targets: {
    ldlMgDl?: number;
    officeSbp?: number;
    officeDbp?: number;
    weightKg?: number;
  };
}
