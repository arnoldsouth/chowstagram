import { useMemo } from 'react';

import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { themeSettings } from 'theme';

import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

const App = () => {
  // whenever we want to grab information from the store, we use useSelector((state)=>state._) to grab the state from the correct reducer
  // grab `mode` from our state/store using useSelector()
  const mode = useSelector((state) => state.mode);

  // do once in each app for regarding setting up theme: pass in `mode` we grabbed from the store to themeSettings as a parameter
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // we grab the state.token. if the token exists, then we are authorized, and we add this to our routes
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* CssBaseline is essentially css reset but for mui */}
          <CssBaseline />

          <Routes>
            <Route
              path="/"
              element={<LoginPage />}
            />

            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />

            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
