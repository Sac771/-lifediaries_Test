import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import Product from './components/Product';
import Update from './components/Update';
import AddCategory from './components/Add_category';
import ConfirmDeleteCategory from './components/ConfirmDeleteCategory';
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
                  <Route path="/category" element={<Category/>}></Route>
                  {/* <Route path="/product" element={<Product/>}></Route> */}
                  <Route path="/update_category/:id" element={<Update/>}></Route>
                  <Route path="/add_category" element={<AddCategory/>}></Route>
                  <Route path="/delete_category/:id" element={<ConfirmDeleteCategory/>}></Route>
            </Routes>
      </Router>
      </>
  );
}

export default App;
