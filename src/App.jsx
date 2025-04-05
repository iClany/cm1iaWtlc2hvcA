import Header from "./components/header/Header.jsx";

import Footer from "./components/Footer.jsx";
import Routing from "./Routing/Routing.jsx"

function App() {
        return( 
            <div className="wrapped">
                <Header />
                    <Routing />
                <Footer />
            </div>
        )
    }

export default App;