create extension if not exists pgcrypto;
create type public.tri_state as enum ('yes','no','unknown');
create type public.biological_sex as enum ('female','male');

create table public.patients (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  birth_date date not null,
  sex public.biological_sex not null,
  height_cm numeric(5,2) not null check (height_cm > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clinical_conditions (
  patient_id uuid primary key references public.patients(id) on delete cascade,
  hypertension public.tri_state not null default 'unknown', diabetes public.tri_state not null default 'unknown',
  chronic_kidney_disease public.tri_state not null default 'unknown', coronary_artery_disease public.tri_state not null default 'unknown',
  prior_myocardial_infarction public.tri_state not null default 'unknown', prior_pci public.tri_state not null default 'unknown',
  prior_cabg public.tri_state not null default 'unknown', stroke_or_tia public.tri_state not null default 'unknown',
  peripheral_artery_disease public.tri_state not null default 'unknown', heart_failure public.tri_state not null default 'unknown',
  atrial_fibrillation public.tri_state not null default 'unknown', current_smoking public.tri_state not null default 'unknown',
  former_smoking public.tri_state not null default 'unknown', premature_cad_family_history public.tri_state not null default 'unknown',
  antihypertensive_use public.tri_state not null default 'unknown', lipid_lowering_therapy_use public.tri_state not null default 'unknown'
);

create table public.assessments (
  id uuid primary key default gen_random_uuid(), patient_id uuid not null references public.patients(id) on delete cascade,
  assessment_date date not null, laboratory_date date, created_at timestamptz not null default now()
);

create table public.measurements (
  id uuid primary key default gen_random_uuid(), patient_id uuid not null references public.patients(id) on delete cascade,
  assessment_id uuid references public.assessments(id) on delete cascade, measurement_type text not null,
  numeric_value numeric not null, unit text, measured_at date not null, is_baseline boolean not null default false,
  created_at timestamptz not null default now()
);
create index measurements_patient_type_date_idx on public.measurements(patient_id,measurement_type,measured_at desc);

create table public.targets (
  id uuid primary key default gen_random_uuid(), patient_id uuid not null references public.patients(id) on delete cascade,
  parameter text not null, comparison_operator text not null check (comparison_operator in ('<','<=','>','>=','=')),
  target_value numeric not null, unit text not null, source text not null check (source in ('clinical_engine','physician')),
  rule_version text, effective_from date not null, effective_until date, created_at timestamptz not null default now()
);

create table public.calculation_results (
  id uuid primary key default gen_random_uuid(), patient_id uuid not null references public.patients(id) on delete cascade,
  assessment_id uuid references public.assessments(id) on delete set null, calculator_key text not null,
  algorithm_version text not null, input_snapshot jsonb not null, result jsonb not null, calculated_at timestamptz not null default now()
);

alter table public.patients enable row level security;
alter table public.clinical_conditions enable row level security;
alter table public.assessments enable row level security;
alter table public.measurements enable row level security;
alter table public.targets enable row level security;
alter table public.calculation_results enable row level security;

create policy "owner can manage patients" on public.patients for all to authenticated using (owner_user_id=auth.uid()) with check (owner_user_id=auth.uid());
create policy "owner can manage clinical conditions" on public.clinical_conditions for all to authenticated using (exists(select 1 from public.patients p where p.id=patient_id and p.owner_user_id=auth.uid())) with check (exists(select 1 from public.patients p where p.id=patient_id and p.owner_user_id=auth.uid()));
create policy "owner can manage assessments" on public.assessments for all to authenticated using (exists(select 1 from public.patients p where p.id=patient_id and p.owner_user_id=auth.uid())) with check (exists(select 1 from public.patients p where p.id=patient_id and p.owner_user_id=auth.uid()));
create policy "owner can manage measurements" on public.measurements for all to authenticated using (exists(select 1 from public.patients p where p.id=patient_id and p.owner_user_id=auth.uid())) with check (exists(select 1 from public.patients p where p.id=patient_id and p.owner_user_id=auth.uid()));
create policy "owner can manage targets" on public.targets for all to authenticated using (exists(select 1 from public.patients p where p.id=patient_id and p.owner_user_id=auth.uid())) with check (exists(select 1 from public.patients p where p.id=patient_id and p.owner_user_id=auth.uid()));
create policy "owner can manage calculation results" on public.calculation_results for all to authenticated using (exists(select 1 from public.patients p where p.id=patient_id and p.owner_user_id=auth.uid())) with check (exists(select 1 from public.patients p where p.id=patient_id and p.owner_user_id=auth.uid()));
