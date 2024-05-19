import { createBrowserRouter, RouterProvider, Navigate, NavLink } from 'react-router-dom'

import { RequireAuth } from '@/common/Components/RequireAuth/RequireAuth'
import { Auth } from '@/features/Auth/Auth'

export const BASE_ROUTE = `/app`

const publicRoutes = [
   {
      path: `/login`,
      element: <Auth />,
   },
   {
      path: `*`,
      element: <Navigate to={`/404`} />,
   },
   {
      path: `404`,
      element: (
         <div>
            <p>404 - Sorry, the page not found!</p>
            <NavLink to={`${BASE_ROUTE}`}>Link to the main page.</NavLink>
         </div>
      ),
   },
]

const privateRoutes = [
   {
      path: `/`,
      element: <Navigate to={`${BASE_ROUTE}`} />,
   },
   {
      path: `${BASE_ROUTE}`,
      element: <div>Hello world!!!</div>,
   },
]

const router = createBrowserRouter([
   {
      element: <RequireAuth />,
      children: privateRoutes,
   },
   ...publicRoutes,
])

export const Router = () => {
   return <RouterProvider router={router} />
}
