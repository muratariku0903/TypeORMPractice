Create table If Not Exists public.Prices1251 (
  id SERIAL not null,
  product_id int not null,
  start_date date not null,
  end_date date not null,
  price int not null,
  PRIMARY KEY (id)
);
insert into public.Prices1251 (product_id, start_date, end_date, price)
values ('1', '2019-02-17', '2019-02-28', '5'),
  ('1', '2019-03-01', '2019-03-22', '20'),
  ('2', '2019-02-01', '2019-02-20', '15'),
  ('2', '2019-02-21', '2019-03-31', '30');
Create table if NOT EXISTS public.UnitsSold1251 (
  id SERIAL not null,
  product_id int not null,
  purchase_date date not null,
  units int not null,
  PRIMARY KEY (id),
);
insert into public.UnitsSold1251(product_id, purchase_date, units)
values ('1', '2019-02-25', '100'),
  ('1', '2019-03-01', '15'),
  ('2', '2019-02-10', '200'),
  ('2', '2019-03-22', '30');
