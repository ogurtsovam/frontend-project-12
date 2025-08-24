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

const PrivateRoute = ({ children }) => {
  const token = useSelector(selectToken)
  const location = useLocation()

  return (
    token ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

const AuthButton = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const token = useSelector(selectToken)

  const handleLogout = () => {
    dispatch(clearAuth())
  }

  return (
    token !== null
      ? <Button onClick={handleLogout}>{t('header.logOut')}</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>{t('header.logIn')}</Button>
  )
}

function App() {
  return (
    <BrowserRouter>
        <Header authButton={<AuthButton/>}/>
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
        <Route path="/signup" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
