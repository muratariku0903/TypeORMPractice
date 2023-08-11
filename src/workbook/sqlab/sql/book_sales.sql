CREATE TABLE IF NOT EXISTS sqlab.book_sales(
  id serial not null,
  book_id serial not null,
  store_id serial not null,
  price serial not null,
  stock serial not null,
  figure serial not null,
  PRIMARY KEY (id),
  foreign key (book_id) references sqlab.books(id),
  foreign key (store_id) references sqlab.stores(id),
);
