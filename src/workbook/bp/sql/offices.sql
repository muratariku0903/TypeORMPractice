CREATE TABLE IF NOT EXISTS bp.offices(
  id serial not null,
  name VARCHAR(30) not null,
  PRIMARY KEY (id),
);
INSERT INTO bp.offices (name)
values ('拠点A'),
  ('拠点B'),
  ('拠点C');
