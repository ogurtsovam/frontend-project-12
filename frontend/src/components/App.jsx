import {
  Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import Header from './Header';
import {
  LoginPage, PageNotFound, ChatPage, SignUpPage,
} from '../Pages/pages.js';
import getRoute from '../routes';

const PrivateRoute = ({ children }) => {
  const authState = ((state) => state.auth);
  const location = useLocation();
  if (authState === undefined) {
    return <Spinner />;
  }

  return (
    authState.token
      ? children
      : <Navigate to={getRoute.loginPath()} state={{ from: location }} />
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
        <Route path={getRoute.loginPath()} element={<LoginPage />} />
        <Route path={getRoute.singUpPath()} element={<SignUpPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  </div>
);

export default App;
