create table if not exists bp.email_history_item (
  mail_number varchar(30) not null,
  target_email varchar(100) not null,
  mail_status varchar(30) not null,
  foreign key (mail_number) references bp.email_histories (mail_number),
  unique (mail_number,target_email)
)

insert into bp.email_history_item(mail_number,target_email) 
values ('20240202-9071','test@gmail.com')

