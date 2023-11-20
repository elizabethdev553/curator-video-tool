import './App.css'

import {useEffect} from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';
import Assignment from './components/admin/Assignment';
import CheckedList from './components/admin/CheckedList';
import CuratorList from './components/admin/CuratorList';
import Home from './components/admin/Home';
import VideoList from './components/admin/VideoList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AssignedList from './components/curator/AssignedList';
import VideoCheck from './components/curator/VideoCheck';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './utils/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import store from './utils/store';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

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
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/checked-list" element={<PrivateRoute component={CheckedList} />} />
            <Route path="/curator-list" element={<PrivateRoute component={CuratorList} />} />
            <Route path="/assignment" element={<PrivateRoute component={Assignment} />} />
            <Route path="/assigned-list" element={<PrivateRoute component={AssignedList} />} />
            <Route path="/curator-panel/check/:id" element={<PrivateRoute component={VideoCheck} />} />
            <Route path="/from-qn/:date/:time?" element={<PrivateRoute component={Home} />} />
            <Route path="/video-list" element={<PrivateRoute component={VideoList} />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
