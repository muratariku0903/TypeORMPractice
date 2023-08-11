create TABLE IF NOT EXISTS sqlab.books (
  id serial not null,
  name varchar(255) not null,
  release_year serial not null,
  total_page serial not null,
  PRIMARY KEY (id)
);
