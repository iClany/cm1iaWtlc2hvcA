import Header from "./components/header/Header.js";
// import Footer from "./components/Footer.js";
import Routing from "./Routing/Routing.jsx"

function App() {
        return( 
            <div className="wrapped">
                <Header />
                    <Routing />
                {/* <Footer /> */}
            </div>
        )
    }

export default App;