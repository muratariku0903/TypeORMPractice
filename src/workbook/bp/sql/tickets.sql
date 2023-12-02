CREATE TYPE application AS ENUM ('OPEN', 'RESTART', 'CLOSE', 'PAUSE');

CREATE TABLE IF NOT EXISTS bp.tickets (
  ticket_number INTEGER not null,
  contract_number INTEGER null,
  application_type application not null,
  PRIMARY key (ticket_number),
);

INSERT INTO bp.tickets (ticket_number,contract_number,application_type)
values (1,10,'OPEN'),
  (2,11,'OPEN'),
  (3,10,'RESTART'),
  (4,12,'CLOSE'),
  (5,13,'OPEN');
