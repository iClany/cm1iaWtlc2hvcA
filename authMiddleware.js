import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <токен>

    if (!token) return res.sendStatus(401); // Нет токена — нет доступа

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Невалидный токен
        req.user = user; // Распаковали инфу из токена
        next(); // Передаём дальше
    });
};