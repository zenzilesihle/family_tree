create database family_tree default character set utf8 default collate utf8_general_ci;

CREATE TABLE IF NOT EXISTS admin
(
    user_id INT(70) NOT NULL AUTO_INCREMENT,
    email_address VARCHAR(45) NOT NULL,
    password VARCHAR(45) NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    join_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    UNIQUE INDEX user_email_UNIQUE (email_address ASC)
  )
ENGINE = InnoDB;