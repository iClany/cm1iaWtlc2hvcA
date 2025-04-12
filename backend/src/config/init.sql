-- Добавление полей isAdmin и isActive в таблицу users
ALTER TABLE users
ADD COLUMN isAdmin BOOLEAN DEFAULT FALSE,
ADD COLUMN isActive BOOLEAN DEFAULT TRUE;

-- Создание администратора (например, для пользователя с id = 1)
UPDATE users
SET isAdmin = TRUE
WHERE id = 9;