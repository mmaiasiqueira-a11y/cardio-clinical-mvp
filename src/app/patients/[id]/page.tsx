import Link from "next/link";
import { notFound } from "next/navigation";
import { calculateBmi } from "@/lib/clinical-engine/anthropometry/bmi";
import { getMockPatient } from "@/lib/data/mock-patients";

function percentChange(current:number,baseline:number){return((current-baseline)/baseline)*100;}

export default async function PatientPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params; const patient=getMockPatient(id); if(!patient) notFound();
  const latest=patient.assessments.at(-1)!;
  const baseline=patient.baselineAssessmentId?patient.assessments.find(a=>a.id===patient.baselineAssessmentId):patient.assessments[0];
  const bmi=latest.weightKg?calculateBmi(latest.weightKg,patient.heightCm).value:undefined;
  const weightChange=latest.weightKg&&baseline?.weightKg?percentChange(latest.weightKg,baseline.weightKg):undefined;
  const ldlDifference=latest.ldlMgDl!==undefined&&patient.targets.ldlMgDl!==undefined?latest.ldlMgDl-patient.targets.ldlMgDl:undefined;
  const bpOnTarget=latest.officeSbp!==undefined&&latest.officeDbp!==undefined&&patient.targets.officeSbp!==undefined&&patient.targets.officeDbp!==undefined?latest.officeSbp<patient.targets.officeSbp&&latest.officeDbp<patient.targets.officeDbp:undefined;
  return <main className="shell"><Link href="/patients" className="back">← Pacientes</Link><div className="topbar"><div><h1 style={{margin:0}}>{patient.name}</h1><div className="muted" style={{marginTop:6}}>Protótipo com dados fictícios</div></div><Link href={`/patients/${patient.id}/assessments/new`} className="button">+ Nova avaliação</Link></div><div className="grid"><div className="card metric"><div className="label">LDL-c</div><div className="value">{latest.ldlMgDl??"—"} <span style={{fontSize:13}}>mg/dL</span></div><div className="detail">{patient.targets.ldlMgDl!==undefined?<>Meta &lt;{patient.targets.ldlMgDl} mg/dL<br/></>:null}{ldlDifference!==undefined?(ldlDifference<=0?<span className="status-ok">Meta atingida</span>:<span className="status-alert">{ldlDifference} mg/dL acima da meta</span>):null}</div></div><div className="card metric"><div className="label">Pressão arterial · consultório</div><div className="value">{latest.officeSbp??"—"}/{latest.officeDbp??"—"}</div><div className="detail">{bpOnTarget===true?<span className="status-ok">Meta atingida</span>:null}{bpOnTarget===false?<span className="status-alert">Fora da meta definida</span>:null}</div></div><div className="card metric"><div className="label">Peso</div><div className="value">{latest.weightKg??"—"} <span style={{fontSize:13}}>kg</span></div><div className="detail">IMC {bmi??"—"} kg/m²<br/>{weightChange!==undefined?`${weightChange.toFixed(1)}% desde o basal`:"Sem basal definido"}</div></div></div><h2 className="section-title">Última avaliação</h2><div className="card"><strong>{latest.assessmentDate}</strong>{latest.laboratoryDate?<span className="muted"> · laboratório {latest.laboratoryDate}</span>:null}<p className="muted" style={{marginBottom:0}}>Nesta primeira entrega, somente o IMC já pertence ao Motor Clínico isolado e testável. Os demais cards usam comparações simples enquanto os módulos clínicos são implementados incrementalmente.</p></div></main>;
}
