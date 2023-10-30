import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import Product from './components/Product';
import Update from './components/Update';
import AddCategory from './components/Add_category';
import ConfirmDelete from './components/ConfirmDelete';
import ConfirmDeleteProduct from './components/ConfirmDeleteProduct';
import Update_Product from './components/Update_product';
import Add_product from './components/Add_product';

function App() {
  return (
      <>
      <Router>
          <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category">Category</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/product">Product</Link>
                </li>
              </ul>
            </nav>
          </div>
            <Routes>
                  <Route path="/" element={<Home/>}></Route>

                  <Route path="/product" element={<Product/>}></Route>
                  <Route path="/delete_product/:id" element={<ConfirmDeleteProduct/>}></Route>
                  <Route path="/update_product/:id" element={<Update_Product/>}></Route>
                  <Route path="/add_product" element={<Add_product/>}></Route>

                  <Route path="/category" element={<Category/>}></Route>
                  <Route path="/update_category/:id" element={<Update/>}></Route>
                  <Route path="/add_category" element={<AddCategory/>}></Route>
                  <Route path="/delete_category/:id" element={<ConfirmDelete/>}></Route>
            </Routes>
      </Router>
      </>
  );
}

export default App;
