import {
  Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import {
  LoginPage, PageNotFound, ChatPage, SignUpPage,
} from '../pages/pages.js';
import getRoute from '../routes/routes';
import Spinner from './Spinner';

const PrivateRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const location = useLocation();

  if (authState === undefined) {
    return <Spinner />;
  }

  return (
    authState.token
      ? children
      : <Navigate to={getRoute.loginPagePath()} state={{ from: location }} />
  );
};

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )}
        />
        <Route path={getRoute.loginPagePath()} element={<LoginPage />} />
        <Route path={getRoute.signUpPagePath()} element={<SignUpPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  </div>
);

export default App;
