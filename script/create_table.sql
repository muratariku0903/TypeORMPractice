-- DB切り替え
\ c test -- テーブル作成
CREATE TABLE testSchema.sample (
  col1 VARCHAR(10),
  col2 VARCHAR(10),
  col3 VARCHAR(10),
  PRIMARY KEY (col1)
);
-- 権限追加
GRANT ALL PRIVILEGES ON testSchema.sample TO test;
-- サンプルレコード作成
INSERT INTO testSchema.sample
VALUES('1111', '2221', '3331');
INSERT INTO testSchema.sample
VALUES('1112', '2222', '3332');
INSERT INTO testSchema.sample
VALUES('1113', '2223', '3333');
