-- retrieve the articles for an specific user
SELECT
    BIN_TO_UUID(a.id) AS id,
    a.articleName,
    a.barcode,
    a.exhibition,
    a.shelf,
    a.warehouse,
    a.createdAt,
    a.updatedAt,
    c.categoryName
FROM
    articles a
    JOIN user_articles ua ON a.id = ua.article_id
    JOIN users u ON ua.user_id = u.id
    JOIN categories c ON a.categoryId = c.id
WHERE
    u.username = 'Usuario1';

-- insert a new article for an specific user
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
    );