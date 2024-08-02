import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/home';
import FiltredPage from './Pages/FiltredPage/filtred_page';
import RestaurantProfile from './Pages/RestaurantProfile/restaurant_profie';
import SearchResultsPage from './Pages/SearchResultPage/search_result_page';
import CategoriesRestaurantPage from './Pages/CategoriesRestaurnatPage/categories_restaurnat_page';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filtered" element={<FiltredPage />} />
          <Route path="/restaurant/:id" element={<RestaurantProfile />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/categoryFiltered" element={<CategoriesRestaurantPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
