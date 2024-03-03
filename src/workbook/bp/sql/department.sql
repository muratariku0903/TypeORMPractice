CREATE TABLE IF NOT EXISTS bp.department(
  id serial not null,
  name VARCHAR(30) not null,
  office_code INTEGER not null,
  type VARCHAR(30) not null,
  PRIMARY KEY (id),
  foreign key(office_code) references bp.offices(id)
);
INSERT INTO bp.department (name,office_code)
values ('部門A',1),
  ('部門B',1),
  ('部門C',1),
  ('部門D',1),
  ('部門A',2),
  ('部門B',2),
  ('部門C',2),
  ('部門D',2),
  ('部門A',3),
  ('部門B',3),
  ('部門C',3),
  ('拠点D',3);
