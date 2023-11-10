import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import { Home } from './pages';
import { View } from './pages'
import { CheckedList } from './pages'
import { Assignment } from './pages'
import Login  from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import CuratorPanel from './pages/CuratorPanel/AssignedList'
import VideoCheck from './pages/CuratorPanel/VideoCheck'

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
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/curator-panel',
    element: <CuratorPanel />,
  },
  {
    path: '/curator-panel/check/:id',
    element: <VideoCheck />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
