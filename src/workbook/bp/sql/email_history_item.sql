create table if not exists bp.email_history_item (
  mail_number varchar(30) not null,
  target_email varchar(100) not null,
  mail_status varchar(30) not null,
  delete_flg boolean not null,
  foreign key (mail_number) references bp.email_histories (mail_number),
  unique (mail_number,target_email)
)

insert into bp.email_history_item(mail_number,target_email,mail_status,delete_flg) 
values ('20240210-7874','masa@gmail.com','BEFORE_SENDING',false)

