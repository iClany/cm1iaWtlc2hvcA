import { BrowserRouter as Router, Routes , Route, Navigate  } from "react-router-dom";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

// import pages
    import { Homepage } from './page/main.jsx';

    import { CatalogPage } from "./page/catalog.jsx";
        // // catalog pages
        //     import { CatalogAccessoaries } from "./page/accessoaries.jsx";
        //     import { CatalogBycicle } from "./page/bycicle.jsx";
        //     import { CatalogParts } from "./page/parts.jsx";
        //     import { CatalogProtection } from "./page/protection.jsx";
        //     import { CatalogSale } from "./page/sale.jsx";

    // import { SearchPage } from "./page/search.jsx";
    // import { AdminPanelPage } from "./page/admin-panel/admin-panel.jsx";
    import { Terms } from './page/terms/terms.jsx';
    import { NotFound } from "./page/error-page";
    

function App() {
        return( 
            <div className="wrapped">
                <Header />
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
                    <Route path="/404" element={<NotFound/>} />
                    <Route path="*" element={ <Navigate to="/404" replace />} />
                </Routes>
                <Footer />
            </div>
        )
    }

export default App;