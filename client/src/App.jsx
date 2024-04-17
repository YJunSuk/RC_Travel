import './index.css'
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import ModifyPage from './pages/ModifyPage';


export const loginContext = createContext();

function App() {
  const [loginUser, setLoginUser] = useState({
    id: "",
    password: "",
    flag: false,
  });

  return (
    <loginContext.Provider value={{ loginUser, setLoginUser }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/modify' element={<ModifyPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </loginContext.Provider>
  )
}

export default App
