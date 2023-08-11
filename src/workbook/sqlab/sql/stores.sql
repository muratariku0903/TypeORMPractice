CREATE type holiday as ENUM (
  '月曜日',
  '火曜日',
  '水曜日',
  '木曜日',
  '金曜日',
  '土曜日',
  '日曜日',
  '年中無休',
  'ー',
);
CREATE TABLE IF NOT EXISTS sqlab.stores(
  id serial not NULL,
  name varchar(255) not null,
  holiday holiday,
  PRIMARY key (id)
);
