import Link from "next/link";
import { calculateBmi } from "@/lib/clinical-engine/anthropometry/bmi";
import { mockPatients } from "@/lib/data/mock-patients";

export default function PatientsPage() {
  return (
    <main className="shell">
      <div className="topbar">
        <div className="brand">Motor Clínico Cardiovascular<small>Ambiente de teste · dados fictícios</small></div>
        <button className="button" type="button" disabled title="Disponível na próxima etapa">+ Novo paciente</button>
      </div>
      <div className="notice">Protótipo inicial. Nenhuma informação identificável de paciente real deve ser cadastrada neste ambiente.</div>
      <h1 style={{ marginTop: 28 }}>Pacientes fictícios</h1>
      <div className="patient-list">
        <div className="patient-row header"><span>Paciente</span><span>Última avaliação</span><span>LDL</span><span>PA</span><span>Peso / IMC</span></div>
        {mockPatients.map((patient) => {
          const latest = patient.assessments.at(-1)!;
          const bmi = latest.weightKg ? calculateBmi(latest.weightKg, patient.heightCm).value : undefined;
          return (
            <Link className="card patient-row" href={`/patients/${patient.id}`} key={patient.id}>
              <span className="patient-name">{patient.name}</span><span>{latest.assessmentDate}</span>
              <span>{latest.ldlMgDl ?? "—"} mg/dL</span><span>{latest.officeSbp ?? "—"}/{latest.officeDbp ?? "—"}</span>
              <span>{latest.weightKg ?? "—"} kg {bmi ? <span className="muted">· IMC {bmi}</span> : null}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
