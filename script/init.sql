-- DB作成
CREATE DATABASE test;
-- 作成したDBへ切り替え
\ c test -- スキーマ作成
CREATE SCHEMA testSchema;
-- ロールの作成
CREATE ROLE test WITH LOGIN PASSWORD 'passw0rd';
-- 権限追加
GRANT ALL PRIVILEGES ON SCHEMA testSchema TO test;
