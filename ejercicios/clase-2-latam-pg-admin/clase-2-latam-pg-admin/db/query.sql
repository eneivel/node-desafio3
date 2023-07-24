CREATE DATABASE db_todo;

CREATE TABLE todos (
	id serial,
	title varchar(50),
	description varchar(50)
);

INSERT INTO todos (title, description) values ('todo #01', 'description #02');

SELECT * FROM todos;