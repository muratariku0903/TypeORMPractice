
CREATE TABLE IF NOT EXISTS bp.postal_code_location_mapping(
  postal_code varchar(30) not null,
  office_code INTEGER not null,
  PRIMARY KEY (postal_code,office_code),
  foreign key(office_code) references bp.office_code(id)
);
INSERT INTO bp.postal_code_location_mapping (postal_code,office_code)
values ('0000000',1),
  ('1111111',2),
  ('2222222',3);
