CREATE TABLE IF NOT EXISTS sqlab.categories (
  id serial not NULL,
  name varchar(255) not null,
  PRIMARY key (id)
);
INSERT INTO TABLE sqlab.categories (name)
values ('文芸・評論'),
  ('サイエンス・テクノロジー'),
  ('旅行'),
  ('歴史・地理'),
  ('ビジネス・経済'),
  ('語学'),
  ('教育・自己啓発'),
  ('暮らし・健康・料理'),
  ('政治・社会'),
  ('アート・建築・デザイン'),
  ('絵本・児童書'),
  ('未分類');
