create table public.user_settings (
  id uuid references auth.users on delete cascade primary key,
  show_slides boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;

create policy "users can read own settings"
  on public.user_settings for select
  using (auth.uid() = id);

create policy "users can insert own settings"
  on public.user_settings for insert
  with check (auth.uid() = id);

create policy "users can update own settings"
  on public.user_settings for update
  using (auth.uid() = id);
