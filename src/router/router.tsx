import { RouteObject, Navigate } from 'react-router-dom'
import React, { lazy, type LazyExoticComponent } from 'react'
import { useRoutes } from 'react-router-dom'

const HomePage: LazyExoticComponent<React.FC> = lazy(
  () => import('@/views/home/home')
)
const LoginPage: LazyExoticComponent<React.FC> = lazy(
  () => import('@/views/login/login')
)

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]

const Router = () => {
  return useRoutes(routes)
}
export default Router
