import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Signup';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route Component={Home} path="/" exact />
            <Route Component={Login} path="/login" />
            <Route Component={Signup} path="/Signup" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}


export default App;
