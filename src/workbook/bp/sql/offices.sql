CREATE TABLE IF NOT EXISTS bp.offices(
  id serial not null,
  name VARCHAR(30) not null,
  company_code INTEGER not null,
  PRIMARY KEY (id),
  foreign key(company_code) references bp.company(id)
);
INSERT INTO bp.offices (name)
values ('拠点A'),
  ('拠点B'),
  ('拠点C');
