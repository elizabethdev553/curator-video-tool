import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages';
import { View } from './pages'
import { CheckedList } from './pages'
import { Assignment } from './pages'
import Login  from './pages/Auth/Login'
import Register from './pages/Auth/Register'
// import Navbar from "../src/pages/layout/Navbar";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
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
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  // {
  //   path: '/curator-video-list',
  //   element: <CuratorPanel />,
  // },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Navbar /> */}
    </div>
  );
}

export default App;
