import { Routes , Route, Navigate } from "react-router-dom";

// import pages
    import HomePage from '../page/main/main.jsx';
    import CatalogPage from "../page/catalog/catalog.jsx";
    // catalog pages
        import CatalogBicyclesPage from '../page/bicycle/bicycle.jsx'
        import CatalogAccessoariesPage from "../page/accessoaries/accessoaries.jsx";
        import CatalogPartsPage from "../page/parts/parts.jsx";
        import CatalogProtectionPage from "../page/protection/protection.jsx";
        import CatalogSalePage from "../page/sale/sale.jsx";
            
    // import { SearchPage } from "../page/search/search.jsx";
    // import { AdminPanelPage } from "../page/admin-panel/admin-panel.jsx";
    import LoginPage from '../page/auth/login/login.jsx';
    import ResetPasswordPage from '../page/auth/resetPassword/resetPasswordPage.jsx';
    import {Terms} from "../page/terms/terms-page.jsx";
    import {Error404Page} from "../page/404-page/404-page.jsx";


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
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/reset" element={<ResetPasswordPage/>}/>
                <Route path="/404" element={<Error404Page/>} />
                <Route path="*" element={ <Navigate to="/404" replace />} />
            </Routes>
    )
}
export { Routing };