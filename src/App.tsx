import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {useEffect} from 'react'
// import { Home } from './pages';
import { View } from './pages';
import CheckedList from './components/admin/CheckedList';
import Assignment from './components/admin/Assignment';
import VideoCheck from './components/curator/VideoCheck';
import AssignedList from './components/curator/AssignedList';
import Home from './components/admin/Home';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import store from './utils/store';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './utils/PrivateRoute';
// import CheckedList from '';
// import Assignment from '';


import { loadUser } from './actions/auth';

import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

import './App.css'

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Home />,
  // },
  {
    path: '/view',
    element: <View />,
  },
  {
    path: '/checked-list',
    element: <CheckedList />,
  },
  {
    path: '/assignment',
    element: <Assignment />,
  },

  {
    path: '/curator-panel/check/:id',
    element: <VideoCheck />,
  },
]);

function App() {

  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="/" element={<Login />} />
            {/* <RouterProvider router={router} /> */}

            <Route path="/checked-list" element={<PrivateRoute component={CheckedList} />} />
            <Route path="/assignment" element={<PrivateRoute component={Assignment} />} />
            <Route path="/assigned-list" element={<PrivateRoute component={AssignedList} />} />
            <Route path="/curator-panel/check/:id" element={<PrivateRoute component={VideoCheck} />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
