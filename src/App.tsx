import { useRoutes } from "react-router-dom"
import MainLayout from "./components/MainLayout"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import FavoritesPage from "./pages/FavoritesPage"
import HomePage from "./pages/HomePage"
import LandingPage from "./pages/LandingPage"
import NotFoundPage from "./pages/NotFoundPage"
import { useAppDispatch, useAppSelector } from "./redux-store"
import ServicesPage from "./pages/ServicesPage"
import useAuth from "./hooks/useAuth"
import TermsOfServicesPage from "./pages/TermsOfServicePage"
import PrivacyPolicyPage from "./pages/PricacityPolicyPage"
import { setErrorMessage } from "./redux-store/reducers/uiSlice"
import { logout } from "./redux-store/reducers/authSlice"
import { authSelector, uiSelector } from "./redux-store/selectors"
import "./scss/main.scss"
import PlaylistPage from "./pages/PlaylistPage"
import StyleGuidePage from "./pages/StyleGuidePage"
import ErrorMessage from "./components/ErrorMessage"

const App = () => {
  const authError = useAuth()
  const dispatch = useAppDispatch()
  const { data: isAuthenticated } = useAppSelector(authSelector)
  const { isDarkTheme, errorMessage } = useAppSelector(uiSelector)
  const error = authError || errorMessage
  let initialScreen = isAuthenticated ? <HomePage /> : <LandingPage />

  const clickHandler = () => {
    dispatch(setErrorMessage(null))
    dispatch(logout())
  }

  const element = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: initialScreen },
        { path: 'about', element: <AboutPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'favorites', element: <FavoritesPage /> },
        { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
        { path: 'services', element: <ServicesPage /> },
        { path: 'terms-of-service', element: <TermsOfServicesPage /> },
        { path: 'playlist/:categoryId/:playlistId', element: <PlaylistPage /> }
      ]
    },

    {
      path: '/styleguide',
      element: <StyleGuidePage />,
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ])

  return (
    <div className={isDarkTheme ? 'dark' : 'light'}>
      {error && (
        <ErrorMessage
          error={error}
          onClick={clickHandler}
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
