import { Routes , Route, Navigate } from "react-router-dom";

// import pages
    import HomePage from '../page/main/main.jsx';
    import CatalogPage from "../page/catalog/catalog.jsx";
    // catalog pages
        import CatalogBicyclesPage from '../page/catalog/bicycle/bicycle.jsx'
        import CatalogAccessoariesPage from "../page/catalog/accessoaries/accessoaries.jsx";
        import CatalogPartsPage from "../page/catalog/parts/parts.jsx";
        import CatalogProtectionPage from "../page/catalog/protection/protection.jsx";
        import CatalogSalePage from "../page/catalog/sale/sale.jsx";
            
    // import { SearchPage } from "../page/search/search.jsx";
    // User authentication system pages
    import LoginPage from '../page/userPages/auth/login/login.jsx'; // Страница входа в аккаунт
    import SingUpPage from "../page/userPages/auth/singup/singup.jsx"; // Страница регистрации аккаунта
    import VerifyEmailPage from "../page/userPages/auth/verifyemail/verify-email.jsx"; // Страница подтверждения Email при регистрации
    import ForgotPage from "../page/userPages/auth/forgot/forgot.jsx"; // Страница восстановаления пароля
    import ProfilePage from "../page/userPages/profile/profile.jsx"; // Профиль
    // Legal details for users
    import {Terms} from "../page/terms/terms-page.jsx";
    import {Error404Page} from "../page/404-page/404-page.jsx";

    // Admin panel page
    // import { AdminPanelPage } from "../page/admin-panel/admin-panel.jsx";
    import AddItemsPictures from '../page/admin-panel/adding-items/addPictures.jsx'


    


 export default function Routing() {
    return(
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                    {/* Catalog */}
                    <Route path="/catalog" element={<CatalogPage/>}/>
                        <Route path="/catalog/bicycles/" element={<CatalogBicyclesPage/>}/>
                        <Route path="/catalog/accessoaries" element={<CatalogAccessoariesPage/>}/>
                        <Route path="/catalog/parts" element={<CatalogPartsPage/>}/>
                        <Route path="/catalog/protection" element={<CatalogProtectionPage/>}/>
                        <Route path="/sale" element={<CatalogSalePage/>}/>
                    {/* /Catalog */}
                    
                {/* <Route path="/search" element={<SearchPage/>}/> */}
                {/* <Route path="/return" element={</>}/> */}
                {/* <Route path="/warranty" element={</>}/> */}
                {/* <Route path="/useragreement" element={</>}/> */}
                {/* <Route path="/payments" element={</>}/> */}
                {/* <Route path="/shipping" element={</>}/> */}
                
                <Route path="/terms" element={<Terms/>}/>
                {/* <Route path="/" element={</>}/> */}
                {/* <Route path="/" element={</>}/> */}
                {/* <Route path="/" element={</>}/> */}
                {/* <Route path="/" element={</>}/> */}
                {/* <Route path="/" element={</>}/> */}
                {/* <Route path="/" element={</>}/> */}

                        {/* Authorization system */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/singup" element={<SingUpPage />} />
                        <Route path="/verify-email" element={<VerifyEmailPage />} />
                        <Route path="/forgot" element={<ForgotPage />} />
                        <Route path="/profile" element={<ProfilePage />} />

                        {/* Admin Panel */}
                        {/* <Route path="/admin-panel" element={<AdminPanelPage/>}/> */}
                        <Route path="/adminPanel/items" element={<AddItemsPictures/>}/>
                <Route path="/404" element={<Error404Page/>} />
                <Route path="*" element={ <Navigate to="/404" replace />} />
            </Routes>
    )
}
export { Routing };