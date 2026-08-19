import type { Patient } from "@/lib/domain/types";

export const mockPatients: Patient[] = [
  {
    id: "pt-fict-001",
    name: "Maria Silva (fictícia)",
    birthDate: "1968-04-11",
    sex: "female",
    heightCm: 172,
    conditions: {
      hypertension: "yes", diabetes: "no", chronicKidneyDisease: "no", coronaryArteryDisease: "yes",
      priorMyocardialInfarction: "no", priorPci: "yes", priorCabg: "no", strokeOrTia: "no",
      peripheralArteryDisease: "no", heartFailure: "no", atrialFibrillation: "no", currentSmoking: "no",
      formerSmoking: "yes", prematureCadFamilyHistory: "yes", antihypertensiveUse: "yes", lipidLoweringTherapyUse: "yes"
    },
    baselineAssessmentId: "asmt-fict-001",
    targets: { ldlMgDl: 55, officeSbp: 130, officeDbp: 80, weightKg: 82 },
    assessments: [
      {
        id: "asmt-fict-001", assessmentDate: "2026-01-15", laboratoryDate: "2026-01-13", weightKg: 94.2,
        waistCm: 105, officeSbp: 142, officeDbp: 88, totalCholesterolMgDl: 246, ldlMgDl: 168,
        hdlMgDl: 49, triglyceridesMgDl: 145, hba1cPercent: 6.4, creatinineMgDl: 0.94
      },
      {
        id: "asmt-fict-002", assessmentDate: "2026-08-19", laboratoryDate: "2026-08-12", weightKg: 86.7,
        waistCm: 96, officeSbp: 126, officeDbp: 76, homeSbp: 122, homeDbp: 72,
        totalCholesterolMgDl: 142, ldlMgDl: 71, hdlMgDl: 51, triglyceridesMgDl: 100,
        hba1cPercent: 5.7, creatinineMgDl: 0.94, uacrMgG: 46
      }
    ]
  },
  {
    id: "pt-fict-002",
    name: "João Pereira (fictício)",
    birthDate: "1977-09-28",
    sex: "male",
    heightCm: 178,
    conditions: {
      hypertension: "yes", diabetes: "yes", chronicKidneyDisease: "unknown", coronaryArteryDisease: "no",
      priorMyocardialInfarction: "no", priorPci: "no", priorCabg: "no", strokeOrTia: "no",
      peripheralArteryDisease: "no", heartFailure: "no", atrialFibrillation: "no", currentSmoking: "no",
      formerSmoking: "no", prematureCadFamilyHistory: "unknown", antihypertensiveUse: "yes", lipidLoweringTherapyUse: "yes"
    },
    targets: { ldlMgDl: 70, officeSbp: 130, officeDbp: 80 },
    assessments: [
      {
        id: "asmt-fict-003", assessmentDate: "2026-08-11", laboratoryDate: "2026-08-08", weightKg: 91,
        officeSbp: 122, officeDbp: 72, totalCholesterolMgDl: 119, ldlMgDl: 48, hdlMgDl: 46,
        triglyceridesMgDl: 125, hba1cPercent: 6.3, creatinineMgDl: 1.04
      }
    ]
  }
];

export function getMockPatient(id: string) {
  return mockPatients.find((patient) => patient.id === id);
}
