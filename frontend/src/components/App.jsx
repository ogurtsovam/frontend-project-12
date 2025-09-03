import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useTranslation } from 'react-i18next';
import { clearAuth } from "../slices/authSlice"
import { selectToken } from "../slices/authSlice"
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import PageNotFound from '../pages/PageNotFound';
import Header from './Header.jsx';
import SignupPage from '../pages/SignupPage.jsx';

const PrivateRoute = ({ children }) => {
  const token = useSelector(selectToken)
  const location = useLocation()

  return (
    token ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
            path="/"
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
        <Route path='/login' element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
