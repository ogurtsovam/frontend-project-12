import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Provider, ErrorBoundary } from '@rollbar/react'

import { selectToken } from '../slices/authSlice'
import ChatPage from '../pages/ChatPage'
import LoginPage from '../pages/LoginPage'
import PageNotFound from '../pages/PageNotFound'
import SignupPage from '../pages/SignupPage.jsx'
import rollbarConfig from '../../rollbar.config.js'

const PrivateRoute = ({ children }) => {
  const token = useSelector(selectToken)
  const location = useLocation()

  return (
    token ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
