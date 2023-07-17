Create table If Not Exists public.Queries1211 (
  id SERIAL not null,
  query_name varchar(255),
  result varchar(255),
  position int,
  rating int,
  PRIMARY KEY (id)
);
insert into public.Queries1211 (query_name, result, position, rating)
values ('Dog', 'Golden Retriever', '1', '5'),
('Dog', 'German Shepherd', '2', '5'),
  ('Dog', 'Mule', '200', '1'),
  ('Cat', 'Shirazi', '5', '2'),
  ('Cat', 'Siamese', '3', '3'),
  ('Cat', 'Sphynx', '7', '4');
