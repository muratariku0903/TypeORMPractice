Create table If Not Exists public.Tweets1683 (
  tweet_id int not null,
  content VARCHAR(50),
  PRIMARY KEY (tweet_id)
);
insert into public.Tweets1683 (tweet_id, content)
values (1, 'Vote for Biden'),
  (2, 'Let us make America great again !');
