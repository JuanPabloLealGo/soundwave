import { useRoutes } from "react-router-dom"
import MainLayout from "./components/layouts/MainLayout"
import About from "./components/pages/About"
import Contact from "./components/pages/Contact"
import Favorites from "./components/pages/Favorites"
import Home from "./components/pages/Home"
import Landing from "./components/pages/Landing"
import NotFound from "./components/pages/NotFount"
import { RootState, useAppDispatch, useAppSelector } from "./redux-store"
import Services from "./components/pages/Services"
import StyleGuide from "./components/pages/StyleGuide"
import useAuth from "./hooks/useAuth"
import "./scss/main.scss"
import TermsOfServices from "./components/pages/TermsOfService"
import PrivacyPolicy from "./components/pages/PrivacyPolicy"
import Playlist from "./components/pages/Playlist"
import { setErrorMessage } from "./redux-store/reducers/uiSlice"
import ErrorMessage from "./components/common/ErrorMessage"

const App = () => {
  useAuth()
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.data)
  const isDarkTheme = useAppSelector((state: RootState) => state.ui.isDarkTheme)
  const errorMessage = useAppSelector((state: RootState) => state.ui.errorMessage)
  const dispatch = useAppDispatch()
  let initialScreen = isAuthenticated ? <Home /> : <Landing />

  const closeErrorMessage = () => {
    dispatch(setErrorMessage(null));
  }

  const element = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: initialScreen },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'privacy-policy', element: <PrivacyPolicy /> },
        { path: 'services', element: <Services /> },
        { path: 'terms-of-service', element: <TermsOfServices /> },
        { path: 'playlist/:id', element: <Playlist /> }
      ]
    },

    {
      path: '/styleguide',
      element: <StyleGuide />,
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return (
    <div className={isDarkTheme ? 'dark' : 'light'}>
      {errorMessage && (
        <ErrorMessage
          onClick={closeErrorMessage}
          title='Session Expired'
          errorMessage={'Your session has expired. Please log in.'}
        />
      )}
      {element}
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
