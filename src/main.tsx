import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './css/index.css'
import ErrorPage from './err.tsx'
import AboutMe from './components/about-me'
import Calendar from './components/calendar'
import SheetMusic from './components/sheet-music'
import ClassNotes from './components/class-notes'

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
    path: "/calendar",
    element: <Calendar />
  },
  {
    path: "/sheets",
    element: <SheetMusic />
  },
  {
    path: "/notes",
    element: <ClassNotes />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
