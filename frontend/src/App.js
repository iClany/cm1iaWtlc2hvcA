import React from 'react';

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import AppRoutes from "./routes/AppRouter";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;