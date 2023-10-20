import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import Signup from './pages/Signup';
import { PrivateRoute } from './utils/PrivateRoute';
import Justify from './pages/Justify';
import JustifyTextComponent from './pages/Justify';
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={
            <PrivateRoute> 
              <JustifyTextComponent />
            </PrivateRoute>} path="/justify" 
            />
            <Route path='/' element={<Home />} exact />
            <Route element={<Signup />} path="/Signup" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}


export default App;
