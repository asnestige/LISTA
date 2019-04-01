create database lista;
use lista;

CREATE TABLE list (
   list_id int not null auto_increment,
   list_name varchar(20) not null,

   primary key(list_id)
);

CREATE TABLE user (
   user_email varchar(60) not null,
   user_name varchar(15) not null,
   
   constraint user_pk primary key(user_email)
);

CREATE TABLE item (
   item_id int not null auto_increment,
   list_id int not null,
   item_name varchar(20) not null,
   checked_by int,
   constraint item_pk primary key(item_id, list_id),
   constraint item_fk foreign key(list_id) references list(list_id),
   constraint item_checked_fk foreign key(checked_by) references user(user_email)
);

CREATE TABLE participant (
   list_id int not null,
   user_email int not null,
   is_admin boolean,
   constraint participant_pk primary key(list_id, user_email),
   constraint participant_list_fk foreign key(list_id) references list(list_id)
														on update cascade
                                                        on delete cascade,
   constraint participant_user_fk foreign key(user_email) references user(user_email)
														on update cascade
                                                        on delete cascade
);