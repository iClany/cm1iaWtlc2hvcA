RMBike.by/
├── public/
│   ├── favicon.ico          # Существующий фавикон
│   ├── index.html           # Основной HTML файл
│   ├── robots.txt           # Файл для поисковиков
│   └── assets/
│       ├── images/          # Переносим глобальные изображения (логотипы, бэкграунды)
│       └── fonts/           # Переносим шрифты
│
├── src/
│   ├── api/
│   │   ├── auth.js          # API для авторизации
│   │   ├── products.js      # API для работы с товарами
│   │   └── index.js         # Экспорт всех API
│   │
│   ├── assets/
│   │   ├── images/          # Локальные изображения для компонентов
│   │   └── scss/            # Глобальные SCSS стили
│   │       ├── _variables.scss
│   │       ├── _mixins.scss
│   │       └── main.scss    # Основной файл стилей
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx   # Кнопки
│   │   │   ├── Input.jsx    # Поля ввода
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header/      # Шапка сайта
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Header.module.scss
│   │   │   ├── Footer/      # Подвал сайта
│   │   │   └── Sidebar/     # Боковое меню (если есть)
│   │   ├── products/
│   │   │   ├── ProductCard/ # Карточка товара
│   │   │   ├── ProductList/ # Список товаров
│   │   │   ├── Filters/     # Фильтры для каталога
│   │   │   └── ...
│   │   └── ...
│   │
│   ├── contexts/
│   │   ├── CartContext.js   # Контекст корзины
│   │   ├── AuthContext.js   # Контекст авторизации
│   │   └── ...
│   │
│   ├── hooks/
│   │   ├── useCart.js       # Хук для работы с корзиной
│   │   ├── useProducts.js   # Хук для работы с товарами
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home/            # Главная страница
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.scss
│   │   ├── Catalog/         # Каталог товаров
│   │   ├── Product/         # Страница товара
│   │   ├── Cart/            # Корзина
│   │   ├── Checkout/        # Оформление заказа
│   │   ├── Auth/            # Авторизация/Регистрация
│   │   ├── Profile/         # Личный кабинет
│   │   ├── Contacts/       # Контакты
│   │   ├── About/          # О компании
│   │   └── 404/            # Страница 404
│   │
│   ├── routes/
│   │   ├── AppRouter.js     # Основной роутер
│   │   └── PrivateRoute.js  # Защищенные маршруты
│   │
│   ├── store/
│   │   ├── slices/
│   │   │   ├── cartSlice.js # Слайс для корзины
│   │   │   ├── authSlice.js # Слайс для авторизации
│   │   │   ├── productsSlice.js # Слайс для товаров
│   │   │   └── ...
│   │   ├── store.js         # Настройка хранилища
│   │   └── hooks.js         # Кастомные хуки для Redux
│   │
│   ├── utils/
│   │   ├── helpers.js       # Хелпер-функции
│   │   ├── constants.js     # Константы (цены, настройки)
│   │   ├── validate.js      # Валидация форм
│   │   └── ...
│   │
│   ├── App.js               # Главный компонент
│   ├── index.js             # Точка входа
│   └── index.css            # Глобальные стили
│
├── .env                     # Переменные окружения
├── .env.example             # Пример .env файла
├── .gitignore
├── package.json
└── README.md