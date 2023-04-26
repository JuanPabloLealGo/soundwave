import { useEffect } from "react"
import { useRoutes } from "react-router-dom"

import { useAppSelector } from "./redux-store"
import { authSelector, uiSelector } from "./redux-store/selectors"
import MainLayout from "./components/MainLayout"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import FavoritesPage from "./pages/FavoritesPage"
import HomePage from "./pages/HomePage"
import LandingPage from "./pages/LandingPage"
import NotFoundPage from "./pages/NotFoundPage"
import ServicesPage from "./pages/ServicesPage"
import TermsOfServicesPage from "./pages/TermsOfServicePage"
import PrivacyPolicyPage from "./pages/PricacityPolicyPage"
import PlaylistPage from "./pages/PlaylistPage"
import StyleGuidePage from "./pages/StyleGuidePage"
import "./scss/main.scss"

const App = () => {
  const { data: isAuthenticated } = useAppSelector(authSelector)
  const { isDarkTheme } = useAppSelector(uiSelector)
  let initialScreen = isAuthenticated ? <HomePage /> : <LandingPage />

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [isDarkTheme])

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
        { path: 'playlist/:playlistId', element: <PlaylistPage /> }
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
