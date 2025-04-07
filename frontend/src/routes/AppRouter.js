import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner/LoadingSpinner.js';

// Динамические импорты с исправленными путями
const HomePage = lazy(() => import('../pages/Home/Home.jsx'));
const CatalogPage = lazy(() => import('../pages/Catalog/Catalog.jsx'));
const CatalogBicyclesPage = lazy(() => import('../pages/Catalog/Bicycle/Bicycle.jsx'));
const CatalogAccessoriesPage = lazy(() => import('../pages/Catalog/Accessories/Accessories.jsx'));
const CatalogPartsPage = lazy(() => import('../pages/Catalog/Parts/Parts.jsx'));
const CatalogProtectionPage = lazy(() => import('../pages/Catalog/Protection/Protection.jsx'));
const CatalogSalePage = lazy(() => import('../pages/Catalog/Sale/Sale.jsx'));
const LoginPage = lazy(() => import('../pages/Auth/Login/Login.jsx'));
const SignUpPage = lazy(() => import('../pages/Auth/SignUp/SignUp.jsx'));
const VerifyEmailPage = lazy(() => import('../pages/Auth/VerifyEmail/VerifyEmail.jsx'));
const ForgotPage = lazy(() => import('../pages/Auth/Forgot/Forgot.jsx'));
// const ProfilePage = lazy(() => import('../pages/Profile/Profile'));
// const Terms = lazy(() => import('../pages/Terms/TermsPage'));
const Error404Page = lazy(() => import('../pages/404/404-page.jsx'));


// Защищенные маршруты (вынесены в отдельный файл)
// import { ProtectedRoute, AdminRoute } from './ProtectedRoutes';

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner fullPage />}>
      <Routes>
        {/* Основные маршруты */}
        <Route path="/" element={<HomePage />} />
        
        {/* Маршруты каталога */}
        <Route path="/catalog" element={<CatalogPage />}>
          <Route index element={<Navigate to="bicycles" replace />} />
          <Route path="bicycles" element={<CatalogBicyclesPage />} />
          <Route path="accessories" element={<CatalogAccessoriesPage />} />
          <Route path="parts" element={<CatalogPartsPage />} />
          <Route path="protection" element={<CatalogProtectionPage />} />
        </Route>
        
        <Route path="/sale" element={<CatalogSalePage />} />

        {/* Юридические страницы */}
        {/* <Route path="/terms" element={<Terms />} /> */}

        {/* Маршруты аутентификации */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        
        {/* Защищенные маршруты */}
        {/* <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } /> */}
        
        {/* Админские маршруты */}
        {/* <Route path="/admin/items" element={ // Упрощен путь
          <AdminRoute>
          </AdminRoute>
        } /> */}

        {/* Обработка ошибок */}
        <Route path="/404" element={<Error404Page />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;