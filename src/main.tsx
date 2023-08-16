import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import './css/index.css'
import ErrorPage from './err.tsx'
import AboutMe from './components/about-me.tsx'
import Calendar from './components/blog.tsx'
import SheetMusic from './components/sheet-music'
import ClassNotes from './components/class-notes'
import Feed from './components/feed'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri : 'https://oyster-app-t2ytw.ondigitalocean.app/graphql',
  cache : new InMemoryCache()
})

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
    path: "/notes",
    element: <ClassNotes />
  },
  {
    path: "/life/:urlSlug",
    element: <Feed />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
)
