/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
use trivia_dev;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
    id integer auto_increment primary key,
    username varchar(20),
    password varchar(20),
    name varchar(20),
    lastname varchar(20),
    dni integer,
    admin bool,
    created_at DATETIME,
	updated_at DATETIME
);

DROP TABLE IF EXISTS questions;
CREATE TABLE IF NOT EXISTS questions(
    id integer auto_increment primary key,
	category varchar(30),
    description varchar(100),
    see bool,
    created_at DATETIME,
	updated_at DATETIME
);

DROP TABLE IF EXISTS options;
CREATE TABLE IF NOT EXISTS options(
    id integer auto_increment primary key,
    description varchar(100),
    correct bool,
    question_id int,
    foreign key(question_id) references questions(id) ON DELETE CASCADE,
    created_at DATETIME,
	updated_at DATETIME
);	

DROP TABLE IF EXISTS games;
CREATE TABLE IF NOT EXISTS games(
	point int,
    amount_right int,
    amount_wrong int,
    user_id integer primary key,
    foreign key(user_id) references user(id) ON DELETE CASCADE,
    created_at DATETIME,
	updated_at DATETIME
    
);	

