Create table If Not Exists public.Products1795 (
  product_id int not null,
  store1 int,
  store2 int,
  store3 int,
  PRIMARY KEY (product_id)
);
insert into public.Products1795 (product_id, store1, store2, store3)
values (0, 95, 100, 105),
  (1, 70, null, 80);
