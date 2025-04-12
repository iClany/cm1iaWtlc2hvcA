import React from 'react';

import AppRoutes from './routes/AppRouter';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

function App() {
  return (
        <div className="container">
          <Header />
            <AppRoutes />
          <Footer />
        </div>
      
  );
}

export default App;