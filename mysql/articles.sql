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