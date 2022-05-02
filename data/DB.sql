CREATE DATABASE IF NOT EXISTS Linkashare;

use Linkashare;

CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL,
    user_name VARCHAR(30) NOT NULL UNIQUE,
    avatar VARCHAR (50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE posts (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_user INT UNSIGNED NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE(),
    title VARCHAR (30),
    post_description VARCHAR (120),
    post_url VARCHAR (100),
    rated ENUM ("FALSE", "1", "2", "3", "4", "5") DEFAULT "FALSE",
    FOREIGN KEY (id_user) REFERENCES users (id)
);

CREATE TABLE user_post (
    id_user INT UNSIGNED,
    id_post INT UNSIGNED,
	amount INT UNSIGNED NOT NULL,
    PRIMARY KEY (id_user, id_post),
    FOREIGN KEY (id_user) REFERENCES users (id),
    FOREIGN KEY (id_post) REFERENCES posts (id)
);

CREATE TABLE rated_posts (
    id_post INT UNSIGNED,
    id_user INT UNSIGNED,
    PRIMARY KEY (id_post, id_user),
    FOREIGN KEY (id_post) REFERENCES posts (id),
    FOREIGN KEY (id_user) REFERENCES users (id)
);
DROP DATABASE linkashare;
