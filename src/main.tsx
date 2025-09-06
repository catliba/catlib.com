import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import './css/index.css'
import ErrorPage from './err.tsx'
import AboutMe from './components/about-me.tsx'
import Calendar from './components/blog.tsx'
import SheetMusic from './components/sheet-music'
import Paris from './components/paris.tsx'
import Feed from './components/feed.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/aboutcatlib",
    element: <AboutMe />
  },
  {
    path: "/life",
    element: <Calendar />
  },
  {
    path: "/sheets",
    element: <SheetMusic />
  },
  {
    path: "/paris",
    element: <Paris />
  },
  {
    path: "/life/:urlSlug",
    element: <Feed />
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
