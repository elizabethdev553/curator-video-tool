import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages';
import { View } from './pages'
import { CheckedList } from './pages'
import { Assignment } from './pages'

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
