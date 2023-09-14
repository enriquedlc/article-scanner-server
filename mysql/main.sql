DROP DATABASE IF EXISTS articlescanner;

CREATE DATABASE IF NOT EXISTS articlescanner;

USE articlescanner;

/*
 {
 "id": "1",
 "createdAt": "2023-01-01T15:00:00.000Z",
 "updatedAt": "2023-01-01T15:00:00.000Z",
 "name": "Artículo 1",
 "barcode": "1111",
 "exhibition": 5,
 "shelf": 20,
 "warehouse": 100
 },
 */
/*
 {
 "id": "1",
 "username": "johndoe",
 "email": "johndoe@gmail.com",
 "password": "123456",
 "createdAt": "2023-01-01T00:00:00:000Z",
 "updatedAt": "2023-01-01T00:00:00:000Z"
 },
 */
-- ARTICLES
CREATE TABLE IF NOT EXISTS articles (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    createdAt DATETIME NOT NULL DEFAULT (NOW()),
    updatedAt DATETIME NOT NULL DEFAULT (NOW()),
    articleName VARCHAR(255) NOT NULL,
    barcode VARCHAR(255) NOT NULL,
    exhibition INT NOT NULL,
    shelf INT NOT NULL,
    warehouse INT NOT NULL
);

--INSERT 
INSERT INTO
    articles (
        articleName,
        barcode,
        exhibition,
        shelf,
        warehouse
    )
VALUES
    ('Artículo 1', '123456789', 1, 2, 3),
    ('Artículo 2', '987654321', 4, 5, 6),
    ('Artículo 3', '456789123', 7, 8, 9);

--
-- USERS
CREATE TABLE IF NOT EXISTS users (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT (NOW()),
    updatedAt DATETIME NOT NULL DEFAULT (NOW())
);

-- INSERT
INSERT INTO
    users (username, email, password)
VALUES
    ('Usuario1', 'usuario1@example.com', 'password1'),
    ('Usuario2', 'usuario2@example.com', 'password2'),
    ('Usuario3', 'usuario3@example.com', 'password3');

--
-- USER_ARTICLES
CREATE TABLE IF NOT EXISTS user_articles (
    user_id BINARY(16),
    article_id BINARY(16),
    PRIMARY KEY (user_id, article_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (article_id) REFERENCES articles(id)
);

-- INSERT
INSERT INTO
    user_articles (user_id, article_id)
VALUES
    (
        (
            SELECT
                id
            FROM
                users
            WHERE
                username = 'Usuario1'
        ),
        (
            SELECT
                id
            FROM
                articles
            WHERE
                articleName = 'Artículo 1'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                users
            WHERE
                username = 'Usuario1'
        ),
        (
            SELECT
                id
            FROM
                articles
            WHERE
                articleName = 'Artículo 2'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                users
            WHERE
                username = 'Usuario2'
        ),
        (
            SELECT
                id
            FROM
                articles
            WHERE
                articleName = 'Artículo 3'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                users
            WHERE
                username = 'Usuario3'
        ),
        (
            SELECT
                id
            FROM
                articles
            WHERE
                articleName = 'Artículo 1'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                users
            WHERE
                username = 'Usuario3'
        ),
        (
            SELECT
                id
            FROM
                articles
            WHERE
                articleName = 'Artículo 2'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                users
            WHERE
                username = 'Usuario3'
        ),
        (
            SELECT
                id
            FROM
                articles
            WHERE
                articleName = 'Artículo 3'
        )
    );

--