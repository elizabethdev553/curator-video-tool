import './App.css'

import {useEffect} from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, createBrowserRouter, Route, RouterProvider , Routes } from 'react-router-dom';

import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';
import Assignment from './components/admin/Assignment';
import CheckedList from './components/admin/CheckedList';
import Home from './components/admin/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AssignedList from './components/curator/AssignedList';
import VideoCheck from './components/curator/VideoCheck';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './utils/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import store from './utils/store';


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
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
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
