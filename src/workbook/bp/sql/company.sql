CREATE TABLE IF NOT EXISTS bp.company(
  id serial not null,
  name VARCHAR(30) not null,
  PRIMARY KEY (id),
);
INSERT INTO bp.company (name)
values ('会社A'),
  ('会社B'),
  ('会社C');
