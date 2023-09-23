DROP DATABASE IF EXISTS articlescanner;

CREATE DATABASE IF NOT EXISTS articlescanner;

USE articlescanner;

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    categoryName VARCHAR(255) NOT NULL
);

-- ARTICLES
CREATE TABLE IF NOT EXISTS articles (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    createdAt DATETIME NOT NULL DEFAULT (NOW()),
    updatedAt DATETIME NOT NULL DEFAULT (NOW()),
    articleName VARCHAR(255) NOT NULL,
    barcode VARCHAR(255) NOT NULL,
    exhibition INT NOT NULL,
    shelf INT NOT NULL,
    warehouse INT NOT NULL,
    categoryId BINARY(16),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

-- INSERT 
INSERT INTO
    articles (
        articleName,
        barcode,
        exhibition,
        shelf,
        warehouse
    )
VALUES
    ('Artículo 1', '111456789', 1, 2, 3),
    ('Artículo 2', '222654321', 4, 5, 6),
    ('Artículo 3', '333789123', 7, 8, 9),
    ('Artículo 4', '444856736', 10, 11, 12),
    ('Artículo 5', '555528451', 13, 14, 15),
    ('Artículo 6', '666930564', 16, 17, 18);

-- INSERT CATEGORIES
INSERT INTO
    categories (categoryName)
VALUES
    ('Tornillería'),
    ('Herramientas'),
    ('Guantes'),
    ('Electricidad'),
    ('Iluminación'),
    ('Coches'),
    ('Bicicletas'),
    ('Deporte'),
    ('Ruedas'),
    ('Carteles'),
    ('Pesca'),
    ('Cutters'),
    ('Cordeltería'),
    ('Pintura'),
    ('Jardinería');

-- SETTING CATEGORIES
SET
    SQL_SAFE_UPDATES = 0;

UPDATE
    articles
SET
    categoryId = (
        SELECT
            id
        FROM
            categories
        WHERE
            categoryName = 'Tornillería'
    )
WHERE
    articleName = 'Artículo 1';

UPDATE
    articles
SET
    categoryId = (
        SELECT
            id
        FROM
            categories
        WHERE
            categoryName = 'Herramientas'
    )
WHERE
    articleName = 'Artículo 2';

UPDATE
    articles
SET
    categoryId = (
        SELECT
            id
        FROM
            categories
        WHERE
            categoryName = 'Guantes'
    )
WHERE
    articleName = 'Artículo 3';

SET
    SQL_SAFE_UPDATES = 1;

--
-- USERS
CREATE TABLE IF NOT EXISTS users (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
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

-- Add unique constraint to article_id
ALTER TABLE
    user_articles
ADD
    CONSTRAINT unique_article_id UNIQUE (article_id);

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
                username = 'Usuario2'
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
                articleName = 'Artículo 4'
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
                articleName = 'Artículo 5'
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
                articleName = 'Artículo 6'
        )
    );