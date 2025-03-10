import { Routes , Route, Navigate } from "react-router-dom";

// import pages
    import {Homepage} from '../page/main/main.jsx';
    import {CatalogPage} from "../page/catalog/catalog.jsx";
        // catalog pages
        //     import { CatalogAccessoaries } from "../page/accessoaries/accessoaries.jsx";
        //     import { CatalogBycicle } from "../page/bycicle/bycicle.jsx";
        //     import { CatalogParts } from "../page/parts/parts.jsx";
        //     import { CatalogProtection } from "../page/protection/protection.jsx";
        //     import { CatalogSale } from "../page/sale/sale.jsx";
    // import { SearchPage } from "../page/search/search.jsx";
    // import { AdminPanelPage } from "../page/admin-panel/admin-panel.jsx";
    import {LoginPage} from '../page/auth/login/login.jsx'
    import {ResetPasswordPage} from '../page/auth/resetpass/resetpass.jsx'
    import {Terms} from "../page/terms/terms-page.jsx";
    import {Error404Page} from "../page/404-page/404-page.jsx";


 export default function Routing() {
    return(
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/catalog" element={<CatalogPage/>}/> {/* Доделать */}
                    {/* <Route path="/catalog/bycicle" element={<CatalogBycicle/>}/>
                    <Route path="/catalog/parts" element={<CatalogParts/>}/>
                    <Route path="/catalog/protection" element={<CatalogProtection/>}/>
                    <Route path="/catalog/accessoaries" element={<CatalogAccessoaries/>}/>
                    <Route path="/catalog/sale" element={<CatalogSale/>}/> */}
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