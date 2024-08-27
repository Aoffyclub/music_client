import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from "@/layout/Layout.js"
import Home from "./pages/home"
import Browse from './pages/Browse'
import Newsong from './pages/Newsong'
import Favorite from './pages/Favorite'



const router = createBrowserRouter([
  {
    path: '/',
    element: < Layout />,
    children: [
      {
        path: "/",
        element: <Home />

      },
      {
        path: "/browse",
        element: <Browse />
      },
      {
        path: "/newsong",
        element: <Newsong />

      },
      {
        path: "/favorite",
        element: <Favorite />

      }
    ],
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
