import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { ToastContainer } from 'react-toastify';

import { selectToken } from "../slices/authSlice"
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import PageNotFound from '../pages/PageNotFound';
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
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
