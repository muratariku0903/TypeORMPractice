Create table If Not Exists public.Users1587 (
  account int not null,
  name VARCHAR(20),
  PRIMARY KEY (account)
);
insert into public.Users1587 (account, name)
values (90001, 'Alice'),
  (90002, 'Bob'),
  (90003, 'Charlie');
CREATE TABLE IF NOT EXISTS public.Transactions1587 (
  trans_id int not NULL,
  account int not NULL,
  amount int not null,
  transacted_on date not null,
  PRIMARY KEY(trans_id),
  foreign key(account) references public.Users1587(account)
);
insert into public.Transactions1587(trans_id, account, amount, transacted_on)
values (1, 90001, 7000, '2020-08-01'),
  (2, 90001, 7000, '2020-09-01'),
  (3, 90001, -3000, '2020-09-02'),
  (4, 90002, 1000, '2020-09-12'),
  (5, 90003, 6000, '2020-08-07'),
  (6, 90003, 6000, '2020-09-07'),
  (7, 90003, -4000, '2020-09-11');
