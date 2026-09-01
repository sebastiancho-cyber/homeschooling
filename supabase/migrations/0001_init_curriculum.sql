-- Esquema inicial: capa de contenido + capa de progreso del estudiante.
-- Ver PLAN-HOMESCHOOLING-COLOMBIA.md §9 para el razonamiento completo.

create table subjects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  color_accent text not null
);

create table dbas (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references subjects(id) on delete cascade,
  grade smallint not null check (grade between 1 and 11),
  num smallint not null,
  enunciado text not null,
  unique (subject_id, grade, num)
);

create table learning_evidences (
  id uuid primary key default gen_random_uuid(),
  dba_id uuid not null references dbas(id) on delete cascade,
  num smallint not null,
  texto text not null,
  unique (dba_id, num)
);

create type exercise_type as enum (
  'multiple_choice',
  'numeric_input',
  'drag_sort',
  'match_pairs',
  'true_false'
);

create table exercises (
  id uuid primary key default gen_random_uuid(),
  evidence_id uuid not null references learning_evidences(id) on delete cascade,
  type exercise_type not null,
  prompt text not null,
  config jsonb not null default '{}'::jsonb,
  difficulty smallint not null default 1,
  order_in_evidence smallint not null default 1
);

create table students (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table student_subject_placement (
  student_id uuid not null references students(id) on delete cascade,
  subject_id uuid not null references subjects(id) on delete cascade,
  grade smallint not null check (grade between 1 and 11),
  primary key (student_id, subject_id)
);

create type progress_status as enum ('pending', 'correct', 'incorrect');

create table student_exercise_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  exercise_id uuid not null references exercises(id) on delete cascade,
  status progress_status not null default 'pending',
  attempts int not null default 0,
  last_attempt_at timestamptz,
  mastered_at timestamptz,
  unique (student_id, exercise_id)
);

create table student_evidence_progress (
  student_id uuid not null references students(id) on delete cascade,
  evidence_id uuid not null references learning_evidences(id) on delete cascade,
  mastered boolean not null default false,
  mastered_at timestamptz,
  primary key (student_id, evidence_id)
);

create table student_dba_progress (
  student_id uuid not null references students(id) on delete cascade,
  dba_id uuid not null references dbas(id) on delete cascade,
  evidences_total int not null default 0,
  evidences_mastered int not null default 0,
  completed_at timestamptz,
  primary key (student_id, dba_id)
);

-- RLS: cada estudiante ve y modifica solo su propio progreso.
alter table students enable row level security;
alter table student_subject_placement enable row level security;
alter table student_exercise_progress enable row level security;
alter table student_evidence_progress enable row level security;
alter table student_dba_progress enable row level security;

create policy "students_own_row" on students
  for all using (auth_user_id = auth.uid());

create policy "placement_own" on student_subject_placement
  for all using (student_id in (select id from students where auth_user_id = auth.uid()));

create policy "exercise_progress_own" on student_exercise_progress
  for all using (student_id in (select id from students where auth_user_id = auth.uid()));

create policy "evidence_progress_own" on student_evidence_progress
  for all using (student_id in (select id from students where auth_user_id = auth.uid()));

create policy "dba_progress_own" on student_dba_progress
  for all using (student_id in (select id from students where auth_user_id = auth.uid()));

-- Contenido curricular: lectura pública (no depende de sesión de estudiante).
alter table subjects enable row level security;
alter table dbas enable row level security;
alter table learning_evidences enable row level security;
alter table exercises enable row level security;

create policy "subjects_read_all" on subjects for select using (true);
create policy "dbas_read_all" on dbas for select using (true);
create policy "evidences_read_all" on learning_evidences for select using (true);
create policy "exercises_read_all" on exercises for select using (true);
