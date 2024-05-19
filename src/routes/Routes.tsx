import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RequireAuth } from '@/common/Components/RequireAuth/RequireAuth'
import { Auth } from '@/features/Auth/Auth'

export const BASE_ROUTE = `/`

const publicRoutes = [
   {
      path: `${BASE_ROUTE}login`,
      element: <Auth />,
   },
]

const privateRoutes = [
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
