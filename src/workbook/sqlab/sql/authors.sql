CREATE TYPE gender AS ENUM ('男', '女', 'その他');
CREATE TABLE IF NOT EXISTS sqlab.authors (
  id serial not null,
  name varchar(255) not null,
  gender gender,
  PRIMARY KEY (id)
);
