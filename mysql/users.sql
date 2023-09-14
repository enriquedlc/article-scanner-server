USE articlescanner;

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