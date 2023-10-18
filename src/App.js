import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route Component={Home} path="/" exact />
          <Route Component={Login} path="/login" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
