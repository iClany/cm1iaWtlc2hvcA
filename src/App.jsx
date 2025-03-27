import Header from "./components/header/Header.jsx";

import Footer from "./components/Footer.jsx";
import Routing from "./Routing/Routing.jsx"
import ThemeSwitcher from './ThemeSwitcher.jsx'

function App() {
        return( 
            <div className="wrapped">
                <Header />
                <ThemeSwitcher />
                    <Routing />
                <Footer />
            </div>
        )
    }

export default App;