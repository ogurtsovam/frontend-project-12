import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { useState } from 'react'
import { Button, Navbar } from 'react-bootstrap'
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import PageNotFound from '../pages/PageNotFound';
import routes from '../routes/routes.js';
import Header from './Header.jsx';
import useAuth from '../hooks/useAuth.jsx';
import AuthContext from '../contexts/index.jsx'


const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  const logIn = () => setLoggedIn(true)
  const logOut = () => {
    localStorage.removeItem('userId')
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

const AuthButton = () => {
  const auth = useAuth()
  const location = useLocation()

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  )
}

function App() {
  return (
  <AuthProvider>
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
  </AuthProvider>
  );
}

export default App;
