import React from 'react'
import { useRoutes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFount';
import Playlist from './components/pages/Playlist';
import Playlists from './components/pages/Playlists';
import useAuth from './hooks/useAuth';

const App = () => {
  const isAuthenticated = useAuth()

  const element = useRoutes([
    {
      path: '/',
      element: <Home isAuthenticated={isAuthenticated} />
    },
    {
      path: '/playlists',
      element: <MainLayout />,
      children: [
        { index: true, element: <Playlists /> },
        { path: ':id', element: <Playlist /> }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return element
}

// OTHER WAY:
/*
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/playlists' element={<MainLayout />} >
        <Route index element={<Playlists />} />
        <Route path=':id' element={<Playlist />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
*/

export default App;
