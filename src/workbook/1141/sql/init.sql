create type activity_type as enum (
  'open_session',
  'end_session',
  'scroll_down',
  'send_message'
);
Create table If Not Exists public.Activity1141 (
  user_id int,
  session_id int,
  activity_date date,
  activity_type activity_type
);
insert into public.Activity1141 (
    user_id,
    session_id,
    activity_date,
    activity_type
  )
values ('1', '1', '2019-07-20', 'open_session'),
  ('1', '1', '2019-07-20', 'scroll_down'),
  ('1', '1', '2019-07-20', 'end_session'),
  ('2', '4', '2019-07-20', 'open_session'),
  ('2', '4', '2019-07-21', 'send_message'),
  ('2', '4', '2019-07-21', 'end_session'),
  ('3', '2', '2019-07-21', 'open_session'),
  ('3', '2', '2019-07-21', 'send_message'),
  ('3', '2', '2019-07-21', 'end_session'),
  ('4', '3', '2019-06-25', 'open_session'),
  ('4', '3', '2019-06-25', 'end_session');

-- CREATE TABLE public.activity1141 (
--   user_id int4 NULL,
--   session_id int4 NULL,
--   activity_date date NULL,
--   activity_type testschema.activity_type NULL,
--   id serial4 NOT NULL,
--   CONSTRAINT activity1141_pkey PRIMARY KEY (id)
-- );
