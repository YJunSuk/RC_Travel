import './index.css'
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import ModifyPage from './pages/ModifyPage';
import AddMapPage from './pages/AddMapPage';
import AddReviewPage from './pages/AddReviewPage';


export const loginContext = createContext();
export const dtContext = createContext();

function App() {
  const [loginUser, setLoginUser] = useState({
    id: "",
    password: "",
    flag: false,
  });
  const [destId, setDestId] = useState({
    id: "",
  });

  return (
    <dtContext.Provider value={{ destId, setDestId }}>
      <loginContext.Provider value={{ loginUser, setLoginUser }}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/modify' element={<ModifyPage />} />
              <Route path='/add' element={<AddMapPage/>}/>
              <Route path='/review' element={<AddReviewPage/>}/>
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </loginContext.Provider>
    </dtContext.Provider>
  )
}

export default App
