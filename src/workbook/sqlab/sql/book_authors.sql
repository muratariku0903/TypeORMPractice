CREATE TABLE IF NOT EXISTS sqlab.book_authors(
  id serial not null,
  book_id serial not null,
  author_id serial not null,
  PRIMARY KEY (id),
  foreign key (book_id) references sqlab.books(id),
  foreign key (author_id) references sqlab.authors(id),
);
