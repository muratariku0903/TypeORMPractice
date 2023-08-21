CREATE TABLE IF NOT EXISTS bp.availabilities (
  office_code INTEGER not null,
  date date not null,
  time_category VARCHAR(20) not null,
  register_count INTEGER not null,
  max_register_count INTEGER not null,
  PRIMARY key (office_code, date, time_category),
  foreign key(office_code) references bp.offices(id)
);

