-- NACOS Skills Hub — initial schema
-- Run this once in the Supabase SQL editor (or `supabase db push`) on a fresh project.

-- ===========================================================================
-- profiles — 1:1 with auth.users
-- ===========================================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null default '',
  matric_number text not null default '',
  role text not null default 'mentee' check (role in ('mentee', 'mentor', 'admin')),
  mentor_status text not null default 'none'
    check (mentor_status in ('none', 'pending', 'approved', 'rejected')),
  level text,
  specialization text,
  track text,
  bio text,
  avatar_initials text,
  created_at timestamptz not null default now()
);

-- ===========================================================================
-- Helper: is the current JWT's user an admin?
-- security definer so it can read `profiles` regardless of the caller's RLS.
-- Must come after `profiles` exists — `language sql` functions are validated
-- against real objects at CREATE time (check_function_bodies), not deferred
-- to first call like plpgsql.
-- ===========================================================================
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;

create policy profiles_select_own on public.profiles
  for select using (id = auth.uid());

create policy profiles_select_admin on public.profiles
  for select using (public.is_admin());

-- Anyone signed in can see the public mentor directory fields (approved mentors).
create policy profiles_select_approved_mentors on public.profiles
  for select using (role = 'mentor' and mentor_status = 'approved');

create policy profiles_update_own on public.profiles
  for update using (id = auth.uid())
  with check (
    id = auth.uid()
    and role <> 'admin'
    and mentor_status <> 'approved'
    and mentor_status <> 'rejected'
  );

create policy profiles_update_admin on public.profiles
  for update using (public.is_admin())
  with check (public.is_admin());

-- ===========================================================================
-- tracks
-- ===========================================================================
create table public.tracks (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  color text,
  created_at timestamptz not null default now()
);

alter table public.tracks enable row level security;

-- Public: the signup and mentor-apply forms need the track list before login.
create policy tracks_select_all on public.tracks
  for select using (true);

create policy tracks_write_admin on public.tracks
  for all using (public.is_admin()) with check (public.is_admin());

insert into public.tracks (name, color) values
  ('Cybersecurity', '#16452E'),
  ('Cloud', '#008751'),
  ('DevOps', '#C89B3C'),
  ('Fullstack', '#235F41'),
  ('Mobile', '#3DDC84'),
  ('AI', '#0E2E1F');

-- ===========================================================================
-- mentor_applications
-- ===========================================================================
create table public.mentor_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  full_name text not null,
  email text not null,
  matric_number text not null,
  level text not null,
  specialization text not null,
  note text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references public.profiles (id),
  reviewed_at timestamptz
);

alter table public.mentor_applications enable row level security;

create policy mentor_applications_select_own on public.mentor_applications
  for select using (user_id = auth.uid());

create policy mentor_applications_select_admin on public.mentor_applications
  for select using (public.is_admin());

create policy mentor_applications_insert_own on public.mentor_applications
  for insert with check (user_id = auth.uid());

create policy mentor_applications_update_admin on public.mentor_applications
  for update using (public.is_admin()) with check (public.is_admin());

-- Auto-create a profile row whenever a new auth user is created. If the
-- signup metadata marks the account as a mentor applicant (set by the
-- "apply as mentor" flow for brand-new users), also file the
-- mentor_applications row here — this runs security-definer so it works
-- even before the user has a session (e.g. while email confirmation is
-- pending), which a client-side insert right after signUp() could not do.
-- Must come after both `profiles` and `mentor_applications` exist.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, matric_number, role, mentor_status, level, specialization, track, avatar_initials)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'matric_number', ''),
    coalesce(new.raw_user_meta_data ->> 'role', 'mentee'),
    coalesce(new.raw_user_meta_data ->> 'mentor_status', 'none'),
    new.raw_user_meta_data ->> 'level',
    new.raw_user_meta_data ->> 'specialization',
    new.raw_user_meta_data ->> 'track',
    new.raw_user_meta_data ->> 'avatar_initials'
  );

  if new.raw_user_meta_data ->> 'role' = 'mentor' then
    insert into public.mentor_applications (user_id, full_name, email, matric_number, level, specialization, status)
    values (
      new.id,
      coalesce(new.raw_user_meta_data ->> 'full_name', ''),
      new.email,
      coalesce(new.raw_user_meta_data ->> 'matric_number', ''),
      coalesce(new.raw_user_meta_data ->> 'level', ''),
      coalesce(new.raw_user_meta_data ->> 'specialization', ''),
      'pending'
    );
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===========================================================================
-- mentor_meta — public-directory extras for approved mentors
-- ===========================================================================
create table public.mentor_meta (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  rating numeric(2, 1) default 0,
  mentees_count int not null default 0,
  availability text not null default 'Open' check (availability in ('Open', 'Limited', 'Full')),
  tags text[] not null default '{}',
  headline text,
  updated_at timestamptz not null default now()
);

alter table public.mentor_meta enable row level security;

create policy mentor_meta_select_all on public.mentor_meta
  for select using (auth.uid() is not null);

create policy mentor_meta_write_own on public.mentor_meta
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy mentor_meta_write_admin on public.mentor_meta
  for all using (public.is_admin()) with check (public.is_admin());

-- ===========================================================================
-- mentee_mentor_matches
-- ===========================================================================
create table public.mentee_mentor_matches (
  id uuid primary key default gen_random_uuid(),
  mentee_id uuid not null references public.profiles (id) on delete cascade,
  mentor_id uuid not null references public.profiles (id) on delete cascade,
  match_score int,
  status text not null default 'requested' check (status in ('requested', 'active', 'ended')),
  created_at timestamptz not null default now(),
  unique (mentee_id, mentor_id)
);

alter table public.mentee_mentor_matches enable row level security;

create policy matches_select_participant on public.mentee_mentor_matches
  for select using (mentee_id = auth.uid() or mentor_id = auth.uid() or public.is_admin());

create policy matches_insert_mentee on public.mentee_mentor_matches
  for insert with check (mentee_id = auth.uid() or public.is_admin());

create policy matches_update_participant on public.mentee_mentor_matches
  for update using (mentee_id = auth.uid() or mentor_id = auth.uid() or public.is_admin());

-- ===========================================================================
-- quiz_submissions
-- ===========================================================================
create table public.quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  mentee_id uuid not null references public.profiles (id) on delete cascade,
  answers jsonb not null,
  recommended_track text not null,
  submitted_at timestamptz not null default now()
);

alter table public.quiz_submissions enable row level security;

create policy quiz_select_own on public.quiz_submissions
  for select using (mentee_id = auth.uid() or public.is_admin());

create policy quiz_insert_own on public.quiz_submissions
  for insert with check (mentee_id = auth.uid());

-- ===========================================================================
-- milestone_templates + mentee_milestones
-- ===========================================================================
create table public.milestone_templates (
  id uuid primary key default gen_random_uuid(),
  track text references public.tracks (name),
  title text not null,
  description text,
  order_index int not null default 0,
  due_label text,
  pr_required boolean not null default false
);

alter table public.milestone_templates enable row level security;

create policy milestone_templates_select_all on public.milestone_templates
  for select using (auth.uid() is not null);

create policy milestone_templates_write_admin on public.milestone_templates
  for all using (public.is_admin()) with check (public.is_admin());

create table public.mentee_milestones (
  id uuid primary key default gen_random_uuid(),
  mentee_id uuid not null references public.profiles (id) on delete cascade,
  mentor_id uuid references public.profiles (id),
  template_id uuid references public.milestone_templates (id),
  title text not null,
  description text,
  status text not null default 'locked' check (status in ('locked', 'current', 'completed')),
  due_label text,
  pr_required boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.mentee_milestones enable row level security;

create policy mentee_milestones_select on public.mentee_milestones
  for select using (mentee_id = auth.uid() or mentor_id = auth.uid() or public.is_admin());

create policy mentee_milestones_write on public.mentee_milestones
  for all using (mentee_id = auth.uid() or mentor_id = auth.uid() or public.is_admin())
  with check (mentee_id = auth.uid() or mentor_id = auth.uid() or public.is_admin());

-- ===========================================================================
-- certificate_templates + issued_certificates
-- ===========================================================================
create table public.certificate_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  track text,
  description text
);

alter table public.certificate_templates enable row level security;

create policy certificate_templates_select_all on public.certificate_templates
  for select using (auth.uid() is not null);

create policy certificate_templates_write_admin on public.certificate_templates
  for all using (public.is_admin()) with check (public.is_admin());

create table public.issued_certificates (
  id uuid primary key default gen_random_uuid(),
  mentee_id uuid not null references public.profiles (id) on delete cascade,
  template_id uuid references public.certificate_templates (id),
  title text not null,
  track text,
  signed_by text,
  issued_at timestamptz not null default now()
);

alter table public.issued_certificates enable row level security;

create policy issued_certificates_select on public.issued_certificates
  for select using (mentee_id = auth.uid() or public.is_admin());

create policy issued_certificates_write_admin on public.issued_certificates
  for all using (public.is_admin()) with check (public.is_admin());

-- An approved mentor can sign a certificate for a mentee in their own track.
create policy issued_certificates_insert_mentor on public.issued_certificates
  for insert with check (
    exists (
      select 1 from public.profiles mentee
      join public.profiles mentor on mentor.id = auth.uid()
      where mentee.id = issued_certificates.mentee_id
        and mentor.role = 'mentor'
        and mentor.mentor_status = 'approved'
        and mentor.track = mentee.track
    )
  );

-- ===========================================================================
-- message_threads + messages
-- ===========================================================================
create table public.message_threads (
  id uuid primary key default gen_random_uuid(),
  participant_a uuid not null references public.profiles (id) on delete cascade,
  participant_b uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (participant_a, participant_b)
);

alter table public.message_threads enable row level security;

create policy threads_select_participant on public.message_threads
  for select using (participant_a = auth.uid() or participant_b = auth.uid() or public.is_admin());

create policy threads_insert_participant on public.message_threads
  for insert with check (participant_a = auth.uid() or participant_b = auth.uid());

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.message_threads (id) on delete cascade,
  sender_id uuid not null references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

alter table public.messages enable row level security;

create policy messages_select_participant on public.messages
  for select using (
    exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and (t.participant_a = auth.uid() or t.participant_b = auth.uid())
    ) or public.is_admin()
  );

create policy messages_insert_participant on public.messages
  for insert with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and (t.participant_a = auth.uid() or t.participant_b = auth.uid())
    )
  );

-- ===========================================================================
-- sessions
-- ===========================================================================
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid not null references public.profiles (id) on delete cascade,
  mentee_id uuid references public.profiles (id) on delete cascade,
  title text not null,
  scheduled_at timestamptz,
  mode text not null default 'Async' check (mode in ('Async', 'Live call', 'Office hours')),
  status text not null default 'Upcoming' check (status in ('Upcoming', 'Completed')),
  created_at timestamptz not null default now()
);

alter table public.sessions enable row level security;

create policy sessions_select_participant on public.sessions
  for select using (mentor_id = auth.uid() or mentee_id = auth.uid() or public.is_admin());

create policy sessions_write_mentor on public.sessions
  for all using (mentor_id = auth.uid() or public.is_admin())
  with check (mentor_id = auth.uid() or public.is_admin());

-- ===========================================================================
-- pr_reviews
-- ===========================================================================
create table public.pr_reviews (
  id uuid primary key default gen_random_uuid(),
  mentee_id uuid not null references public.profiles (id) on delete cascade,
  mentor_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  repo_url text not null,
  priority text not null default 'Normal' check (priority in ('High', 'Normal')),
  status text not null default 'Pending' check (status in ('Pending', 'In review', 'Done')),
  submitted_at timestamptz not null default now()
);

alter table public.pr_reviews enable row level security;

create policy pr_reviews_select_participant on public.pr_reviews
  for select using (mentee_id = auth.uid() or mentor_id = auth.uid() or public.is_admin());

create policy pr_reviews_insert_mentee on public.pr_reviews
  for insert with check (mentee_id = auth.uid());

create policy pr_reviews_update_mentor on public.pr_reviews
  for update using (mentor_id = auth.uid() or public.is_admin());

-- ===========================================================================
-- mini_projects + mini_project_submissions (weekly per-track challenges)
-- ===========================================================================
create table public.mini_projects (
  id uuid primary key default gen_random_uuid(),
  track text not null references public.tracks (name),
  title text not null,
  description text,
  week_number int not null,
  opens_at timestamptz,
  due_at timestamptz,
  resource_url text,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

alter table public.mini_projects enable row level security;

create policy mini_projects_select_all on public.mini_projects
  for select using (auth.uid() is not null);

create policy mini_projects_write_admin on public.mini_projects
  for all using (public.is_admin()) with check (public.is_admin());

create table public.mini_project_submissions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.mini_projects (id) on delete cascade,
  mentee_id uuid not null references public.profiles (id) on delete cascade,
  repo_url text not null,
  demo_url text,
  notes text,
  status text not null default 'submitted' check (status in ('submitted', 'changes_requested', 'approved')),
  mentor_feedback text,
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references public.profiles (id),
  reviewed_at timestamptz,
  unique (project_id, mentee_id)
);

alter table public.mini_project_submissions enable row level security;

create policy submissions_select_own on public.mini_project_submissions
  for select using (mentee_id = auth.uid() or public.is_admin());

create policy submissions_select_mentor on public.mini_project_submissions
  for select using (
    exists (
      select 1 from public.mini_projects mp
      join public.profiles pm on pm.id = auth.uid()
      where mp.id = mini_project_submissions.project_id
        and pm.role = 'mentor'
        and pm.mentor_status = 'approved'
        and pm.track = mp.track
    )
  );

create policy submissions_insert_own on public.mini_project_submissions
  for insert with check (mentee_id = auth.uid());

create policy submissions_update_own on public.mini_project_submissions
  for update using (mentee_id = auth.uid())
  with check (mentee_id = auth.uid());

create policy submissions_update_mentor on public.mini_project_submissions
  for update using (
    public.is_admin()
    or exists (
      select 1 from public.mini_projects mp
      join public.profiles pm on pm.id = auth.uid()
      where mp.id = mini_project_submissions.project_id
        and pm.role = 'mentor'
        and pm.mentor_status = 'approved'
        and pm.track = mp.track
    )
  );
