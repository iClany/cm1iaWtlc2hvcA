import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner/LoadingSpinner.js';
import PrivateRoute from './PrivateRoute.js';
import { useAuth } from '../contexts/AuthContext';

// Динамические импорты с исправленными путями
const HomePage = lazy(() => import('../pages/Home/Home.jsx'));
const CatalogPage = lazy(() => import('../pages/Catalog/Catalog.jsx'));
const CatalogBicyclesPage = lazy(() => import('../pages/Catalog/Bicycle/Bicycle.jsx'));
const CatalogAccessoriesPage = lazy(() => import('../pages/Catalog/Accessories/Accessories.jsx'));
const CatalogPartsPage = lazy(() => import('../pages/Catalog/Parts/Parts.jsx'));
const CatalogProtectionPage = lazy(() => import('../pages/Catalog/Protection/Protection.jsx'));
const CatalogSalePage = lazy(() => import('../pages/Catalog/Sale/Sale.jsx'));
const Error404Page = lazy(() => import('../pages/404/404-page.jsx'));
const Login = lazy(() => import('../pages/Auth/Login/Login.jsx'));
const Register = lazy(() => import('../pages/Auth/Register/Register.jsx'));
const Profile = lazy(() => import('../pages/Auth/Profile/Profile.jsx'));
const VerifyEmail = lazy(() => import('../pages/Auth/VerifyEmail/VerifyEmail.jsx'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword/ForgotPassword.jsx'));
const ErrorBoundary = lazy(() => import('../pages/Auth/ErrorBoundary/ErrorBoundary.jsx'));
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword/ResetPassword.jsx'));
const AdminPanel = lazy(() => import('../pages/Admin/AdminPanel/AdminPanel.jsx'));
const TestEmail = lazy(() => import('../pages/TestEmail/TestEmail.jsx'));

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Suspense fallback={<LoadingSpinner fullPage />}>
      <ErrorBoundary>
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
            <Route path="sale" element={<CatalogSalePage />} />
          </Route>

          {/* Юридические страницы */}
          {/* <Route path="/terms" element={<Terms />} /> */}

          {/* Авторизация */}
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/profile" />} />
          <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/profile" />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/test-email" element={<TestEmail />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Обработка ошибок */}
          <Route path="/404" element={<Error404Page />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
}

export default AppRoutes;