CREATE TABLE IF NOT EXISTS bp.holidays (
  office_code INTEGER not null,
  date date not null,
  PRIMARY key (office_code, date),
  foreign key(office_code) references bp.offices(id)
);
