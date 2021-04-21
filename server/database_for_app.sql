-- create database database_for_app;

-- create table database_for_app.category(
-- categoryId int not null primary key auto_increment,
-- name varchar(50) not null
-- );

-- create table database_for_app.product (
-- 	productId int not null primary key auto_increment,
--     name varchar(50) not null,
--     description varchar(150) not null,
--     price decimal(8, 2) not null,
--     weight decimal(8, 2) not null,
--     categoryId int not null,
--     foreign key (categoryId) references database_for_app.category(categoryId),
--     check (price > 0),
--     check (weight > 0)
-- );

-- create table database_for_app.order_state (
-- order_stateId int not null primary key auto_increment,
-- name varchar(30) not null,
-- check (name IN ('DISAPPROVED', 'APPROVED', 'CANCELED', 'REALIZED'))
-- );

-- create table database_for_app.order(
-- orderId int not null auto_increment primary key,
-- approval_date date,
-- order_stateId int not null,
-- user_name varchar(50) not null,
-- email varchar(40) not null,
-- phone_number char(9) not null,
-- foreign key (order_stateId) references database_for_app.order_state(order_stateId),
-- check (phone_number REGEXP '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
-- check (email like '%@%')
-- );

-- create table database_for_app.order_product(
-- orderId int not null,
-- productId int not null,
-- amount int not null,
-- check (amount > 0 ),
-- foreign key (orderId) references database_for_app.order(orderId),
-- foreign key (productId) references database_for_app.product(productId)
-- );




--------------------------------------
insert into database_for_app.category (name) values ('laptopy');
insert into database_for_app.category (name) values ('smartfony');
insert into database_for_app.category (name) values ('TV');
insert into database_for_app.category (name) values ('konsole');
insert into database_for_app.category (name) values ('akcesoria');



insert into database_for_app.product (name, description, price, weight, categoryId) values ('Lenovo Idea Pad', 'Laptop do zastosowań biurowych', 4900, 0.5, 1);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Asus ROG', 'Dysk tysiąc, doskonały sprzęt dla graczy', 5500, 4.4, 1);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Acer Predator', 'Potężny laptop wyposażony w podświetlaną klawiaturę', 5500, 3.4, 1);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Iphone 11 pro', 'Apple orginal', 7299, 0.1, 2);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Iphene 11 super', 'Chińska wariacja na temat światowego klasyka', 729, 0.1, 2);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('CAT S42', 'Lider w zakresie wytrzymałych smartfonów', 1299, 3.2, 2);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('LG', 'Zastsowana w tym modelu została nowoczesna matryca', 7900, 4.2, 3);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Samsug Lenovo', 'Jedyny nowoczesny telewizor wyposażny w technologie kineskopową', 7900, 13.4, 3);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Manta', 'Kiepski telewizor w dobrej cenie', 100, 5.3, 3);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('PS 5', 'premierowa odsłona nowej konsoli', 3000, 2.5, 4);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Nintendo Switch', 'Konsola przenośna wyposażona w stacje dokujaca umożliwającą zabawę na większym ekranie', 1299, 0.5, 4);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Pegasus', 'Pierwsza konsola 10 generacji', 4200, 3.1, 4);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Xbox 360', 'Przełomowa konsola Microsoftu umożliwiająca grę na okrągło', 329, 1.3, 4);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Apple earbuds', 'Apple orginal', 929, 0.1, 5);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Mata razer', 'Podświetlana podkładka pod myszkę', 529, 1.1, 5);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Jack Jack', 'Posrebrzany przewód uwydatniajacy scenę', 999, 0.4, 5);
insert into database_for_app.product (name, description, price, weight, categoryId) values ('Lampa Lux', '20000 tysięcy lumenów', 129, 1.5, 5);


insert into database_for_app.order_state (name) values ('DISAPPROVED');
insert into database_for_app.order_state (name) values ('APPROVED');
insert into database_for_app.order_state (name) values ('CANCELED');
insert into database_for_app.order_state (name) values ('REALIZED');

insert into database_for_app.order  (approval_date, order_stateId, user_name, email, phone_number) values ('20201022', 2, 'January', 'zetzet@gmail.com', '123456789');
insert into database_for_app.order  (approval_date, order_stateId, user_name, email, phone_number) values ('20201024', 2, 'Alojzy', 'euforia@gmail.com', '123456789');
insert into database_for_app.order  (approval_date, order_stateId, user_name, email, phone_number) values ('20201101', 2, 'Farel', 'ty@gmail.com', '123456789');
insert into database_for_app.order  (approval_date, order_stateId, user_name, email, phone_number) values ('20201107', 2, 'Witold', 'ja@gmail.com', '123456789');
insert into database_for_app.order  (approval_date, order_stateId, user_name, email, phone_number) values ('20201109', 2, 'Zygmunt', 'email@gmail.com', '123456789');
insert into database_for_app.order  (approval_date, order_stateId, user_name, email, phone_number) values ('20201111', 2, 'Ryszard', 'gmail@gmail.com', '123456789');


insert into database_for_app.order (order_stateId, user_name, email, phone_number) values (1, 'Andrzej', 'andrzej@gmail.com', '123456789');
insert into database_for_app.order (order_stateId, user_name, email, phone_number) values (1, 'Adam', 'adam@gmail.com', '123456789');
insert into database_for_app.order (approval_date,order_stateId, user_name, email, phone_number) values ('20201105',3, 'Jan', 'jan@gmail.com', '123456789');
insert into database_for_app.order (approval_date,order_stateId, user_name, email, phone_number) values ('20200908', 3, 'Grzes', 'grzesgrzes@gmail.com', '987654321');
insert into database_for_app.order (approval_date,order_stateId, user_name, email, phone_number) values ('20201007', 4, 'Tomcio', 'tomcio@gmail.com', '123456789');
insert into database_for_app.order (approval_date,order_stateId, user_name, email, phone_number) values ('20201110', 4, 'Ignacy', 'wpaaa@gmail.com', '123456789');







insert into database_for_app.order_product values (1, 1, 3);
insert into database_for_app.order_product values (1, 4, 1);
insert into database_for_app.order_product values (2, 2, 2);
insert into database_for_app.order_product values (3, 11, 1);
insert into database_for_app.order_product values (4, 10, 1);
insert into database_for_app.order_product values (4, 4, 1);
insert into database_for_app.order_product values (4, 2, 1);
insert into database_for_app.order_product values (5, 12, 1);
insert into database_for_app.order_product values (5, 13, 1);
insert into database_for_app.order_product values (6, 9, 3);
insert into database_for_app.order_product values (7, 15, 1);
insert into database_for_app.order_product values (7, 12, 3);
insert into database_for_app.order_product values (7, 6, 2);
insert into database_for_app.order_product values (8, 5, 3);
insert into database_for_app.order_product values (9, 10, 2);
insert into database_for_app.order_product values (9, 8, 2);
insert into database_for_app.order_product values (10, 13, 4);
insert into database_for_app.order_product values (11, 14, 1);
insert into database_for_app.order_product values (11, 12, 1);
insert into database_for_app.order_product values (12, 13, 3);
insert into database_for_app.order_product values (12, 16, 1);
insert into database_for_app.order_product values (12, 15, 1);








