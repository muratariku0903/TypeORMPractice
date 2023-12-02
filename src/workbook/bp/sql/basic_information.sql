CREATE TYPE basic_information AS ENUM ('RECEIPT', 'CONTRACT');

CREATE TABLE IF NOT EXISTS bp.basic_information (
  ticket_number INTEGER not null,
  basic_information_type basic_information not null,
  name VARCHAR(30) not null,
  address VARCHAR(30) not null,
  PRIMARY key (ticket_number,basic_information_type),
);

INSERT INTO bp.basic_information (ticket_number,basic_information_type, name, address)
values (1,'RECEIPT','村田陸','千葉県'),
  (1,'CONTRACT','村田貝','千葉県'),
  (2,'RECEIPT','村田理人','千葉県'),
  (2,'CONTRACT','村田理人','千葉県'),
  (3,'RECEIPT','村田陸','千葉県'),
  (3,'CONTRACT','村田貝','千葉県'),
  (4,'RECEIPT','村田秀吉','千葉県'),
  (4,'CONTRACT','村田秀吉','千葉県'),
  (5,'RECEIPT','村田海','千葉県'),
  (5,'CONTRACT','村田海','千葉県');
