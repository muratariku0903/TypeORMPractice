create table if not exists bp.email_histories (
  mail_number varchar(50) primary key not null,
  mail_type varchar(30) not null,
  mail_status varchar(30) not null,
  scheduled_send_datetime timestamp with time zone,
  title varchar(35),
  body varchar(10000)
)

-- indexを貼ることで　「title」列に基づく検索やソート操作のパフォーマンスが向上
create index if not exists title_index on bp.email_histories (title)

create or replace function generate_mail_number()  returns trigger as $$

begin
  new.mail_number = concat(to_char(new.scheduled_send_datetime,'YYYYMMDD'),'-',LPAD(CAST(FLOOR(RANDOM()*10000) as TEXT),4,'0'));
  return new;
end

-- 直前の関数定義が「PL/pgSQL」というプロシージャル言語（プログラミング言語をSQLに拡張してくれる言語）であることを宣言
$$ language plpgsql;

create trigger trigger_generate_mail_number before insert on bp.email_histories for each row execute function generate_mail_number()

insert into bp.email_histories(mail_type,scheduled_send_datetime,title,body) 
values ('MANUAL','2024-02-02 00:00:00','test','this is test body.')

