import { useRoutes } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import Home from './components/pages/Home'
import Landing from './components/pages/Landing'
import NotFound from './components/pages/NotFount'
import Playlist from './components/pages/Playlist'
import Playlists from './components/pages/Playlists'
import useAuth from './hooks/useAuth'
import { RootState, useAppSelector } from './redux-store'
import './scss/_main.scss'

const App = () => {
  useAuth()
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.data)
  const isDarkTheme = useAppSelector((state: RootState) => state.ui.isDarkTheme)
  let initialScreen = isAuthenticated ? <Home /> : <Landing />

  const element = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: initialScreen },
      ]
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

  return (
    <div className={isDarkTheme ? 'dark' : 'light'}>
      <div className="background">
        {element}
      </div>
    </div>
  )
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
